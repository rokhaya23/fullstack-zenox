<template>
  <v-app class="app-background">
    <v-main>
      <v-container class="py-11">
        <!-- Section pour afficher les informations de l'utilisateur -->
        <v-container class="d-flex justify-space-between align-center mb-4">
          <!-- Contenu de l'utilisateur actuellement connecté -->
          <div class="d-flex align-center">
            <v-avatar size="100">
              <v-img v-if="user.photo" :src="user.photo" alt="User photo" height="100" width="100"></v-img>
              <v-img v-else src="https://images.unsplash.com/photo-1524303676975-5989d34c6854?q=80&w=1465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Default avatar" height="100" width="100"></v-img>
            </v-avatar>
            <div class="ml-4">
              <h1 class="text-h6 font-weight-bold">{{ user.name }}</h1>
              <p class="text-caption">{{ user.email }}</p>
            </div>
          </div>
          <v-btn v-if="isCurrentUser" @click="toggleSuivi" :class="{ 'suivi': estSuivi }" :color="estSuivi ? 'primary' : 'white'" outlined>
            {{ estSuivi ? 'Ne plus suivre' : 'Suivre' }}
          </v-btn>
        </v-container>

        <!-- Onglets -->
        <v-card>
          <v-tabs v-model="tab" bg-color="white">
            <v-tab value="one">Activité</v-tab>
            <v-tab v-if="isCurrentUser" value="two">Informations</v-tab>
          </v-tabs>

          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="one">
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
                <v-card flat class="pa-4">
                  <h3 class="text-h4 font-weight-bold mb-4">Activités de l'utilisateur</h3>
                  <v-row>
                    <v-col cols="12" md="6" lg="4" v-for="card in cardsList" :key="card.title">
                      <v-card :class="{ 'activity-card': true, 'supervisor': card.isSupervisor }">
                        <v-card-title>
                          <v-icon size="36" class="mr-2">{{ card.icon }}</v-icon>
                          <span class="text-h6 font-weight-semibold">{{ card.title }}</span>
                        </v-card-title>
                        <v-card-subtitle class="text-h4 font-weight-bold">{{ card.count }}</v-card-subtitle>
                      </v-card>
                    </v-col>
                  </v-row>

                </v-card>
              </v-tabs-window-item>
              <v-tabs-window-item value="two">
                <v-card flat class="pa-4">
                  <h2>Informations</h2>
                  <form @submit.prevent="updateUser">
                    <v-text-field v-model.lazy.trim="user.name" label="Name" required :disabled="!isCurrentUser"></v-text-field>
                    <v-text-field v-model.lazy.trim="user.email" label="E-mail" required type="email" :disabled="!isCurrentUser"></v-text-field>
                    <v-text-field v-model="user.password" label="Password" required type="password" :disabled="!isCurrentUser"></v-text-field>
                    <v-text-field v-model="user.city" label="City" :disabled="!isCurrentUser"></v-text-field>
                    <v-text-field v-model="user.country" label="Country" :disabled="!isCurrentUser"></v-text-field>
                    <v-file-input v-model="user.photo" label="Photo" accept="image/*" :disabled="!isCurrentUser"></v-file-input>
                    <v-btn v-if="isCurrentUser" type="submit">Update</v-btn>
                    <v-btn v-if="isCurrentUser" @click="clearForm">Clear</v-btn>
                  </form>
                </v-card>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tab: 'one',
      estSuivi: false,
      user: {
        name: '',
        email: '',
        password: '',
        city: '',
        country: '',
        photo: '',
        id: null,
        validated_answers_count: 0,
        is_supervisor: false, // Ajout de la propriété pour suivre le statut de Superviseur
      },
      cards: {
        questions_count: 0,
        answers_count: 0,
        validated_answers_count: 0,
        likes_count: 0,
        follower_count: 0,
        following_count: 0,
      },
      isCurrentUser: true,
      showPromotionMessage: false, // Pour afficher le message de promotion
    };
  },
  computed: {
    cardsList() {
      const isSupervisor = this.user.validated_answers_count >= 10;
      return [
        { title: 'Questions', icon: 'mdi-comment-question-outline', count: this.cards.questions_count },
        { title: 'Réponses', icon: 'mdi-check-circle-outline', count: this.cards.answers_count },
        { title: 'Réponses validées', icon: 'mdi-thumb-up-outline', count: this.cards.validated_answers_count, isSupervisor },
        { title: 'J\'aime reçus', icon: 'mdi-heart-outline', count: this.cards.likes_count },
        { title: 'Followers', icon: 'mdi-account', count: this.cards.follower_count },
      ];
    },
  },
  methods: {
        toggleSuivi() {
      const action = this.estSuivi ? 'unfollow' : 'follow';
      const token = localStorage.getItem('access_token');

      axios
        .post(`http://127.0.0.1:8000/api/${action}`, { followed_user_id: this.user.id }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.estSuivi = !this.estSuivi;
          this.fetchUserActivities(); // Mettre à jour le nombre de followers après l'action
          this.checkPromotion();

          console.log(response.data.message);
        })
        .catch((error) => {
          console.error('Erreur lors de la requête AJAX :', error);
        });
    },
    checkFollowStatus() {
      const token = localStorage.getItem('access_token');
      axios
        .get(`http://127.0.0.1:8000/api/is-following/${this.user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.estSuivi = response.data.is_following;
        })
        .catch((error) => {
          console.error('Erreur lors de la vérification du statut de suivi :', error);
        });
    },
    updateUser() {
    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password || '');
    formData.append('city', this.user.city);
    formData.append('country', this.user.country);
    formData.append('photo', this.user.photo);

    axios
        .put(`http://127.0.0.1:8000/api/user/${this.user.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log('User updated:', response.data);
            this.user = response.data;

            // Vérification si l'utilisateur doit devenir Superviseur
            axios.post(`http://127.0.0.1:8000/api/update-user-role/${this.user.id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data.message);
                // Update the local user role status based on response if necessary
            })
            .catch((error) => {
                console.error('Error checking promotion criteria:', error);
            });
        })
        .catch((error) => {
            console.error('Error updating user:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        });
},
    clearForm() {
      this.user = {
        ...this.user,
        city: '',
        country: '',
        photo: null,
        id: null,
      };
    },
    fetchUserActivities() {
      if (!this.user.id) return;

      const token = localStorage.getItem('access_token');
      axios
        .get(`http://127.0.0.1:8000/api/user-stats/${this.user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.cards = response.data;
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des activités utilisateur :', error);
        });
    },
  
    fetchUserDetails() {
    const userId = this.$route.params.userId;
    this.isCurrentUser = true;

    axios
      .get(`http://127.0.0.1:8000/api/user-details/${userId}`)
      .then((response) => {
        this.user = response.data;
        this.user.validated_answers_count = response.data.validated_answers_count;
        this.checkFollowStatus(); // Check follow status after fetching user details
        this.checkPromotion();

        // Une fois que les détails de l'utilisateur sont chargés, récupérez ses activités
        this.fetchUserActivities();
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du profil utilisateur :', error);
      });
  },
  checkPromotion() {
      const token = localStorage.getItem('access_token');
      axios
        .post(`http://127.0.0.1:8000/api/update-user-role/${this.user.id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          if (response.data.message === 'User promoted to Superviseur') {
            this.showPromotionMessage = true;
            this.user.is_supervisor = true;
            console.log(response.data.message);
          }
        })
        .catch(error => {
          console.error('Error updating user role:', error);
        });
    },

  },
  mounted() {
    this.fetchUserActivities();
    this.fetchUserDetails();
  },
};
</script>

<style scoped>
.text-muted-foreground {
  color: var(--v-muted-foreground-base);
}
.border-bottom {
  border-bottom: 1px solid var(--v-border-base);
}
.v-app-bar {
  height: 100px;
}
.app-background {
  background-color: rgb(238, 231, 231) !important;
  min-height: 100vh;
}
.activity-card {
  border-radius: 15px;
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 20px;
}
.activity-card .v-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}
.activity-card .v-card-subtitle {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}
/* Style spécifique pour la carte des réponses validées si l'utilisateur est Superviseur */
.activity-card.supervisor {
  background-color: #1caa1c; /* Fond vert pour indiquer le statut de Superviseur */
}
</style>
