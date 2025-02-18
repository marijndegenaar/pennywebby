<template lang="pug">
  .w-full.md_w-8x12.mx-auto.mt-4
    prismic-rich-text(:field="homedata[0].data.homepage_text").text-lg
  </template>
  
  <script setup>

  const { client } = usePrismic();
  // get content from the 'homepage' type
  const { data: homedata } = await useAsyncData(() =>
      client.getAllByType('homepage')
  );
  </script>
  
  <style lang="sass" scoped>
  
  </style>