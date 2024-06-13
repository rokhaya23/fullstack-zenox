<template>
  <v-app>
    <v-main>
      <v-container>
        <v-col justify="start">
          <v-col cols="12" md="10" lg="10">
            <!-- Titre principal -->
            <v-card class="pa-4 mb-4">
              <h1 class="fs-headline">Posez votre question</h1>
            </v-card>

            <!-- Section de notice -->
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
                <li>Décrivez ce que vous avez essayé et ce que vous vous attendiez à ce qu'il se passe.</li>
                <li>Ajoutez des “tags” qui aideront la communauté à trouver votre question.</li>
                <li>Revoyez votre question et postez-la sur le site.</li>
              </ul>
            </div>

            <!-- Champ de saisie de titre -->
            <v-card class="pa-4 mt-4">
              <h3>Titre</h3>
              <p class="s-description">Soyez précis et imaginez que vous posez une question à une autre personne.</p>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                      label="Titre"
                      placeholder="e.g. Existe-t-il une fonction R pour trouver l'index d'un élément dans un vecteur ?"
                      maxlength="300"
                      counter
                      outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>

<!--      <       Champ de saisie de corps-->
            <v-card class="pa-4 mt-4">
              <h3>Quels sont les détails de votre problème ?</h3>
              <p class="s-description">Présentez le problème et développez ce que vous avez mis dans le titre. Minimum 20 caractères.</p>
              <v-card-text>
                <v-col cols="12">
                  <div id="app">
                    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>
                  </div>
                </v-col>
              </v-card-text>
            </v-card>

            <v-card class="pa-4 mt-4">
              <h3>Qu’avez-vous essayé et à quoi vous attendiez-vous ?</h3>
              <p class="s-description">Décrivez ce que vous avez essayé, ce que vous vous attendiez à ce qu’il se passe et ce qui en a réellement résulté. Minimum 20 caractères.
              </p>
              <v-card-text>
                <v-col cols="12">
                  <div id="app">
                    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>
                  </div>
                </v-col>
              </v-card-text>
            </v-card>

            <!-- Sélecteur de thèmes -->
            <v-card class="pa-4 mt-4">
              <h3>Tags</h3>
              <p class="s-description">Ajoutez jusqu’à 5 balises pour décrire le sujet de votre question. Commencez à taper pour voir les suggestions.
              </p>
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                      v-model="selectedThemes"
                      :items="themes"
                      label="Thèmes"
                      multiple
                      outlined
                      chips
                      dense
                      clearable
                      hide-details
                      filterable
                      item-text="name"
                      item-value="name"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'QuestioonsForm',
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
      }
    };
  }
}
</script>

<style scoped>
.s-notice {
  background-color: #e0f7fa; /* Bleu très clair */
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 20px 0;
  padding: 24px; /* Ajout de padding */
}

.steps-list {
  list-style-position: inside;
  padding-left: 16px; /* Ajustez selon vos besoins */
}

.s-description {
  color: #757575; /* Gris clair pour la description */
  font-size: 0.875rem; /* Taille de police plus petite */
}

.fs-headline {
  font-size: 2rem;
  font-weight: bold;
}

.v-card {
  margin-left: 0;
  margin-right: 0;
}
</style>
