<template>
  <v-app class="app-background">
    <v-main>
      <v-container>
        <v-card class="pa-5 mt-5">
          <h1 class="fs-headline1 mb-6">Tags</h1>
          <v-row class="mb-4 align-center">
            <v-col cols="8">
              <h5 class="fs-body2 mb-4 small-text">
                A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
              </h5>
            </v-col>
            <v-col cols="4" class="text-right">
              <!-- Afficher le bouton Ajouter Un Thème selon le rôle de l'utilisateur -->
              <v-btn v-if="userRole.includes('Superviseur')" @click="dialog = true" class="mt-4" color="primary">Ajouter Un thème</v-btn>
            </v-col>
          </v-row>
          <!-- Liste des tags filtrée -->
          <v-row>
            <v-col v-for="(theme, index) in filteredTags" :key="index" cols="12" md="6" lg="4">
              <v-card class="pa-3 mb-4 tag-card d-flex flex-column">
                <div class="d-flex justify-space-between align-center mb-3">
                  <div>
                    <a :href="`/questions/tagged/${theme.name}`" class="s-tag post-tag">{{ theme.name }}</a>
                  </div>
                </div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <div class="flex-grow-1 fc-black-500 mb-3 v-truncate4" v-bind="attrs" v-on="on">{{ truncatedDescription(theme.description) }}</div>
                  </template>
                  <span>{{ theme.description }}</span>
                </v-tooltip>
                <div class="mt-auto d-flex justify-space-between fs-caption fc-black-400">
                  <div>{{ theme.questions_count }} questions</div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>

        <!-- Modal pour ajouter un thème -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Ajouter Un Thème</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="newTag.name" label="Nom" :rules="[rules.required]" required></v-text-field>
                <v-textarea v-model="newTag.description" label="Description" :rules="[rules.required]" required></v-textarea>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="addTag">Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
        <!-- Snackbar pour les messages de succès -->
        <v-snackbar v-model="successSnackbar" :timeout="snackbarTimeout" top color="success">
          {{ successMessage }}
        </v-snackbar>

        <!-- Snackbar pour les messages d'erreur -->
        <v-snackbar v-model="errorSnackbar" :timeout="snackbarTimeout" top color="error">
          {{ errorMessage }}
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TagsPage',
  data() {
    return {
      dialog: false,
      valid: false,
      newTag: {
        name: '',
        description: ''
      },
      rules: {
        required: value => !!value || 'Required.'
      },
      tagFilter: '',
      tags: [], // Utilisation de tags au lieu de theme
      userRole: '',
      successSnackbar: false,
      errorSnackbar: false,
      snackbarTimeout: 6000,
      successMessage: '',
      errorMessage: ''
    };
  },
  computed: {
    filteredTags() {
      if (!this.tagFilter.trim()) {
        return this.tags;
      }
      const filterText = this.tagFilter.trim().toLowerCase();
      return this.tags.filter(tag => tag.name.toLowerCase().includes(filterText));
    }
  },
  mounted() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = 'http://127.0.0.1:8000/api/home'; // Redirige vers la page de connexion si le jeton n'est pas présent
    } else {
      this.fetchUserRole(token);
    }
  },
  methods: {
    async fetchTags(token) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/themes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.tags = response.data.themes; // Utilisation de response.data.themes pour récupérer les thèmes
      } catch (error) {
        console.error('Error fetching tags:', error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 401) {
          alert('Unauthorized access. Please login again.');
          localStorage.removeItem('access_token');
          window.location.href = 'http://127.0.0.1:8000/api/login';
        }
      }
    },
    async fetchUserRole(token) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user-auth', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.userRole = response.data.roles; // Assurez-vous que roles est correctement retourné par votre API

        // Appel à fetchTags après avoir récupéré le rôle
        this.fetchTags(token);
      } catch (error) {
        console.error('Error fetching user role:', error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 401) {
          alert('Unauthorized access. Please login again.');
          localStorage.removeItem('access_token');
          window.location.href = 'http://127.0.0.1:8000/api/login';
        }
      }
    },
    async addTag() {
      const token = localStorage.getItem('access_token');
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/add-themes', this.newTag, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.tags.push(response.data); // Ajouter le nouveau tag à la liste des tags
          this.dialog = false;
          this.newTag.name = '';
          this.newTag.description = '';
          this.showSuccessMessage('Le thème a été ajouté avec succès.');
        } catch (error) {
          console.error('Error adding tag:', error.response ? error.response.data : error.message);
          if (error.response && error.response.status === 401) {
            alert('Unauthorized access. Please login again.');
            localStorage.removeItem('access_token');
            window.location.href = 'http://127.0.0.1:8000/api/home';
          } else {
            this.showErrorMessage('Erreur lors de l\'ajout du thème.');
          }
        }
      }
    },
    truncatedDescription(description) {
      return description.length > 100 ? description.substring(0, 100) + '...' : description;
    },
    showSuccessMessage(message) {
      this.successMessage = message;
      this.successSnackbar = true;
    },
    showErrorMessage(message) {
      this.errorMessage = message;
      this.errorSnackbar = true;
    }
  }
};
</script>

<style scoped>
.app-background {
  background-color: #f5f5f5 !important;
  min-height: 100vh;
}

.fs-headline1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.fs-body2 {
  font-size: 1rem;
  color: #7f8c8d;
}

.fs-caption {
  font-size: 0.875rem;
  color: #7f8c8d;
}

.s-tag {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.my-3 {
  margin: 1rem 0;
}

.text-right {
  text-align: right;
}

.text-field {
  border-radius: 12px;
}

.d-flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.justify-space-between {
  justify-content: space-between;
}

.flex-grow-1 {
  flex-grow: 1;
}

.tag-card {
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.tag-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.v-avatar {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5rem;
}

.v-divider {
  background-color: #e0e0e0;
}

.v-icon {
  color: #7f8c8d;
}

/* Ajouter le CSS pour la troncature de texte */
.v-truncate4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 6em; /* Ajuster la hauteur maximale selon vos besoins */
}
</style>
