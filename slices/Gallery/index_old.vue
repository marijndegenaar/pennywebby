<template lang="pug">
  .gallery.flex.w-full.relative.mb-2
    button(@click="prevSlide").left-0.text-white.md_-left-6.absolute.z-10.md_text-light-brown.cursor-pointer.md_hover_text-brown.h-full.text-lg 〈
    .slideshow(ref="slideshow" @scroll="handleScroll").w-full
      .slideshow-container
        //- Clone last item at the start
        .slideshow-item(v-for="item in [slice.primary.gallery[slice.primary.gallery.length - 1], ...slice.primary.gallery, slice.primary.gallery[0]]" :key="item.id")
          img(:src="item.image.url" :alt="item.image.alt").w-full.h-auto.aspect-3x2.object-cover
    button(@click="nextSlide").right-0.text-white.absolute.md_-right-6.md_text-light-brown.cursor-pointer.md_hover_text-brown.h-full.text-lg 〉
  .gallery-info.mb-32
    .md_flex
      h1.md_w-1x3.mb-2.font-medium {{ slice.primary.name }}
      p.text-base.md_w-2x3 {{ slice.primary.description }}
      
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { ref, onMounted } from 'vue';

// Destructure slice from the props
const props = defineProps(
  getSliceComponentProps<Content.GallerySlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const slideshow = ref(null)
const isTransitioning = ref(false)

onMounted(() => {
  // Position at first real slide (skip the clone)
  if (slideshow.value) {
    slideshow.value.scrollLeft = slideshow.value.clientWidth
  }
})

function handleScroll() {
  if (!isTransitioning.value && slideshow.value) {
    const { scrollLeft, scrollWidth, clientWidth } = slideshow.value
    
    if (scrollLeft >= scrollWidth - clientWidth) {
      slideshow.value.scrollLeft = clientWidth
    } else if (scrollLeft <= 0) {
      slideshow.value.scrollLeft = scrollWidth - clientWidth * 2
    }
  }
}

function nextSlide() {
  if (slideshow.value && !isTransitioning.value) {
    const { scrollLeft, scrollWidth, clientWidth } = slideshow.value
    
    // If we're at the last real slide
    if (scrollLeft >= scrollWidth - clientWidth * 2) {
      // First scroll smoothly to the clone
      slideshow.value.scrollBy({ 
        left: slideshow.value.clientWidth, 
        behavior: 'smooth' 
      });
      
      // After the smooth scroll completes, jump back to first real slide
      isTransitioning.value = true
      setTimeout(() => {
        slideshow.value.scrollLeft = clientWidth
        isTransitioning.value = false
      }, 500) // Match this to your scroll animation duration
    } else {
      // Normal scroll behavior
      slideshow.value.scrollBy({ 
        left: slideshow.value.clientWidth, 
        behavior: 'smooth' 
      });
    }
  }
}

function prevSlide() {
  if (slideshow.value && !isTransitioning.value) {
    const { scrollLeft, clientWidth } = slideshow.value
    
    // If we're at the first real slide
    if (scrollLeft <= clientWidth) {
      // First scroll smoothly to the clone
      slideshow.value.scrollBy({ 
        left: -slideshow.value.clientWidth, 
        behavior: 'smooth' 
      });
      
      // After the smooth scroll completes, jump to last real slide
      isTransitioning.value = true
      setTimeout(() => {
        slideshow.value.scrollLeft = slideshow.value.scrollWidth - clientWidth * 2
        isTransitioning.value = false
      }, 500) // Match this to your scroll animation duration
    } else {
      // Normal scroll behavior
      slideshow.value.scrollBy({ 
        left: -slideshow.value.clientWidth, 
        behavior: 'smooth' 
      });
    }
  }
}
</script>

<style lang="sass">
.gallery-header
  justify-content: space-between

.slideshow
  position: relative
  overflow-x: scroll
  scroll-snap-type: x mandatory
  -webkit-overflow-scrolling: touch // For smoother scrolling on iOS
  scrollbar-width: none  // Hides scrollbar on Firefox
  &::-webkit-scrollbar
    display: none  // Hides scrollbar on Chrome/Safari

.slideshow-container
  display: flex
  width: 100%

.slideshow-item
  flex: 0 0 100%
  min-width: 100%
  scroll-snap-align: start
  scroll-snap-stop: always

.buttons
  position: absolute
  width: 100%
  height: 100%
  align-items: flex-start
  button
    width: 50%
    height: 100%

  img
    width: 100%
    height: auto
    aspect-ratio: 3/2
    object-fit: contain
</style>