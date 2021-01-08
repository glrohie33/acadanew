<template>
  <div class="wm-main-banner">
    <div class="wm-banner-one">
      <div class="banner">
        <VueSlickCarousel
          class="slider-for wm-banner-one-for"
          ref="B1"
          id="Banner1"
          v-bind="settings1"
        >
          <div class="wm-banner-one-for-layer">
            <img src="../extra-images/banner-view1-1.jpg" alt />
          </div>
          <div class="wm-banner-one-for-layer">
            <img src="../extra-images/banner-view1-2.jpg" alt />
          </div>
          <div class="wm-banner-one-for-layer">
            <img src="../extra-images/banner-view1-3.jpg" alt />
          </div>
          <div class="wm-banner-one-for-layer">
            <img src="../extra-images/banner-view1-1.jpg" alt />
          </div>
        </VueSlickCarousel>
      </div>
      <div>
        <VueSlickCarousel
          class="slider-nav wm-banner-one-nav"
          ref="B2"
          @beforeChange="effectChange"
          v-bind="settings2"
          id="banner2"
        >
          <div class="wm-banner-one-nav-layer">
            <h1>International Programmes</h1>
            <p>The study programmes of the Enroll Campus University are open to people from all nationalities.</p>
            <a href="#" class="wm-banner-btn">learn more</a>
          </div>
          <div class="wm-banner-one-nav-layer">
            <h1>UA Degree Programmes</h1>
            <p>We offer companies the opportunity to access the technology and knowledge developed at the Enroll Campus University.</p>
            <a href="#" class="wm-banner-btn">know more</a>
          </div>
          <div class="wm-banner-one-nav-layer banner-bgcolor">
            <h1>Research & Business</h1>
            <p>The scientific community nominates CRISPR System, based on research developed at the UA.</p>
            <a href="#" class="wm-banner-btn">learn more</a>
          </div>
          <div class="wm-banner-one-nav-layer">
            <h1>International Programmes</h1>
            <p>The study programmes of the Enroll Campus University are open to people from all nationalities.</p>
            <a href="#" class="wm-banner-btn">learn more</a>
          </div>
        </VueSlickCarousel>
      </div>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  components: {
    VueSlickCarousel: VueSlickCarousel
  },
  data() {
    return {
      settings1: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        vertical: true,
        fade: true,
        asNavFor: this.$refs.B2
      },
      settings2: {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: this.$refs.B1,
        dots: false,
        vertical: true,
        centerMode: false,
        focusOnSelect: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              vertical: true
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              vertical: true
            }
          },
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              vertical: true
            }
          },
          {
            breakpoint: 1920,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              vertical: true
            }
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              vertical: true,
              arrows: true
            }
          }
        ]
      }
    };
  },
  created() {
    console.log(this.$refs.B2);
  },
  methods: {
    effectChange(oldIndex, newIndex) {
      this.$refs.B1.goTo(newIndex);
    }
  }
};
</script>

<style lang="scss" >
.slick-current .wm-banner-one-nav-layer {
  background-color: #222845;
}

.slick-current h1 {
  color: #ffffff;
}

.slick-current .wm-banner-btn {
  background-color: #b99663;
  color: #ffffff;
}

.wm-banner-one-nav .slick-prev {
  left: 6px;
  margin-bottom: 33px;
  transform: rotate(90deg);
}

.wm-banner-one-nav .slick-next {
  left: 6px;
  bottom: 6px;
  transform: rotate(90deg);
}

.wm-banner-one-nav .slick-prev:before,
.wm-banner-one-nav .slick-next:before {
  color: #fff !important;
}
</style>  