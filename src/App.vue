<template>
  <v-app class="pa-0 ma-0 fill-height fill-width">
    <AppBar></AppBar>
    <v-parallax height="100%" width="100%" :src="chairs"
      class="parallax-background mt-10 ma-0 pa-0 fill-height fill-width" :style="{ width: `100%`, height: `100%` }">
      <v-main class="pa-0 ma-0 fill-height fill-width" :style="{ width: `100%`, height: `100%` }">
        <router-view class="pa-0 ma-0 fill-height fill-width" :style="{ width: `100%`, height: `100%` }" />
      </v-main>
    </v-parallax>
  </v-app>
</template>

<script setup>
import chairs from '@/assets/chairs.svg';
</script>

<style></style>