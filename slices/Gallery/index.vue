<template lang="pug">
  .gallery(v-if="slice.primary.slideshow === true")
    Carousel(v-bind="config" ref="carouselRef" v-model="currentSlide").w-full.h-full.mb-2
      Slide(v-for="item in slice.primary.gallery" :key="item.id")
        .image.relative(:class="{ 'h-full': item.image.dimensions.height > item.image.dimensions.width }")
          img(:src="item.image.url" :alt="item.image.alt").h-full.object-contain
          .caption.absolute.right-0.buttom-0.text-xs.pt-1 {{ item.image.alt}}
      template(#addons='{ slidesCount }')
        Navigation(v-if="slidesCount > 1").hidden.md_block
  
  .gallery-list(v-if="slice.primary.slideshow ==!true | !slice.primary.slideshow")
    .image(v-for="item in slice.primary.gallery" :key="item.id").mb-32.last_mb-4
      img(:src="item.image.url" :alt="item.image.alt").h-full.object-contain
      .caption.text-xs.pt-1.text-right.opacity-40 {{ item.image.alt}}

  //- .gallery-info.mb-32
  //-   .md_flex
  //-     h1.md_w-1x3.mb-2.font-medium(v-if="slice.primary.name") {{ slice.primary.name }}
  //-     p.text-base.md_w-2x3(v-if="slice.primary.description") {{ slice.primary.description }}
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";

// Destructure slice from the props
const props = defineProps(
  getSliceComponentProps<Content.GallerySlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const carouselRef = ref();
const currentSlide = ref(0);

const next = () => carouselRef.value.next();
const prev = () => carouselRef.value.prev();

const config = {
	itemsToShow: 1.1,
	snapAlign: 'start',
  wrapAround: true,
  height: 500,
  gap: 20,
	breakpoints: {
    700: {
      itemsToShow: 1,
      snapAlign: 'center',
    },
	},
};


</script>

<style lang="sass">
.carousel__slide
  .image
      img 
        // height: 96% 
        // background: green
      .caption
          // height: 4%
          // background: red
          // transform: translateY(-100%)

  // padding: 2px
// .carousel__next, .carousel__prev
//   display: none
@media (min-width: 768px)
  .carousel__slide
    padding: 0
  .carousel__next
    margin: 0
    transform: translateX(calc(-50% + 50px))
    opacity: .6
  .carousel__prev
    transform: translateX(calc(-50% - 30px))
    opacity: .6
  
</style>