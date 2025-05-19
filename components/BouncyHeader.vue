<template lang="pug">
nuxt-link(to="../").w-2x3.md_w-1x8.fixed.left-2.top-2.z-10.hover_opacity-75.cursor-pointer.home
  img(:src='headerLogo').hidden.md_block
  img(src='assets/images/penny_header_mobile.png').md_hidden
#mobile-menu.md_hidden.flex.flex-col.items-center.space-between.h-screen.pt-24
  .mobile-menu-item.text-center.w-1x2.p-4(
      v-for="(item, index) in menuItems" 
      :key="index" 
    )    
      nuxt-link(:to="item.route")
          img.w-full(:src="item.icon")
          .desc.text-sm.mt-2 {{ item.text }}
#bouncy-menu.w-screen.h-screen.z-9.relative.overflow-hidden.hidden.md_block(v-if = "openMenu")
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

// Use absolute paths from the public directory
const headerLogo = '/images/penny_header.png';

const openMenu = ref(true);

// Use absolute paths that reference the public directory
const menuItems = ref([
  { route: '/words', icon: '/images/btn_words.svg', text: 'Embodied Writing', x: 0, y: 0, dx: 0, dy: 0, size: 180 },
  { route: '/wandering', icon: '/images/btn_wandering.svg', text: 'About me', x: 0, y: 0, dx: 0, dy: 0, size: 180 },
  { route: '/sounds', icon: '/images/btn_sounds.svg', text: 'Sounds', x: 0, y: 0, dx: 0, dy: 0, size: 180 },
  { route: '/senses', icon: '/images/btn_senses.svg', text: 'Artistic Practice', x: 0, y: 0, dx: 0, dy: 0, size: 180 },
  { route: '/dreams', icon: '/images/btn_dreams.svg', text: 'Poetry & Stories', x: 0, y: 0, dx: 0, dy: 0, size: 180 },
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
#mobile-menu
  z-index: 909
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