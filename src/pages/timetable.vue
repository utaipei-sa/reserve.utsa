<template>
  <v-sheet color="grey-lighten-4">
    <v-container>
      <TimeTableSelector
        v-model:available="available"
        v-model:type="type"
        v-model:has_data="hasGetData"
        v-model:loading="loading"
      />
      <TimeTableLoader :loading="loading">
        <TimeTableDisplay
          :hasGetData="hasGetData"
          :type="type"
          :available="available"
        />
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
