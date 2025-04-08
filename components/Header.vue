<template lang="pug">
#header.mb-24
    nuxt-link(to="../").w-1x8.fixed.left-2.bottom-2
        img(src='assets/images/penny_header.png')
    #main-menu.flex.justify-between.text-center.fixed.w-full.p-4
        .menu-item.px-3    
            nuxt-link(to="/words") 
                img(src='assets/images/btn_words.svg')
                .desc Words
        .menu-item.px-3
            nuxt-link(to="/wandering") 
                img(src='assets/images/btn_wandering.svg')
                .desc Wandering
        .menu-item.px-3
            nuxt-link(to="/sound") 
                img(src='assets/images/btn_sounds.svg')
                .desc Sounds
        .menu-item.px-3
            nuxt-link(to="/senses") 
                img(src='assets/images/btn_senses.svg')
                .desc Senses
        .menu-item.px-3
            nuxt-link(to="/dreams") 
                img(src='assets/images/btn_dreams.svg')
                .desc Dreams
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

// .router-link-active, .menu-item:hover
//     text-decoration: underline
//     text-underline-offset: 6px
//     text-decoration-color: #6E5F3940
//     text-decoration-thickness: 1.6px
.menu-item 
    filter: blur(1px)
    opacity: 0.2
    transition: all 200ms ease-in-out
    filter: drop-shadow(0 0 20px #999)
    mix-blend-mode: difference
    a:hover
        text-decoration: none
        border: none
    img
        height: 70px
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