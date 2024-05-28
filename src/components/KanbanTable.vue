<template>
  <div id="kanban-table-component">
    <div id="titles-container" ref="titlesContainer" @scroll="followColumnsScroll">
      <div class="title-box" v-for="column in categoryColumns" :key="column._id" :style="showWhenFiltering(column)">
        {{ column.column_name }}
      </div>
    </div>
    <div id="columns-container" ref="columnsContainer" @scroll="followTitlesScroll">
      <div class="movie-column" v-for="column in categoryColumns" :key="column._id" :style="showWhenFiltering(column)">
        <div v-if="!reactiveState.movieCards[column.column] || reactiveState.movieCards[column.column].length === 0" class="no-showing-cards-message">
          <span>No cards to show</span>
        </div>
        <div v-else>
          <kanban-card 
            v-for="movieCard in reactiveState.movieCards[column.column]" 
            :key="movieCard._id" 
            :movie-card="movieCard"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import KanbanCard from './KanbanCard.vue'
import { onMounted, ref, reactive, computed } from 'vue';
import axios from 'axios';

const props = defineProps({
  filtersValue: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['set-movies-categories']);

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

    if (Object.prototype.hasOwnProperty.call(Object, reactiveState.movieCards, column)) {
      return;
    } else {
      reactiveState.movieCards[column.column] = response.data;
    }
  });

  emit('set-movies-categories', categoryColumns.value);
}

const followTitlesScroll = () => {
  titlesContainer.value.scrollLeft = columnsContainer.value.scrollLeft;
}
const followColumnsScroll = () => {
  columnsContainer.value.scrollLeft = titlesContainer.value.scrollLeft;
}

const showWhenFiltering = computed(() => {
  return (column) => {
    if (!props.filtersValue.length) {
      return {};
    }
    else if (!props.filtersValue.includes(column.column)) {
      return { display: 'none' };
    } else {
      return {};
    }
  }
});

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
.title-box {
  display: inline-block;
  width: 300px;
  height: 100%;
  text-align: center;
  padding-top: 5px;
  font-size: 15px;
  font-weight: bold;
  border: 2px solid #424247;
}
#columns-container {
  display: flex;
  width: 100%;
  height: 95%;
  overflow: scroll;
  border: 1px solid #424247;
}
.movie-column {
  width: 300px;
  height: 90%;
  padding-top: 10px;
  flex-shrink: 0;
}
.no-showing-cards-message {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%; 
  height: 10%;
  margin-left: 5%;
}
</style>
