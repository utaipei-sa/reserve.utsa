<template>
  <div class="loader-wrapper">
    <v-progress-circular
      :size="props.size"
      :width="props.width"
      :color="props.color"
      indeterminate
      class="circular-loader"
      >{{ props.texture }}</v-progress-circular
    >
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 50
  },
  width: {
    type: Number,
    default: 10
  },
  color: {
    type: String,
    default: 'primary-2'
  },
  texture: {
    type: String,
    default: 'loading'
  }
});
</script>

<style scoped>
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: #ffffff88;
}

.circular-loader {
  z-index: 1;
}
</style>
