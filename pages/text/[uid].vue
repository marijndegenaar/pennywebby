<template lang="pug">
  //- pre {{ page.data }}
  .md_flex
    NuxtLink(to="../texten").md_w-1x6.text-sm.pt-2.hover_text-light-brown.mb-2.block.sticky.top-5.max-h-screen ← Züruck
    .md_w-4x6
      .post-header.mb-8
        h1.text-xl.font-medium   {{ page.data.title }}
        .subtitle.text-lg {{ page.data.subtitle }}
        .date.text-sm.mt-1.text-light-brown {{ page.data.date }}
      .post-content
        SliceZone(wrapper="main", :slices="page?.data.slices ?? []", :components="components")
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

