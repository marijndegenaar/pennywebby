<template lang="pug">
    .w-full.md_w-3x6.mx-auto
        //- pre {{ data[0].data.photo.url }}
        img(:src="data[0].data.photo.url" alt="Wandering Image")
    .w-full.md_w-8x12.mx-auto.mt-4
        prismic-rich-text(:field="data[0].data.content").text-lg
    .w-full.md_w-8x12.mx-auto.mt-4.chinese
        prismic-rich-text(:field="data[0].data.chinese_content").text-lg
  </template>
  
  <script setup>

  const { client } = usePrismic();
  // get content from the 'homepage' type
  const { data: data } = await useAsyncData(() =>
      client.getAllByType('about')
  );
  </script>
  
  <style lang="sass" scoped>
    :deep(h3)
        font-size: 2em
        margin-bottom: .5em
        text-align: center
    :deep(p)
        margin-bottom: 1em
    .chinese
        font-family: "Noto Serif SC"
        font-weight: 200
  </style>