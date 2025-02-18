<template lang="pug">
  section(:data-slice-type='slice.slice_type' :data-slice-variation='slice.variation')
    //- pre {{ slice.primary.article_content }}
    prismic-rich-text(:field="slice.primary.article_content")
</template>

<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ArticleSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<style lang="sass">
p 
  margin-bottom: 1em
</style>