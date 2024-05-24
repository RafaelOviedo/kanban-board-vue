<template>
  <div id="kanban-board-component">
    <KanbanFilters />
    <KanbanTable />
  </div>
</template>

<script setup>
import KanbanTable from './KanbanTable.vue';
import KanbanFilters from './KanbanFilters.vue';
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
