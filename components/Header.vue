<template lang="pug">
#header
    nuxt-link(to="../").w-1x2.md_w-1x8.fixed.left-2.top-2.hover_opacity-75.home
        img(src='assets/images/penny_header_mobile.png').md_hidden
        img(src='assets/images/penny_header.png').hidden.md_block
    //- #main-menu.flex.justify-between.text-center.fixed.w-full.p-3
    #menu-toggle.text-sm.md_hidden.fixed.right-2.top-6(@click="toggleMenu" :class="{ 'active': isMenuOpen }") {{ isMenuOpen ? 'Close' : 'Menu' }}
    #main-menu.flex.flex-col.text-center.fixed.p-3.right-2.top-2.bg-white.md_bg-transparent.h-screen.w-full.md_w-1x8.items-center(:class="{ 'hidden': !isMenuOpen }").md_block
        .menu-item.px-3.mb-6.w-1x2.md_w-full
            nuxt-link(to="/words" @click="closeMenu") 
                img(src='assets/images/btn_words.svg')
                .desc Embodied Writing
        .menu-item.px-3.mb-6.w-1x2.md_w-full
            nuxt-link(to="/sounds" @click="closeMenu") 
                img(src='assets/images/btn_sounds.svg')
                .desc Sounds
        .menu-item.px-3.mb-6.w-1x2.md_w-full
            nuxt-link(to="/senses" @click="closeMenu") 
                img(src='assets/images/btn_senses.svg')
                .desc Artistic Practice
        .menu-item.px-3.mb-6.w-1x2.md_w-full
            nuxt-link(to="/dreams" @click="closeMenu") 
                img(src='assets/images/btn_dreams.svg')
                .desc Poetry & Stories
        .menu-item.px-3.mb-6.w-1x2.md_w-full
            nuxt-link(to="/wandering" @click="closeMenu") 
                img(src='assets/images/btn_wandering.svg')
                .desc About Me
        //- .menu-item.px-3
        //-     nuxt-link(to="/about").ueber Penny
</template>

<script setup>
const { client } = usePrismic();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
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
    // filter: blur(1px)
    opacity: 1
    transition: all 200ms ease-in-out
    // filter: drop-shadow(0 0 20px #999)
    mix-blend-mode: difference
    a:hover
        text-decoration: none
        border: none
    img 
        width: 100%
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

#menu-toggle
    cursor: pointer
    z-index: 910
    &.active
        color: #6E5F39
</style>