<template lang="pug">
#header
    nuxt-link(to="../").w-1x8.fixed.left-2.top-2.hover_opacity-75.home
        img(src='assets/images/penny_header.png')
    //- #main-menu.flex.justify-between.text-center.fixed.w-full.p-3
    #main-menu.flex.flex-col.text-center.fixed.p-3.right-2.top-2.w-1x8
        .menu-item.px-3.mb-6    
            nuxt-link(to="/words") 
                img(src='assets/images/btn_words.svg')
                .desc Embodied Writing
        .menu-item.px-3.mb-6
            nuxt-link(to="/sound") 
                img(src='assets/images/btn_sounds.svg')
                .desc Sounds
        .menu-item.px-3.mb-6
            nuxt-link(to="/senses") 
                img(src='assets/images/btn_senses.svg')
                .desc Artistic Practice
        .menu-item.px-3.mb-6
            nuxt-link(to="/dreams") 
                img(src='assets/images/btn_dreams.svg')
                .desc Poetry & Stories
        .menu-item.px-3.mb-6
            nuxt-link(to="/wandering") 
                img(src='assets/images/btn_wandering.svg')
                .desc About Me
        //- .menu-item.px-3
        //-     nuxt-link(to="/about").ueber Penny
</template>

<script setup>
const { client } = usePrismic();

</script>

<style lang="sass" scoped>
#main-menu
    font-family: 'T'
    font-size: 1rem
    z-index: 909
.home
    z-index: 909
// .router-link-active, .menu-item:hover
//     text-decoration: underline
//     text-underline-offset: 6px
//     text-decoration-color: #6E5F3940
//     text-decoration-thickness: 1.6px
.menu-item 
    filter: blur(1px)
    opacity: 1
    transition: all 200ms ease-in-out
    filter: drop-shadow(0 0 20px #999)
    mix-blend-mode: difference
    a:hover
        text-decoration: none
        border: none
    img
        height: 80px
        margin-bottom: .25rem
        mix-blend-mode: difference
    .desc
        opacity: 0
        font-size: .75rem
    &:hover
        opacity: 1
        filter: blur(0)
        filter: drop-shadow(0 0 10px purple)
        .desc
            opacity: 1
            text-decoration: none

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