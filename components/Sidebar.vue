<template lang="pug">
#sidebar.text-sm
    .sidebar-item.capitalize.mx-2.md_mr-4.md_mb-1(v-for="tag in ['Alle', ...tags]" :key="tag").text-light-brown
        label(:class="{ 'text-brown': selectedTags === tag || (tag === 'Alle' && selectedTags === '') }")
            input(type="checkbox" :value="tag" v-model="selectedTags" @change="updateFilter(tag)" ).hidden
            | {{ tag }}
</template>

<script setup lang="ts">
const { client } = usePrismic();

const props = defineProps({
    contentType: String, // Either 'fotografie' or 'text'
    tags: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['filter-changed']);
const selectedTags = ref('');

// Emit selected tags to parent component
const updateFilter = (tag) => {
  selectedTags.value = tag === 'Alle' ? '' : tag;
  emit('filter-changed', selectedTags.value);
};

// const tags = ['alle', 'flower', 'landscape', 'portrait', 'street', 'urban'];
// const tags = slugTags;

// Get all data from content type
const { data: items } = await useAsyncData(() =>
    client.getAllByType(props.contentType)
);

// Get all tags from items and create slugs from tags
const tags = [...new Set(items.value.flatMap(item => item.tags.map(tag => tag.replace(/\s+/g, '-').toLowerCase())))];


// // add slugTags back to items
// items.value.forEach(item => {
//     item.slugtags = item.tags.map(tag => tag.replace(/\s+/g, '-').toLowerCase());
// });

</script>


<style lang="sass" scoped>
@media (min-width: 768px)
    #sidebar label:hover 
        color: #6E5F39
    #sidebar label
        cursor: pointer
</style>