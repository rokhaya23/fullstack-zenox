<template>
  <v-container fluid>
    <v-carousel
        height="650"
        show-arrows="hover"
        cycle
        hide-delimiter-background
        interval="3000"
    >
      <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
          :src="slide.src"
          cover
      >
        <v-sheet class="fill-height d-flex justify-center align-center" color="rgba(0, 0, 0, 0.3)">
          <div class="display-2 white--text text-center">{{ slide.title }}</div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <v-divider class="my-10"></v-divider>

    <v-section class="ta-center pb-64 pt-96 sm:pt-32">
      <p class="fc-black-400 fs-subheading pb-0 sm:pl-24 sm:pr-24 text-center font-weight-bold" style="font-size: 30px;">
        Thousands of organizations around the globe use Stack Overflow for Teams
      </p>
      <v-divider class="my-8"></v-divider>

      <div class="carousel-container mx-auto d-flex justify-center align-center">
        <div class="carousel-inner d-flex">
          <v-img
              v-for="(partner, index) in partnerLogos"
              :key="index"
              :src="partner.logo"
              :alt="partner.alt"
              class="carousel-item"
              width="200"
              height="50"
          ></v-img>
        </div>
      </div>
    </v-section>

    <v-divider class="my-10"></v-divider>

  
    <v-card class="mx-auto" max-width="1200">
  <v-card-title class="headline"></v-card-title>
  <v-divider></v-divider>
  <v-card-text>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" class="pa-0">
          <v-row no-gutters>
            <v-col cols="6" class="pa-2"> <!-- Ajout de marge -->
              <v-img :src="highlights[0].image" :alt="highlights[0].title" class="img-no-margin" height="200" width="200"></v-img>
            </v-col>
            <v-col cols="6" class="pa-2"> <!-- Ajout de marge -->
              <v-img :src="highlights[1].image" :alt="highlights[1].title" class="img-no-margin" height="200" width="200"></v-img>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="6" class="pa-2"> <!-- Ajout de marge -->
              <v-img :src="highlights[2].image" :alt="highlights[2].title" class="img-no-margin" height="200" width="200"></v-img>
            </v-col>
            <v-col cols="6" class="pa-2"> <!-- Ajout de marge -->
              <v-img :src="highlights[3].image" :alt="highlights[3].title" class="img-no-margin" height="200" width="200"></v-img>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex flex-column justify-center align-center">
          <div class="ml-sm-4">
            <h1>{{ mainDescription.title }}</h1>
            <p>{{ mainDescription.text }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</v-card>


<v-container class="py-10">
        <v-card class="shadow-lg rounded-lg p-10" max-width="1200px" style="margin: 0 auto;">
          <v-card-title class="text-center">
            <h2 class="text-2xl font-bold mb-6">Pricing</h2>
          </v-card-title>
          <v-card-text>
            <v-row justify="center" align="center" class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="text-card-foreground shadow-lg rounded-lg" min-height="600px">
                  <v-card-title class="text-center py-6">
                    <h3 class="text-2xl font-semibold leading-none tracking-tight">Free Plan</h3>
                  </v-card-title>
                  <v-card-text>
                    <div class="flex flex-col gap-4 items-center">
                      <div>
                        <h3 class="text-2xl font-bold">$0</h3>
                        <p class="text-gray-500">per month</p>
                      </div>
                      <ul class="custom-list">
                        <li>Access to basic features</li>
                        <li>Limited number of questions per month</li>
                        <li>Limited community support</li>
                        <li>Basic analytics</li>
                        <li>Access to public Q&A</li>
                        <li>Standard security features</li>
                      </ul>
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn color="primary" dark class="rounded-full" @click="signUp">Sign Up</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="shadow-lg rounded-lg" style="background: linear-gradient(to right, #2196F3, #9C27B0); color: white;" min-height="600px">
                  <v-card-title class="text-center py-6">
                    <h3 class="text-2xl font-semibold leading-none tracking-tight">Pro Plan</h3>
                  </v-card-title>
                  <v-card-text>
                    <div class="flex flex-col gap-4 items-center">
                      <div>
                        <h3 class="text-2xl font-bold">$9.99</h3>
                        <p class="text-gray-200">per month</p>
                      </div>
                      <ul class="custom-list" style="color: #E0E0E0;">
                        <li>Unlimited questions and answers</li>
                        <li>Priority community support</li>
                        <li>Access to exclusive content and resources</li>
                        <li>Advanced analytics</li>
                        <li>Ad-free experience</li>
                        <li>Monthly webinars with experts</li>
                      </ul>
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn color="white" dark class="rounded-full" @click="subscribe">Subscribe</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="shadow-lg rounded-lg" style="background: linear-gradient(to right, #4CAF50, #009688); color: white;" min-height="600px">
                  <v-card-title class="text-center py-6">
                    <h3 class="text-2xl font-semibold leading-none tracking-tight">Enterprise Plan</h3>
                  </v-card-title>
                  <v-card-text>
                    <div class="flex flex-col gap-4 items-center">
                      <div>
                        <h3 class="text-2xl font-bold">$99.99</h3>
                        <p class="text-gray-200">per month</p>
                      </div>
                      <ul class="custom-list" style="color: #E0E0E0;">
                        <li>Dedicated account manager</li>
                        <li>Custom features and integrations</li>
                        <li>Advanced analytics and reporting</li>
                        
                        <li>24/7 priority support</li>
                        <li>Access to beta features</li>
                        <li>Comprehensive security and compliance</li>
                      </ul>
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn color="white" dark class="rounded-full" @click="contactSales">Contact Sales</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
  <v-card class="mx-auto" max-width="1200">
      <v-card-title class="text-left pb-12 pt-12 sm:pt-16 custom-title">Presentation</v-card-title>
      <v-divider></v-divider>
  <v-card-text>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="5" >
          <!-- Insérez ici le composant de vidéo -->
          <v-responsive aspect-ratio="16/9">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/kLG9m7AGICo" frameborder="0" allowfullscreen></iframe>
                  </v-responsive>
                        </v-col>
        <v-col cols="12" sm="6" class="d-flex flex-column justify-center align-center">
          <!-- <v-card> -->
            <v-card-text>
              <h2>Rencontrez le fondateur
              </h2>
              <p>Notre fondateur, John Doe, est passionné par la création d'une communauté où les gens peuvent se réunir pour apprendre, partager et grandir. Avec plus de 10 ans d'expérience dans l'industrie technologique, il possède une profonde compréhension des défis auxquels les développeurs sont confrontés et s'engage à créer une plateforme qui permet à chacun de réussir.</p>
            </v-card-text>
            <v-card-actions>
              <!-- Ajoutez ici des boutons ou d'autres actions si nécessaire -->
            </v-card-actions>
          <!-- </v-card> -->
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {src: 'https://twosixtech.com/wp-content/uploads/Stack-Overflow.jpg'},
        {
          src: 'https://www.eurekoi.org/wp-content/uploads/2008/02/question-reponse-1280x825-1-1024x661.jpg',
          title: 'Welcome To Our Help Platform'
        },
        {src: 'https://m.economictimes.com/thumb/msid-69278189,width-1200,height-900,resizemode-4,imgsize-74151/help-getty.jpg'}
      ],
      partnerLogos: [
        { logo: 'https://cdn.sstatic.net/Img/product/teams/logos/overstock-alt.svg?v=ed38ea932870', alt: 'Overstock' },
        { logo: 'https://cdn.sstatic.net/Img/product/teams/logos/philips-alt.svg?v=7fc60c993103', alt: 'Philips' },
        { logo: 'https://cdn.sstatic.net/Img/product/teams/logos/verizon-media-alt.svg?v=f335b20096b2', alt: 'Verizon Digital Media' },
        { logo: 'https://cdn.sstatic.net/Img/product/teams/logos/wisetech-global-alt.svg?v=3b6b11e76536', alt: 'WiseTech Global' },
        { logo: 'https://cdn.sstatic.net/Img/product/teams/logos/microsoft-alt.svg?v=8d57316c924b', alt: 'Microsoft' },
        { logo: 'https://cdn.sstatic.net/Img/product/teams/logos/ibm-alt.svg?v=8f0d8e0c6c7b', alt: 'IBM' },

        // Add more partner logos as needed
      ],
      highlights: [
        {
          image: 'data:image/jpeg;base64,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',
          title: 'Blog Post 1',
          description: 'This is a description for blog post 1.'
        },
        {
          image: 'data:image/jpeg;base64,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',
          title: 'Blog Post 2',
          description: 'This is a description for blog post 2.'
        },
        {
          image: 'data:image/png;base64,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',
          title: 'Blog Post 3',
          description: 'This is a description for blog post 3.'
        },
        {
          image: 'data:image/jpeg;base64,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',
          title: 'Blog Post 4',
          description: 'This is a description for blog post 4.'
        }
      ],
      mainDescription: {
        title: "Bienvenue sur notre plateforme d'entraide!",
        text: "Notre application vous permet de poser des questions et d'obtenir des réponses de la part de la communauté. Chaque question peut être associée à plusieurs thèmes pour une recherche efficace. "
      },
        currentIndex: 0,
      carouselTime: 1000, // 3 seconds
    };
  },
  mounted() {
    setInterval(() => {
      this.currentIndex++;
      const carouselInner = this.$el.querySelector('.carousel-inner');
      carouselInner.style.transform = `translateX(-${this.currentIndex * 200}px)`;
      if (this.currentIndex >= this.partnerLogos.length) {
        this.currentIndex = 0;
        carouselInner.style.transition = 'none';
        carouselInner.style.transform = `translateX(0)`;
        setTimeout(() => {
          carouselInner.style.transition = 'transform 0.5s ease';
        }, 50);
      }
    }, this.carouselTime);
  },
};
</script>

<style>
.v-carousel-item .v-image__image {
  object-fit: cover;
}

.v-carousel-item .v-sheet {
  background: rgba(0, 0, 0, 0.3);
}

.display-2 {
  font-size: 3rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.carousel-container {
  overflow: hidden;
  width: 800px; /* Adjust width as needed */
}
.carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
}
.carousel-item {
  flex: none;
  width: 200px; /* Adjust width as needed */

}

.img-no-margin {
  margin: 0 !important;
  padding: 0 !important;
}

.v-card-text .v-row.no-gutters > .v-col {
  padding: 0 !important;
}
.custom-title {
  font-weight: bold;
  font-size: 24px; /* Ajustez la taille du texte selon vos besoins */
}
.text-card-foreground {
  background: linear-gradient(to right, #ffffff, #e3e3e3);
}
.custom-list {
  list-style-type: disc;
  padding-left: 1.5rem;
  color: #6B7280; /* text-gray-500 */
  font-size: 1.125rem; /* text-lg */
}

.custom-list li {
  margin-bottom: 0.5rem; /* Espace entre les éléments */
}
</style>
