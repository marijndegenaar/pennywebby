<template lang="pug">
#content-list.md_flex
    Sidebar(:tags="tags" @filter-changed="applyFilter" :contentType="contentType").md_w-1x6.top-2.left-2.h-screen.flex.flex-col.fixed.justify-center
    .spacer.w-1x5.text-white .
    .items-container.w-full(:class="{ 'md_w-5x6': contentType === 'fotografie', 'md_3x6 lg_w-4x6': contentType !== 'fotografie' }").flex.flex-wrap  
        .content-item.w-full.mb-8.sm_px-2.lg_px-4(:class="{ 'sm_w-1x2 lg_w-1x3': contentType === 'fotografie' }" v-for="item in filteredItems" :key="item.id")
            nuxt-link(:to="`/${contentType}/${item.uid}`")
              PrismicImage(v-if="item.data.featured_image" :field="item.data.featured_image").w-1x5.object-cover.absolute.right-0.featured_image
            nuxt-link(:to="`/${contentType}/${item.uid}`")
              h2.text-xl.font-medium.mt-1 {{ item.data.title }}
              .subtitle.text-sm {{ new Date(item.data.date).getFullYear() }} — {{ item.data.subtitle }}
</template>

<script setup>

const { client } = usePrismic();

const props = defineProps({
    contentType: String, // Either 'fotografie' or 'text'
    // tags: {
    //     type: Array,
    //     required: true,
    // },
});

const tags = ref([])

const selectedTags = ref([]);
const { data: items } = await useAsyncData(() =>
    client.getAllByType(props.contentType)
);

// Computed property to filter items based on selectedTags
const filteredItems = computed(() => {
  if (selectedTags.value.length === 0) return items.value; // No filter applied, show all items

  return items.value.filter(item =>
    item.slugtags.some(tag => selectedTags.value.includes(tag))
  );
});

const applyFilter = (tags) => {
  selectedTags.value = tags;
};

// Ensure slugTags are correctly set on items
items.value.forEach(item => {
    item.slugtags = item.tags.map(tag => tag.replace(/\s+/g, '-').toLowerCase());
});


</script>

<style lang="sass" scoped>
a:hover h2
  text-decoration: underline
  text-underline-offset: 6px
  text-decoration-color: #6E5F3940
  text-decoration-thickness: 2px

.content-item 
  transition: all 0.5s ease-out
  .featured_image
    display: none
  &:hover
    .featured_image
      display: block
</style>
