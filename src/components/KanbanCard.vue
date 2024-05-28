<template>
  <div id="kanban-card-component">
    <span>Name: {{ props.movieCard.name }}</span>
    <span>Year: {{ props.movieCard.year }}</span>
    <span>Director: {{ props.movieCard.director }}</span>
  </div>
</template>

<script setup>
const props = defineProps(['movieCard'])
</script>

<style scoped>
#kanban-card-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 180px;
  margin-left: 5%;
  margin-bottom: 15px;
  background: #424247;
  border-radius: 15px;
  cursor: pointer;
}
#kanban-card-component:hover {
  background: #54545B;
}
</style>
