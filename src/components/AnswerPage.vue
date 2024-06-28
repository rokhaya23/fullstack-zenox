<template>
  <v-app class="app-background">
    <v-main>
      <v-container>
        <!-- En-tête de la question -->
        <div id="question-header" class="d-flex sm:flex-column mb-8">
          <h1 class="fs-headline1 word-break mb-8 flex-grow-1">
            <a href="#" class="question-hyperlink">{{ questionTitle }}</a>
          </h1>
          <!-- Bouton pour poser une question -->
          <div class="ml-12 d-flex justify-end">
            <v-btn color="primary" class="white--text" href="/questionsform">
              Poser une question
            </v-btn>
          </div>
        </div>

        <!-- Contenu de la question avec formatage CKEditor -->
        <v-card class="pa-4 mb-4 question-card">
          <div v-html="formattedQuestionBody"></div>
          <v-btn @click="likeQuestion" color="primary" class="mt-2" :class="{ 'liked': isQuestionLiked }" :disabled="isQuestionLiked">
            <v-icon>mdi-thumb-up-outline</v-icon> {{ likeCount }}
          </v-btn>
        </v-card>

        <!-- Champ de réponse -->
        <v-card class="pa-4 mt-4 answer-card">
          <h3>Votre réponse</h3>
          <v-card-text>
            <div id="app">
              <ckeditor :editor="editor" v-model="body" :config="editorConfig"></ckeditor>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn class="bg-primary" @click="submitAnswer">Soumettre</v-btn>
          </v-card-actions>
          <!-- Affichage du message de succès ou d'erreur -->
          <v-alert v-if="submitMessage" :type="submitMessageType" outlined>{{ submitMessage }}</v-alert>
        </v-card>

        <!-- Liste des réponses -->
        <v-divider class="my-8"></v-divider>
        <h2 class="fs-subtitle">Réponses</h2>
        <v-list>
          <v-list-item v-for="(answer, index) in answers" :key="index">
            <v-card :class="['pa-4 mb-4 answer-card', { 'answered': answer.is_valid }]" >
              <v-list-item-title v-html="answer.body"></v-list-item-title>
              <v-btn @click="likeAnswer(answer.id)" color="white" class="mt-2" :class="{ 'liked': answer.liked }" :disabled="answer.liked">
                <v-icon>mdi-thumb-up-outline</v-icon> {{ answer.likes ? answer.likes.length : 0 }}
              </v-btn>
              <v-btn v-if="isSupervisor" @click="validateAnswer(answer.id)" :color="answer.is_valid ? 'green' : 'primary'" class="mt-2">
                <v-icon>mdi-check-circle-outline</v-icon>
              </v-btn>
            </v-card>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

export default {
  name: 'AnswerPage',
  data() {
    return {
      editor: ClassicEditor,
      body: '',
      editorConfig: {
        // Configurations de l'éditeur CKEditor
      },
      questionTitle: '',
      questionBody: '',
      likeCount: 0,
      isQuestionLiked: false, // Ajout de l'état pour les likes de la question
      answers: [], // Tableau pour stocker les réponses
      submitMessage: '', // Message de soumission
      submitMessageType: 'success', // Type de message par défaut
      isSupervisor: false // Détermine si l'utilisateur est superviseur
    };
  },
  computed: {
    formattedQuestionBody() {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = this.questionBody;
      const codeBlocks = tempDiv.querySelectorAll('pre');
      codeBlocks.forEach(block => {
        block.classList.add('lang-js', 's-code-block');
      });
      return tempDiv.innerHTML;
    }
  },
  mounted() {
    this.fetchQuestion();
    this.checkUserRoles(); // Vérifiez le rôle de l'utilisateur
  },
  methods: {
    fetchQuestion() {
      const questionId = this.$route.params.questionId;
      const token = localStorage.getItem('access_token');

      axios.get(`http://127.0.0.1:8000/api/question/${questionId}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      .then(response => {
          this.questionTitle = response.data.question.title;
          this.questionBody = response.data.question.body;
          this.likeCount = response.data.question.likes;
          this.isQuestionLiked = response.data.question.is_liked;
          this.answers = response.data.question.answers.map(answer => {
              answer.likes = answer.likes || 0;
              answer.liked = answer.is_liked;

              // Récupérer les états de validation et de likes depuis localStorage si disponibles
              const storedLiked = localStorage.getItem(`answer_${answer.id}_liked`);
              if (storedLiked !== null) {
                  answer.liked = JSON.parse(storedLiked);
              }
              const storedLikes = localStorage.getItem(`answer_${answer.id}_likes`);
              if (storedLikes !== null) {
                  answer.likes = JSON.parse(storedLikes);
              }
              const storedValid = localStorage.getItem(`answer_${answer.id}_valid`);
              if (storedValid !== null) {
                  answer.is_valid = JSON.parse(storedValid);
              }

              return answer;
          });
      })
      .catch(error => {
          console.error('Erreur lors du chargement de la question :', error);
      });
    },
    async submitAnswer() {
      try {
          const token = localStorage.getItem('access_token');
          const response = await axios.post('http://127.0.0.1:8000/api/add-reponses', {
              body: this.body,
              question_id: this.$route.params.questionId
          }, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });

          // Afficher le message de succès
          this.submitMessage = response.data.message;
          this.submitMessageType = 'success';

          // Réinitialiser le champ de réponse après la soumission réussie
          this.body = '';

          // Mettre à jour les réponses après ajout
          this.fetchQuestion();
      } catch (error) {
          // Afficher le message d'erreur
          this.submitMessage = 'Erreur lors de la soumission de la réponse : ' + error.message;
          this.submitMessageType = 'error';
      }
    },
    async likeAnswer(answerId) {
      try {
        const token = localStorage.getItem('access_token');
        const answer = this.answers.find(a => a.id === answerId);

        // Déterminer si l'utilisateur veut ajouter ou retirer son like
        const isCurrentlyLiked = answer.liked;

        // Envoyer la requête pour ajouter ou retirer le like
        const response = await axios.post(
          `http://127.0.0.1:8000/api/answers/${answerId}/like`,
          { isLiked: !isCurrentlyLiked }, // Envoyer l'état actuel inversé
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Mettre à jour les likes pour cette réponse
        if (answer) {
          answer.likes = response.data.likes;
          answer.liked = !isCurrentlyLiked; // Inverser l'état du like local

          // Mettre à jour localStorage
          localStorage.setItem(`answer_${answerId}_liked`, JSON.stringify(answer.liked));
          localStorage.setItem(`answer_${answerId}_likes`, JSON.stringify(answer.likes));
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour des likes de la réponse :', error);
      }
    },
    async validateAnswer(answerId) {
      try {
          const token = localStorage.getItem('access_token');
          const response = await axios.post(`http://127.0.0.1:8000/api/validated-answer/${answerId}/validate`, {}, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });

          // Mettre à jour l'état de validation pour cette réponse
          const answer = this.answers.find(a => a.id === answerId);
          if (answer) {
              answer.is_valid = response.data.is_valid;

              // Mettre à jour localStorage
              localStorage.setItem(`answer_${answerId}_valid`, JSON.stringify(answer.is_valid));
          }
      } catch (error) {
          console.error('Erreur lors de la validation de la réponse :', error.response);
          this.submitMessage = 'Erreur lors de la validation de la réponse : ' + error.response.data.message;
          this.submitMessageType = 'error';
      }
    },
    likeQuestion() {
      const questionId = this.$route.params.questionId;
      const token = localStorage.getItem('access_token');

      if (this.isQuestionLiked) {
          // Si l'utilisateur a déjà aimé cette question, ne pas permettre un autre like
          return;
      }

      axios.post(`http://127.0.0.1:8000/api/questions/${questionId}/like`, {}, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      .then(response => {
          this.likeCount = response.data.likes;
          this.isQuestionLiked = response.data.is_liked; // Mettre à jour l'état des likes de la question
      })
      .catch(error => {
          console.error('Erreur lors de la mise à jour des likes :', error);
      });
    },
    checkUserRoles() {
      const token = localStorage.getItem('access_token');

      axios.get(`http://127.0.0.1:8000/api/user-detail`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      .then(response => {
          const roles = response.data.roles;
          if (roles && roles.includes('Superviseur')) {
              this.isSupervisor = true;
          } else {
              this.isSupervisor = false;
          }
      })
      .catch(error => {
          console.error('Erreur lors de la vérification des rôles de l\'utilisateur :', error);
      });
    }
  }
}
</script>

<style scoped>
.app-background {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.fs-headline1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

.question-hyperlink {
  color: #1976d2;
  text-decoration: none;
  transition: color 0.2s;
}

.question-hyperlink:hover {
  color: #1565c0;
}

.question-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.answer-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.lang-js {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.s-code-block {
  margin-bottom: 16px;
}

.bg-primary {
  background-color: #1976d2;
  color: white;
}

.bg-primary:hover {
  background-color: #1565c0;
}

.liked {
  color: rgba(0, 0, 255, 0.397) !important; /* Couleur rouge pour les éléments aimés */
}

.v-btn .v-icon {
  margin-right: 4px;
}

.answered {
  border-left: 5px solid green;
}
</style>
