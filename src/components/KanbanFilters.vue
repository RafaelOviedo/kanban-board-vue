<template>
  <div id="kanban-filters-component">
    <label for="category-dropdown">Categories filter</label>
    <select multiple name="category-dropdown" id="category-dropdown" v-model="categoryValue">
      <option v-for="(category, index) in props.moviesCategories" :key="index" :value="category">{{ category }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['set-filters-value'])

const categoryValue = ref([])

const props = defineProps({
  moviesCategories: {
    type: Array,
    default: () => []
  },
})

watch(categoryValue, (newValue) => {
  emit('set-filters-value', newValue);
})
</script>

<style scoped>
#kanban-filters-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 10%;
}
#category-dropdown {
  width: 15%;
  height: 55%;
  border-radius: 8px;
  outline: none;
  color: #fff;
  font-weight: bold;
  background: #424247;
}
</style>
