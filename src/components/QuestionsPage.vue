<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <v-row align="center" justify="space-between">
          <v-col>
            <h3>7,353,271 Questions sans réponses votées ou acceptées</h3>
          </v-col>
          <v-col>
            <v-btn outlined @click="showFilter = !showFilter">Filtre</v-btn>
          </v-col>
          <v-col>
            <v-btn outlined @click="toggleFilter">Filtre</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-expand-transition>
      <v-card v-if="showFilter" class="mb-4">
        <v-card-text>
          <v-form @submit.prevent="applyFilter">
            <v-container>
              <v-row>
                <v-col cols="4">
                  <v-checkbox
                      v-model="filters.noAnswers"
                      label="Pas de réponses"
                  ></v-checkbox>
                  <v-checkbox
                      v-model="filters.noAcceptedAnswer"
                      label="Pas de réponse acceptée"
                  ></v-checkbox>
                  <v-checkbox
                      v-model="filters.bounty"
                      label="A une prime"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4">
                  <v-radio-group v-model="sortOrder">
                    <v-radio label="Nouveau" value="Newest"></v-radio>
                    <v-radio label="Activité récente" value="RecentActivity"></v-radio>
                    <v-radio label="Score le plus élevé" value="MostVotes"></v-radio>
                    <v-radio label="Les plus fréquents" value="MostFrequent"></v-radio>
                    <v-radio label="La prime se termine bientôt" value="BountyEndingSoon"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="4">
                  <v-radio-group v-model="tagMode">
                    <v-radio label="Mes tags à suivre" value="Watched"></v-radio>
                    <v-radio label="Les balises suivantes :" value="Specified"></v-radio>
                  </v-radio-group>
                  <v-text-field
                      v-if="tagMode === 'Specified'"
                      label="par exemple javascript ou python"
                      v-model="tagQuery"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn type="submit" color="primary">Apply filter</v-btn>
                  <v-btn @click="saveFilter">Enregistrer le filtre personnalisé</v-btn>
                  <v-btn @click="toggleFilter">Annuler</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-expand-transition>

    <v-row>
      <v-col>
        <v-card>
          <v-row no-gutters>
            <v-col cols="1" class="d-flex flex-column align-items-center justify-center">
              <v-icon>mdi-thumb-up</v-icon>
              <div>92</div>
              <v-icon>mdi-comment-question-outline</v-icon>
              <div>0</div>
              <v-icon>mdi-eye</v-icon>
              <div>6k</div>
            </v-col>
            <v-col cols="11">
              <v-card-title>Marching Cubes - générer des trous dans le maillage</v-card-title>
              <v-card-subtitle>
                Je travaille sur une implémentation de Marching Cubes dans Unity. Mon code est basé sur le code de Paul Bourke avec beaucoup de modifications. Je vérifie si un bloc à une position est nul, et si c’est le cas, un débogage ...
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showFilter: false,
      filters: {
        noAnswers: false,
        noAcceptedAnswer: true,
        bounty: false,
      },
      sortOrder: "MostVotes",
      tagMode: "Specified",
      tagQuery: "",
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applyFilter() {
      console.log("Filters applied:", this.filters, this.sortOrder, this.tagMode, this.tagQuery);
    },
    saveFilter() {
      console.log("Custom filter saved");
    },
    filterQuestions(type) {
      console.log("Filtering questions by:", type);
    },
  },
};
</script>

<style>
.v-btn-group {
  display: flex;
}
.v-btn-group .v-btn {
  margin-right: 8px;
}
.v-btn-group .v-btn:last-child {
  margin-right: 0;
}
</style>
