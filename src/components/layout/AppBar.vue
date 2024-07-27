<template>
  <v-navigation-drawer v-model="drawer" temporary color="blue-lighten-4">
    <v-container>
      <v-row class="">
        <v-col class="v-col-12">

        </v-col>
        <v-col class="v-col-12">

        </v-col>
        <v-col class="v-col-12 d-flex align-center justify-center">
          <router-link class="d-flex" to="/">
            <img :src="utsaLogo" alt="UTSA Logo" class="logo" />
          </router-link>
        </v-col>
        <v-col class="v-col-12 ">
          <router-link class="d-flex text-decoration-none align-center justify-center " to="/">
            <span class="font-weight-bold align-center justify-center text-black text-h6">場地預約平台</span>
          </router-link>
        </v-col>
        <v-col class="v-col-12 ">
          <router-link to="/form" class="">
            <v-btn class="w-100" @click="drawer = !drawer">表單</v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 ">
          <router-link to="/timetable" class="">
            <v-btn class="w-100" @click="drawer = !drawer">時間表</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>



  </v-navigation-drawer>
  <v-app-bar :elevation="10" flat color="primary" class="" v-if="width <= 960">
    <v-app-bar-title class="d-flex align-center">
      <v-row no-gutters align="center">
        <v-col class="d-flex align-center">
          <v-btn class="pa-0 ma-0 " @click.stop="drawer = !drawer">
            <v-icon icon="mdi-format-list-bulleted" />
          </v-btn>
        </v-col>
        <router-link class="text-decoration-none" to="/">
          <v-col class="d-flex pa-0 ma-0 ">
            <img :src="utsaLogo" alt="UTSA Logo" class="logo" />
          </v-col>
        </router-link>
        <router-link class="text-decoration-none" to="/">
          <v-col class="d-flex align-center pa-0 ma-0 ">
            <span class="font-weight-bold align-center justify-center text-white text-h6 ml-6">場地預約平台</span>
          </v-col>
        </router-link>
      </v-row>
    </v-app-bar-title>
  </v-app-bar>
  <v-app-bar :elevation="10" max-width="960px" rounded="4" color="primary" v-if="width > 960">
    <v-app-bar-title>
      <v-row no-gutters align="center" justify="space-between">
        <router-link class="text-decoration-none" to="/">
          <v-col class="d-flex align-center">
            <img :src="utsaLogo" alt="UTSA Logo" class="logo" />
            <v-app-bar-title class="text-white font-weight-bold ml-6">場地預約平台</v-app-bar-title>
          </v-col>
        </router-link>
        <v-col class="d-flex justify-end">
          <router-link class="pa-0 ma-0 " to="/form">
            <v-btn class="text-white">表單</v-btn>
          </router-link>
          <router-link class="pa-0 ma-0 " to="/timetable">
            <v-btn class="text-white">時間表</v-btn>
          </router-link>
        </v-col>
      </v-row>

    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import utsaLogo from '@/assets/utsaLogo.svg';
const { width, height } = useWindowSize()
const drawer = ref(null)
</script>

<style scoped>
.logo {
  width: 50px;
  height: 50px;
  border-radius: 8px;
}
</style>