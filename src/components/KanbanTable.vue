<template>
  <div id="kanban-table-component">
    <div id="titles-container" ref="titlesContainer" @scroll="followColumnsScroll">
      <div id="title-box" v-for="item in categoryColumns" :key="item.id">
        {{ item.column_name }}
      </div>
    </div>
    <div id="columns-container" ref="columnsContainer" @scroll="followTitlesScroll">
      <div id="title-column" v-for="item in categoryColumns" :key="item.id">
        {{ item.column_name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const categoryColumns = ref([]);
const titlesContainer = ref(null)
const columnsContainer = ref(null)

const getCategoryMovieColumns = async () => {
  const response = await axios('/movie_category_columns');
  categoryColumns.value = response.data;
}

const followTitlesScroll = () => {
  titlesContainer.value.scrollLeft = columnsContainer.value.scrollLeft;
}
const followColumnsScroll = () => {
  columnsContainer.value.scrollLeft = titlesContainer.value.scrollLeft;
}

onMounted(() => {
  getCategoryMovieColumns();
})
</script>

<style scoped>
#kanban-table-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
}
#titles-container {
  width: 100%;
  height: 5%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none;
}
#title-box {
  display: inline-block;
  width: 300px;
  height: 100%;
  background: grey;
  border: 1px solid #000;
}
#columns-container {
  width: 100%;
  height: 95%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none;
}
#title-column {
  display: inline-block;
  width: 300px;
  height: 100%;
  background: grey;
  border: 1px solid #000;
}
</style>
