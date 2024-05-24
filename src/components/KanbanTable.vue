<template>
  <div id="kanban-table-component">
    <div id="titles-container" ref="titlesContainer" @scroll="followColumnsScroll">
      <div id="title-box" v-for="column in categoryColumns" :key="column._id">
        {{ column.column_name }}
      </div>
    </div>
    <div id="columns-container" ref="columnsContainer" @scroll="followTitlesScroll">
      <div id="title-column" v-for="column in categoryColumns" :key="column._id">
        <div v-if="!reactiveState.movieCards[column.column] || reactiveState.movieCards[column.column].length === 0">
          <span>No cards to show</span>
        </div>
        <div v-else>
          <div v-for="movieCard in reactiveState.movieCards[column.column]" :key="movieCard._id">
            <p>{{ movieCard.name }}</p>
            <p>{{ movieCard.category }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import axios from 'axios';

const reactiveState = reactive({ movieCards: {} });

const titlesContainer = ref(null);
const columnsContainer = ref(null);
const categoryColumns = ref([]);

const getCategoryMovieColumns = async () => {
  const response = await axios('/movie_category_columns');
  categoryColumns.value = response.data;
  getFilteredMovieCards();
}

const getFilteredMovieCards = () => {
  categoryColumns.value.forEach(async (column) => {
    const response = await axios(`/movies?category=${column.column}`);
  
    for (const cardsSet in reactiveState) {
      if (Object.prototype.hasOwnProperty.call(Object, reactiveState.movieCards, cardsSet)) {
        return;
      } else {
        reactiveState.movieCards[column.column] = response.data;
      }
    }
  });
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
