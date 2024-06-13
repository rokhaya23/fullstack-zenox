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
      currentIndex: 0,
      carouselTime: 3000, // 3 seconds
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
</style>
