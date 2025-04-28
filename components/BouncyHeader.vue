<template lang="pug">
nuxt-link(to="../").w-1x8.fixed.left-2.top-2.z-10.hover_opacity-75.cursor-pointer.home
  img(:src='headerLogo')
//- .right-2.top-2.fixed.z-10.cursor-pointer.hover_opacity-50(@click="openMenu = !openMenu") 
  span(v-if="!openMenu") menu
  span(v-if="openMenu") close
#bouncy-menu.w-screen.h-screen.z-9.relative.overflow-hidden(v-if = "openMenu")
    .menu-item.text-center(
      v-for="(item, index) in menuItems" 
      :key="index" 
      :style="getItemStyle(item)"
    )    
        nuxt-link(:to="item.route") 
            img(:src="item.icon")
            .desc {{ item.text }}
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Import images properly to ensure they're bundled with the build
import headerLogo from '@/assets/images/penny_header.png';
import btnWords from '@/assets/images/btn_words.svg';
import btnWandering from '@/assets/images/btn_wandering.svg';
import btnSounds from '@/assets/images/btn_sounds.svg';
import btnSenses from '@/assets/images/btn_senses.svg';
import btnDreams from '@/assets/images/btn_dreams.svg';

const openMenu = ref(true);

const menuItems = ref([
  { route: '/words', icon: btnWords, text: 'Embodied Writing', x: 0, y: 0, dx: 0, dy: 0, size: 180 },
  { route: '/wandering', icon: btnWandering, text: 'About me', x: 0, y: 0, dx: 0, dy: 0, size: 180 },
  { route: '/sound', icon: btnSounds, text: 'Sounds', x: 0, y: 0, dx: 0, dy: 0, size: 180 },
  { route: '/senses', icon: btnSenses, text: 'Artistic Practice', x: 0, y: 0, dx: 0, dy: 0, size: 180 },
  { route: '/dreams', icon: btnDreams, text: 'Poetry & Stories', x: 0, y: 0, dx: 0, dy: 0, size: 180 },
]);

// Collision detection function
const checkCollision = (item, allItems) => {
  const padding = 20; // Minimum space between items
  return allItems.some(other => {
    if (item === other) return false;
    const distance = Math.sqrt(
      Math.pow(item.x - other.x, 2) + 
      Math.pow(item.y - other.y, 2)
    );
    return distance < (item.size/2 + other.size/2 + padding);
  });
};

// Initialize positions without overlaps
onMounted(() => {
  if (typeof window !== 'undefined') {
    const margin = 100;
    const maxAttempts = 100;
    
    menuItems.value.forEach((item, index) => {
      let attempts = 0;
      let hasCollision;
      
      do {
        item.x = Math.random() * (window.innerWidth - item.size - margin) + margin/2;
        item.y = Math.random() * (window.innerHeight - item.size - margin) + margin/2;
        item.dx = (Math.random() * 2 - 1) * 0.5;
        item.dy = (Math.random() * 2 - 1) * 0.5;
        
        hasCollision = checkCollision(item, menuItems.value.slice(0, index));
        attempts++;
      } while (hasCollision && attempts < maxAttempts);
    });

    animate();
  }
});

const getItemStyle = (item) => {
  return {
    left: '0',
    top: '0',
    width: `${item.size}px`,
    height: `${item.size}px`,
    transform: `translate(${item.x}px, ${item.y}px)`,
    position: 'absolute',
    transition: 'transform 0.3s ease-out',
    willChange: 'transform'
  };
};

const animate = () => {
  const bounds = document.documentElement.getBoundingClientRect();
  const padding = 20;

  menuItems.value.forEach((item, i) => {
    // Store original movement
    const originalDx = item.dx;
    const originalDy = item.dy;
    
    // Apply movement
    item.x += item.dx;
    item.y += item.dy;

    // Bounce off walls with padding
    const wallPadding = item.size * 0.6;
    if (item.x < wallPadding || item.x > bounds.width - item.size - wallPadding) {
      item.dx *= -1;
      item.x = Math.max(wallPadding, Math.min(item.x, bounds.width - item.size - wallPadding));
    }
    if (item.y < wallPadding || item.y > bounds.height - item.size - wallPadding) {
      item.dy *= -1;
      item.y = Math.max(wallPadding, Math.min(item.y, bounds.height - item.size - wallPadding));
    }

    // Check for collisions with other items
    menuItems.value.forEach((other, j) => {
      if (i !== j) {
        const distance = Math.sqrt(
          Math.pow(item.x - other.x, 2) + 
          Math.pow(item.y - other.y, 2)
        );
        const minDistance = item.size/2 + other.size/2 + padding;
        
        if (distance < minDistance) {
          // Calculate collision response
          const angle = Math.atan2(item.y - other.y, item.x - other.x);
          item.dx = Math.cos(angle) * Math.abs(originalDx);
          item.dy = Math.sin(angle) * Math.abs(originalDy);
        }
      }
    });
  });

  requestAnimationFrame(animate);
};
</script>

<style lang="sass" scoped>
.home 
  // z-index: 909
#bouncy-menu
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  // background-color: #ffffff90
  // backdrop-filter: blur(1px)
  z-index: 9

.menu-item
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  cursor: pointer
  font-family: 'T', sans-serif // Restored your original font

  mix-blend-mode: difference
  img
    width: 120px
    height: 120px
    margin-bottom: 1rem
    transition: transform 0.3s ease
    object-fit: contain

  .desc
    opacity: 0
    font-size: 1rem
    transition: opacity 0.3s ease
    color: #434343
    text-shadow: 0 0 10px purple

  &:hover
    img
      transform: scale(1.15)
    .desc
      opacity: 1

body
  overflow: hidden !important
</style>