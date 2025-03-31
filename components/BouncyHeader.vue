<template lang="pug">
//- img(src='assets/images/penny_header.png')
#bouncy-menu.w-screen.h-screen.z-10
    .menu-item.px-3.text-center(v-for="(item, index) in menuItems" :key="index" :style="item.style")    
        nuxt-link(:to="item.route") 
            img(:src="item.icon")
            .desc {{ item.text }}
    //- .menu-item.px-3
    //-     nuxt-link(to="/about").ueber Penny
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Define menu items with initial empty positions
const menuItems = ref([
  { route: '/texten', icon: '/_nuxt/assets/images/btn_words.svg', text: 'Words', x: 0, y: 0, dx: 0, dy: 0 },
  { route: '/wandering', icon: '/_nuxt/assets/images/btn_wandering.svg', text: 'Wandering', x: 0, y: 0, dx: 0, dy: 0 },
  { route: '/sound', icon: '/_nuxt/assets/images/btn_sounds.svg', text: 'Sounds', x: 0, y: 0, dx: 0, dy: 0 },
  { route: '/senses', icon: '/_nuxt/assets/images/btn_senses.svg', text: 'Senses', x: 0, y: 0, dx: 0, dy: 0 },
  { route: '/dreams', icon: '/_nuxt/assets/images/btn_dreams.svg', text: 'Dreams', x: 0, y: 0, dx: 0, dy: 0 },
]);

// Initialize positions and velocities when component mounts
onMounted(() => {
  if (typeof window !== 'undefined') {
    menuItems.value.forEach(item => {
      item.x = Math.random() * window.innerWidth;
      item.y = Math.random() * window.innerHeight;
      item.dx = Math.random() * 4 - 2;
      item.dy = Math.random() * 4 - 2;
    });

    animate();
  }
});

// Computed styles for each menu item
const updateMenuStyles = () => {
  menuItems.value.forEach(item => {
    item.style = {
      transform: `translate(${item.x}px, ${item.y}px)`,
      transition: 'transform 0.016s linear'
    };
  });
};

// Animation loop
const animate = () => {
  const bounds = document.documentElement.getBoundingClientRect();

  menuItems.value.forEach(item => {
    // Update position
    item.x += item.dx;
    item.y += item.dy;

    // Bounce off walls
    if (item.x < 0 || item.x > bounds.width - 100) item.dx *= -1;
    if (item.y < 0 || item.y > bounds.height - 100) item.dy *= -1;
  });

  updateMenuStyles();
  requestAnimationFrame(animate);
};
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
.menu-item 
    img
        height: 120px
        margin-bottom: .25rem
        mix-blend-mode: difference
        filter: drop-shadow(10px, 10px, 10px green)
    .desc
        opacity: 0
        font-size: .75rem
    &:hover
        .desc
            opacity: 1

.ueber
    position: relative
.ueber::before
    content: '..'
    position: absolute
    top: -.85em
    left: .07rem
    font-size: 85%
    letter-spacing: 0.05rem

.menu-item
    position: absolute
</style>