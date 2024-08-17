<template>
  <v-sheet class="h-100 w-100 timetable-bg">
    <v-container>
      <TimeTableSelector v-model:available="available" v-model:type="type" v-model:has_data="hasGetData"
        v-model:loading="loading" />
      <TimeTableLoader :loading="loading">
        <TimeTableDisplay :hasGetData="hasGetData" :type="type" :available="available" />
      </TimeTableLoader>
    </v-container>
  </v-sheet>
</template>

<script setup>
import TimeTableLoader from '@/components/timetable/TimeTableLoader.vue';
import { ref } from 'vue';
const type = ref('');
const available = ref([]);
const hasGetData = ref(false);
const loading = ref(false);
</script>

<style scoped>
.timetable-bg {
  background-image: linear-gradient(135deg, #eef1f5 0%, #b5c4df 100%);
}
</style>
