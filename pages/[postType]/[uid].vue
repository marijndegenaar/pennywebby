<template lang="pug">
  //- pre {{ page.data }}
  .md_flex
    NuxtLink(to="../texten").md_w-1x6.text-sm.pt-2.hover_text-light-brown.mb-2.block.sticky.top-5.max-h-screen ← Back
    .md_w-4x6
      .post-header.mb-8.text-center.flex.flex-col.items-center
        img(v-if="page.data.featured_image.url" :src="page.data.featured_image.url").w-2x3.mb-6
        h1.text-xxl.font-medium   {{ page.data.title }}
        .subtitle.text-sm {{ new Date(page.data.date).getFullYear() }} — {{ page.data.subtitle }}
        //- .date.text-sm.mt-1.text-light-brown 
      .post-content
        PrismicRichText(:field="page.data.content")
        //- SliceZone(wrapper="main", :slices="page?.data.slices ?? []", :components="components")
</template>
<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const route = useRoute();
const { data: page, error } = await useAsyncData(`[text-uid-${route.params.uid}]`, () =>
  prismic.client.getByUID("text", route.params.uid as string)
);

if (error.value) {
  console.error("Error fetching page:", error.value);
}

</script>
<style lang="sass">
  .post-content
    p   
      margin-bottom: 1em 

</style>

