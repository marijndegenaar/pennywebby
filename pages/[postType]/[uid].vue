<template lang="pug">
  //- pre {{ page.data }}
  .md_flex.mt-14
    NuxtLink(:to="contentType === 'text' ? '/words' : './'").md_w-1x6.text-sm.pt-2.hover_text-light-brown.mb-2.block.md_fixed.md_top-36.max-h-screen ← Back
    .spacer.w-1x6.text-white.hidden.md_block .
    .md_w-4x6
      .post-header.mb-8.text-center.flex.flex-col.items-center
        img(v-if="page.data.featured_image.url" :src="page.data.featured_image.url").w-full.md_w-2x3.mb-6
        h1.text-xxl.leading-none.mb-2.md_leading-tight.md_mb-4
          .title   {{ page.data.title }}
        .subtitle.text-sm {{ new Date(page.data.date).getFullYear() }} — {{ page.data.subtitle }}
        //- .date.text-sm.mt-1.text-light-brown 
      .post-content(:lang="page.data.text_is_chinese ? 'ch' : ''")
        //- pre {{ page.data.text_is_chinese }}
        PrismicRichText(:field="page.data.content")
        SliceZone(wrapper="main", :slices="page?.data.slices ?? []", :components="components")
</template>
<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const route = useRoute();

// Map your route to the correct Prismic content type
const contentType = computed(() => {
  if (route.path.startsWith('/words')) {
    return 'text';
  } else if (route.path.startsWith('/senses')) {
    return 'senses';
  } else if (route.path.startsWith('/sounds')) {
    return 'sounds';
  } else if (route.path.startsWith('/dreams')) {
    return 'dreams';
  } else {
    return 'text'; // fallback
  }
});

const { data: page, error } = await useAsyncData(`[${contentType.value}-uid-${route.params.uid}]`, () =>
  prismic.client.getByUID(contentType.value, route.params.uid as string)
);

if (error.value) {
  console.error("Error fetching page:", error.value);
}
</script>

<style lang="sass">
h1 .title
  font-family: "Noto Serif SC"
.post-content
  p   
    margin-bottom: 1em 
  &:lang(ch)
    font-family: "Noto Serif SC"
ol
  list-style: auto
  font-size: .75rem
  li
    margin-bottom: .5em
    padding-left: .5em
</style>

