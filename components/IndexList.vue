<template lang="pug">
#content-list.md_flex
    Sidebar(:tags="tags" @filter-changed="applyFilter" :contentType="contentType").md_w-1x6.top-2.left-2.h-screen.flex.flex-col.fixed.justify-center
    .spacer.w-1x5.text-white .
    .items-container.w-full.flex.flex-wrap.md_3x6.lg_w-3x5
      .content-item.w-full.mb-8.sm_px-2.lg_px-4(v-for="item in filteredItems" :key="item.id")
          nuxt-link(:to="`/${contentType}/${item.uid}`")
            PrismicImage(v-if="item.data.featured_image" :field="item.data.featured_image").w-1x5.object-cover.absolute.right-0.featured_image
          nuxt-link(:to="item.data.url.url ? item.data.url.url : `/${contentType}/${item.uid}`" :target="item.data.url.target" )
            h2.text-xl.mt-1 
              span.title {{ item.data.title }}
              .link-text.inline.ml-2.text-xs(v-if="item.data.url.url") 🔗  {{ item.data.url.text }}
              .link-url.inline.ml-2.text-xs.hidden(v-if="item.data.url.url") 🔗 {{ item.data.url.url }}
            .subtitle.text-sm {{ new Date(item.data.date).getFullYear() }} — {{ item.data.subtitle }}
</template>

<script setup>
const { client } = usePrismic();

const props = defineProps({
    contentType: String,
});

const tags = ref([])
const selectedTags = ref([]);
const { data: items } = await useAsyncData(() =>
    client.getAllByType(props.contentType)
);

// Ensure slugTags are correctly set on items
items.value.forEach(item => {
    item.slugtags = item.tags.map(tag => tag.replace(/\s+/g, '-').toLowerCase());
});

const applyFilter = (tags) => {
  selectedTags.value = tags;
};

// Computed property to filter and sort items
const filteredItems = computed(() => {
  let result = items.value;
  
  // Apply tag filter if any tags are selected
  if (selectedTags.value.length > 0) {
    result = result.filter(item =>
      item.slugtags.some(tag => selectedTags.value.includes(tag))
    );
  }
  
  // Sort by date (newest first)
  return result.slice().sort((a, b) => {
    return new Date(b.data.date) - new Date(a.data.date);
  });
});
</script>

<style lang="sass" scoped>
h2 .title
  font-family: "Noto Serif SC"
  font-weight: 200
  // font-style: italic
a:hover h2 span.title
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
    // .link-text  
    //   display: none
    // .link-url
    //   display: inline
</style>