<template>
  <main id="home-view">
    <KanbanBoard />
  </main>
</template>

<script setup>
import KanbanBoard from '@/components/KanbanBoard.vue';
</script>

<style scoped>
#home-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: #fff;
  background: #27272A;
}
</style>
