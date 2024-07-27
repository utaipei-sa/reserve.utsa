<template>
  <v-app>
    <AppBar></AppBar>
    <v-main>
      <router-view />
    </v-main>
    <AppFooter></AppFooter>
  </v-app>
</template>

<script setup>
import AppFooter from '@/components/layout/AppFooter.vue';
//
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  background-color: #F7FBFC;
}

.v-application {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #F7FBFC;
}

v-app {
  background-color: #F7FBFC;
}

v-main {
  flex: 1;
}
</style>