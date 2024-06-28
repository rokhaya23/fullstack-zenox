<template>
  <v-app class="app-background">
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="10" lg="10">
            <v-row align="center">
              <v-col cols="8">
                <h1 class="fs-headline">Posez votre question</h1>
              </v-col>
              <v-col cols="4" class="d-flex justify-end">
                <img src="https://th.bing.com/th/id/OIP.A9S76EUrpReUEtKpjv4zwgHaHa?pid=ImgDet&w=152&h=152&c=7" alt="Image" class="header-image"/>
              </v-col>
            </v-row>

            <div>
              <div class="s-notice s-notice__info p-4">
                <h2 class="fs-title fw-normal mb-2">Rédiger une bonne question</h2>
                <p class="fs-body-2 mb-2">
                  Vous êtes prêt à
                  <a href="https://stackoverflow.com/help/how-to-ask">poser</a>
                  une
                  <a href="https://stackoverflow.com/help/on-topic">question liée à la programmation</a>
                  et ce formulaire vous aidera à travers le processus.
                </p>
                <p class="fs-body-2 mb-2">
                  Vous souhaitez poser une question non liée à la programmation ? Consultez
                  <a href="https://stackexchange.com/sites#technology-traffic">les sujets ici</a>
                  pour trouver un site pertinent.
                </p>
                <h5 class="fw-bold mb-2">Étapes</h5>
                <ul class="steps-list">
                  <li>Résumez votre problème en une ligne.</li>
                  <li>Décrivez votre problème plus en détail.</li>
                  <li>Ajoutez des “tags” qui aideront la communauté à trouver votre question.</li>
                  <li>Revoyez votre question et postez-la sur le site.</li>
                </ul>
              </div>

              <v-card class="pa-4 mt-4">
                <h3>Titre</h3>
                <p class="s-description">Soyez précis et imaginez que vous posez une question à une autre personne.</p>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Titre"
                      v-model="title"
                      placeholder="e.g. Existe-t-il une fonction R pour trouver l'index d'un élément dans un vecteur ?"
                      maxlength="300"
                      counter
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>

              <v-card class="pa-4 mt-4">
                <h3>Quels sont les détails de votre problème ?</h3>
                <p class="s-description">Présentez le problème et développez ce que vous avez mis dans le titre. Minimum 20 caractères.</p>
                <v-card-text>
                  <v-col cols="12">
                    <div id="app">
                      <ckeditor :editor="editor" v-model="body" :config="editorConfig"></ckeditor>
                    </div>
                  </v-col>
                </v-card-text>
              </v-card>

              <v-card class="pa-4 mt-4">
                <h3>Tags</h3>
                <p class="s-description">Ajoutez jusqu’à 5 balises pour décrire le sujet de votre question. Commencez à taper pour voir les suggestions.</p>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="selectedThemes"
                      :items="themes"
                      item-text="name"
                      item-value="name"
                      label="Thèmes"
                      multiple
                      outlined
                      chips
                      dense
                      clearable
                      hide-details
                      filterable
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card>

              <v-card v-if="questionExistante" class="pa-4 mt-4">
                <h3>Résultats de la recherche</h3>
                <div v-for="(question, index) in questionsTrouvees" :key="index">
                  <h4>{{ question.title }}</h4>
                  <p>{{ question.body }}</p>
                </div>
              </v-card>
              
              <v-spacer class="mt-10"></v-spacer>
              <v-btn v-if="isLoggedIn" @click="envoyerQuestion" color="primary">Envoyer la question</v-btn>
              <v-btn v-else color="primary" disabled>Envoyer la question</v-btn>

              <v-alert v-if="message" :type="messageType" dismissible>{{ message }}</v-alert>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

export default {
  name: 'QuestionsForm',
  data() {
    return {
      editor: ClassicEditor,
      body: '',
      editorConfig: {},
      title: '',
      selectedThemes: [],
      themes: ['react', 'vuejs', 'javaFX', 'javascript', 'angular', 'laravel', 'flask', 'django', 'java', 'c#'], // Thèmes définis manuellement
      questionExistante: false,
      questionsTrouvees: [],
      message: '',
      messageType: 'success',
      isLoggedIn: false
    };
  },
  mounted() {
    this.isLoggedIn = !!localStorage.getItem('access_token');
  },

  methods: {
    rechercherQuestion() {
      if (this.title.trim() !== '') {
        this.questionsTrouvees = [
          { title: 'Titre de la question 1', body: 'Corps de la question 1' },
          { title: 'Titre de la question 2', body: 'Corps de la question 2' }
        ];
        this.questionExistante = true;
      }
    },

    async envoyerQuestion() {
  try {
    // Validation côté frontend (optionnel, mais recommandé)
    if (!this.title || !this.body || this.selectedThemes.length === 0) {
      this.message = 'Veuillez remplir tous les champs.';
      this.messageType = 'error';
      return;
    }

    // Envoi de la requête POST
    const response = await axios.post('http://127.0.0.1:8000/api/add-questions', {
      title: this.title,
      body: this.body,
      themes: this.selectedThemes
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    // Réponse réussie
    this.message = response.data.message;
    this.messageType = 'success';
    
    // Réinitialisation du formulaire
    this.resetForm();
    this.$router.push('/questions');

  } catch (error) {
    // Erreur lors de la requête
    this.message = error.response.data.message || 'Une erreur s\'est produite';
    this.messageType = 'error';
  }
},

    resetForm() {
      this.title = '';
      this.body = '';
      this.selectedThemes = [];
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    }
  }
};
</script>

<style scoped>
.app-background {
  background-color: #fcfcfc;
  min-height: 100vh;
}

.header-with-image {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-image {
  width: 140px;
  height: auto;
}

.s-notice {
  background-color: #e0f7fa;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 20px 0;
  padding: 24px;
}

.steps-list {
  list-style-position: inside;
  padding-left: 16px;
}

.s-description {
  color: #757575;
  font-size: 0.875rem;
}

.fs-headline {
  font-size: 2rem;
  font-weight: bold;
}

.v-card {
  margin-left: 0;
  margin-right: 0;
}

.d-flex {
  display: flex;
}

.justify-end {
  justify-content: flex-end;
}
</style>
