<template lang="pug">
    .md_flex
        img(:src="pagedata.data.photo.url").w-full.md_w-3x12.h-full.mb-4
        .w-full.md_w-8x12.mb-16.pl-8
            prismic-rich-text(:field="pagedata.data.content")
    
</template>

<script setup>
const prismic = usePrismic();
const { data: pagedata, error } = await useAsyncData('about', () =>
  prismic.client.getSingle('about')
);

if (error.value) {
  console.error("Error fetching about page:", error.value);
}


</script>

<style lang="sass" scoped>
a:link
    text-decoration: underline
    text-underline-offset: 6px
    text-decoration-color: #6E5F3940
    text-decoration-thickness: 1.6px
a:hover
    text-align: none
    color: #6E5F39
</style>