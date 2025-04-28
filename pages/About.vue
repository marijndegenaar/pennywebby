<template lang="pug">
  pre {{ data }}
  .w-full.md_w-8x12.mx-auto.mt-4
    prismic-rich-text(:field="data.content").text-lg
  </template>
  
  <script setup>

  const { client } = usePrismic();
  // get content from the 'homepage' type
  const { data: data } = await useAsyncData(() =>
      client.getAllByType('about')
  );
  </script>
  
  <style lang="sass" scoped>
  </style>