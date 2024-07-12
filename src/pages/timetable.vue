<template>
  <v-sheet color="grey-lighten-4">
    <v-container>
      <TimeTableSelector
        v-model:available="available"
        v-model:type="type"
        v-model:has_data="hasGetData"
      />
      <TimeTableDisplay
        :hasGetData="hasGetData"
        :type="type"
        :available="available"
      />
    </v-container>
  </v-sheet>
</template>
<script setup>
import { ref } from "vue";
const type = ref("");
const available = ref([]);
const hasGetData = ref(false);
</script>
