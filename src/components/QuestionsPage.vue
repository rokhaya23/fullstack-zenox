<template>
  <v-app class="app-background">
    <v-main>
      <v-container fluid>
        <v-card class="pa-5 mt-5">
          <!-- En-tête aligné pour les titres des questions et liste des questions -->
          <v-row class="header-row" align="center">
            <v-col cols="9">
              <h1 class="fs-headline">Liste des Questions</h1>
              <v-btn color="primary" dark @click="poserQuestion" class="mt-4">
                Poser une question
              </v-btn>
            </v-col>
            <v-col cols="3">
              <h3 class="sidebar-title">Titres des Questions</h3>
            </v-col>
          </v-row>

          <v-row class="mb-n2">
            <!-- Colonne 1 (9/12) pour la liste des questions -->
            <v-col cols="9">
              <v-row>
                <v-col cols="12" md="10" lg="10" v-for="(question, index) in questions" :key="index">
                  <v-card class="pa-5 ma-0 mt-5 question-card">
                    <div class="icon-background">
                      <v-icon class="background-icon" large>mdi-comment-question-outline</v-icon>
                    </div>
                    <h4 class="question-title" @click="goToAnswer(question.id)" style="cursor: pointer;">{{ question.title }}</h4>
                    <!-- Affichage des tags -->
                    <div class="d-flex align-center">
                      <div>
                        <v-chip v-for="(theme, index) in parseThemes(question.themes)" :key="index" class="mr-2">
                          {{ theme }}
                        </v-chip>
                      </div>
                      <!-- Informations supplémentaires -->
                      <div class="ml-auto">
                        <v-icon small class="mr-2">mdi-eye</v-icon>{{ question.views }}
                        <v-icon small class="ml-4 mr-2" @click="likeQuestion(question.id)">mdi-thumb-up</v-icon>{{ question.likes }}
                        <v-icon small class="ml-4 mr-2">mdi-comment-multiple</v-icon>{{ question.answers }}
                        <!-- Afficher le nom de l'utilisateur et la date -->
                        <div>
                          <span>{{ question.user.name }} {{ '  ,' }}</span>
                          <span>{{ formatDate(question.created_at) }}</span>
                        </div>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>

            <!-- Colonne 2 (3/12) pour les titres des questions -->
            <v-col cols="3">
              <v-row>
                <v-col cols="12" v-for="(question, index) in questions" :key="'sidebar-' + index" class="sidebar-card">
                  <h6 class="sidebar-link" @click="goToAnswer(question.id)">{{ question.title }}</h6>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';

export default {
  name: 'QuestionList',
  data() {
    return {
      questions: []
    };
  },
  created() {
    this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://127.0.0.1:8000/api/questions', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.questions = response.data.questions;

        // Appeler la méthode pour récupérer le nombre de vues pour chaque question
        this.fetchViewCounts();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Erreur 401 : Non autorisé. Veuillez vérifier votre jeton d\'authentification.');
        } else {
          console.error('Erreur lors de la récupération des questions :', error);
        }
      }
    },
    async fetchViewCounts() {
      try {
        const token = localStorage.getItem('access_token');
        // Pour chaque question, récupérer le nombre de vues
        for (let question of this.questions) {
          const response = await axios.get(`http://127.0.0.1:8000/api/questions/${question.id}/increment-views`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          question.views = response.data.views; // Mettre à jour views pour la question actuelle
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des nombres de vues :', error);
      }
    },
    async likeQuestion(questionId) {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.post(`http://127.0.0.1:8000/api/questions/${questionId}/like`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Mettre à jour le nombre de likes localement après une réponse réussie
        const question = this.questions.find(q => q.id === questionId);
        if (question) {
          question.likes = response.data.likes;
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un like :', error);
      }
    },
    parseThemes(themesJson) {
      try {
        const themes = JSON.parse(themesJson);
        return Array.isArray(themes) ? themes : [];
      } catch (error) {
        console.error('Erreur lors de la conversion du JSON des thèmes :', error);
        return [];
      }
    },
    timeSince(date) {
      const seconds = Math.floor((new Date() - date) / 1000);
      let interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        return interval + " an" + (interval > 1 ? 's' : '');
      }
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        return interval + " mois";
      }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return interval + " jour" + (interval > 1 ? 's' : '');
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return interval + " heure" + (interval > 1 ? 's' : '');
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return interval + " minute" + (interval > 1 ? 's' : '');
      }
      return Math.floor(seconds) + " seconde" + (Math.floor(seconds) > 1 ? 's' : '');
    },
    poserQuestion() {
      this.$router.push('/questionsform');
    },
    goToAnswer(questionId) {
      this.$router.push(`/answers/${questionId}`);
    },
    formatDate(dateString) {
      // Formater la date en format YYYY-MM-DD HH:MM
      return format(new Date(dateString), 'yyyy-MM-dd , HH:mm');
    },
  }
};
</script>

<style scoped>
.app-background {
  background: url('') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
}

.fs-headline {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.sidebar-link {
  color: #1eb8ff;
  cursor: pointer;
  transition: color 0.3s ease;
}

.sidebar-link:hover {
  color: #ff4081;
}

.header-row {
  margin-bottom: 20px;
}

.question-card {
  width: 100%;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.question-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.sidebar-card {
  padding: 10px;
  background-color: rgba(240, 240, 240, 0.8);
  border-radius: 4px;
  margin-bottom: 10px;
}

.question-title {
  color: #1eb8ff;
  margin-bottom: 16px;
}

.d-flex {
  display: flex;
  align-items: center;
}

.align-center {
  align-items: center;
}

.ml-auto {
  margin-left: auto;
}

.icon-background {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0.1;
}

.background-icon {
  font-size: 100px;
  color: #000;
}

@media (max-width: 960px) {
  .fs-headline {
    font-size: 2rem;
  }
  .background-icon {
    font-size: 60px;
  }
}
</style>
