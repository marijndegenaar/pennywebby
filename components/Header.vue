<template lang="pug">
#header.text-center.sticky.-top-8.bg-white
    nuxt-link(to="../")
        h1 Penny's Website
    #main-menu.flex.justify-center.text-center
        .menu-item.px-3    
            nuxt-link(to="/texten") Words
        .menu-item.px-3
            nuxt-link(to="/fotografie") Wandering
        .menu-item.px-3
            nuxt-link(to="/uber").ueber Penny
</template>

<script setup>
const { client } = usePrismic();

</script>

<style lang="sass" scoped>
#main-menu
    font-family: 'T'
    font-size: 1rem

.router-link-active, .menu-item:hover
    text-decoration: underline
    text-underline-offset: 6px
    text-decoration-color: #6E5F3940
    text-decoration-thickness: 1.6px

.ueber
    position: relative
.ueber::before
    content: '..'
    position: absolute
    top: -.85em
    left: .07rem
    font-size: 85%
    letter-spacing: 0.05rem
</style>