<template lang="pug">
Header(v-if="$route.path != '/'")
BouncyHeader(v-if="$route.path === '/'")
#layout.default.p-2.md_p-4.lg_container.lg_mx-auto
    //- .container.m-auto
    slot
//- Footer
</template>

<style lang="sass">
#__nuxt
    min-height: 100vh
    display: flex
    flex-direction: column

</style>