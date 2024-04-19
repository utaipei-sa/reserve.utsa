<template>
  <v-app>
    <default-bar />
    <default-view>
      <slot></slot>
    </default-view>
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue';
</script>
