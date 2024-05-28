<template>
  <div id="kanban-board-component">
    <KanbanFilters @set-filters-value="setFiltersValue" :movies-categories="moviesCategories" />
    <KanbanTable @set-movies-categories="setMoviesCategories" :filters-value="filtersValue" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import KanbanTable from './KanbanTable.vue';
import KanbanFilters from './KanbanFilters.vue';

const moviesCategories = ref([])
const filtersValue = ref([])

const setMoviesCategories = (data) => {
  data.forEach(movieCategory => {
    moviesCategories.value.push(movieCategory.column);
  });
}
const setFiltersValue = (filters) => {
  filtersValue.value = filters;
}
</script>

<style scoped>
#kanban-board-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
