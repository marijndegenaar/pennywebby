<template lang="pug">
  .background.w-screen.h-screen.fixed.top-0.left-0.z-0
    img(src='assets/images/pennyBG.jpg').w-full.h-full.object-cover.opacity-20.md_opacity-40

  //- .w-full.md_w-8x12.mx-auto.mt-4
  //-   prismic-rich-text(:field="homedata[0].data.homepage_text").text-lg
  </template>
  
  <script setup>

  const { client } = usePrismic();
  // get content from the 'homepage' type
  const { data: homedata } = await useAsyncData(() =>
      client.getAllByType('homepage')
  );
  </script>
  
  <style lang="sass" scoped>
  .background
    background-color: #e8e8e8
  </style>