<template>
  <div class="mt-6" v-if="props.loading">
    <v-row class="my-2">
      <v-col cols="12" class="py-0 px-1">
        <v-skeleton-loader type="image" color="#FFFFFF00" />
      </v-col>
    </v-row>
    <v-row v-for="index in skeletonRows" :key="index" class="my-0">
      <v-col cols="2" class="py-0 px-1">
        <v-skeleton-loader type="image" color="#FFFFFF00" />
      </v-col>
      <v-col cols="10" class="py-0 px-1">
        <v-skeleton-loader type="image" color="#FFFFFF00" />
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
});
const skeletonRows = Array(7).fill(0);
</script>
