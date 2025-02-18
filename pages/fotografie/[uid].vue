<template lang="pug">
  .md_flex
    NuxtLink(to=".").md_w-1x6.md_pt-2.text-sm.hover_text-light-brown.block.mb-4.sticky.top-5.max-h-screen ← Züruck
    .md_w-4x6(v-if="page.data")
      .page-header.mb-6.md_w-5x6(v-if="page?.data.title")
        h1.text-xl.font-medium {{ page.data.title }}
        h2.text-lg.mb-4 {{ page.data.subtitle }}
        prismic-rich-text(:field="page.data.description")
      SliceZone(wrapper="main", :slices="page?.data.slices ?? []", :components="components")
      
      
      //- pre {{ page.data.description }}
</template>
<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const route = useRoute();
// get single content by uid from 'fotografie' content type
const { data: page, error } = await useAsyncData(`[fotografie-uid-${route.params.uid}]`, () =>
  prismic.client.getByUID("fotografie", route.params.uid as string)
);

if (error.value) {
  console.error("Error fetching page:", error.value);
}


</script>

