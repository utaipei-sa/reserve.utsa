<template>
  <v-navigation-drawer v-model="drawer" temporary color="#D6E6F2">
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
          <router-link class="d-flex text-decoration-none align-center justify-center" to="/">
            <span class="font-weight-bold align-center justify-center text-black text-h6">借用預約平台</span>
          </router-link>
        </v-col>
        <v-divider class="mb-4" />
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/form" class="">
            <v-btn class="w-100 nav-bar-btn" @click=" drawer = !drawer">
              <v-icon class="mr-2" icon="mdi-clipboard-edit-outline" />
              表單
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/timetable" class="">
            <v-btn class="w-100 nav-bar-btn" @click=" drawer = !drawer">
              <v-icon class="mr-2" icon="mdi-calendar-clock" />
              時間表
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/form" class="">
            <v-btn class="w-100 nav-bar-btn" @click=" drawer = !drawer">
              <v-icon class="mr-2" icon="mdi-alert" />
              錯誤回報
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/timetable" class="">
            <v-btn class="w-100 nav-bar-btn" @click=" drawer = !drawer">
              <v-icon class="mr-2" icon="mdi-comment-quote" />
              意見回饋
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>



  </v-navigation-drawer>
  <v-app-bar :elevation="10" flat color="#769FCD" class="" v-if="width <= 960">
    <v-app-bar-title class="d-flex align-center">
      <v-row no-gutters align="center">
        <v-col class="d-flex align-center">
          <v-btn class="pa-0 ma-0 " @click.stop="drawer = !drawer">
            <v-icon icon="mdi-menu" color="#191F23" />
          </v-btn>
        </v-col>
        <router-link class="text-decoration-none" to="/" v-if="width > 320">
          <v-col class="d-flex pa-0 ma-0 ">
            <img :src="title" alt="Reserve Platform" width="auto" height="100%" />
          </v-col>
        </router-link>
      </v-row>
    </v-app-bar-title>
  </v-app-bar>
  <v-app-bar :elevation="10" max-width="960px" rounded="4" color="#769FCD" v-if="width > 960">
    <v-app-bar-title>
      <v-row no-gutters align="center">
        <router-link class="text-decoration-none" to="/">
          <v-col class="d-flex align-center">
            <img :src="title" alt="Reserve Platform" width="auto" height="100%" />
          </v-col>
        </router-link>
        <v-col class="d-flex">
          <router-link class="pa-0 ma-0 " to="/form">
            <v-btn class="text-white">表單</v-btn>
          </router-link>
          <router-link class="pa-0 ma-0 " to="/timetable">
            <v-btn class="text-white">時間表</v-btn>
          </router-link>
          <router-link class="pa-0 ma-0 " to="/timetable">
            <v-btn class="text-white">錯誤回報</v-btn>
          </router-link>
          <router-link class="pa-0 ma-0 " to="/timetable">
            <v-btn class="text-white">意見回饋</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import utsaLogo from '@/assets/utsaLogo.svg'
import title from '@/assets/title.svg'
const { width, height } = useWindowSize()
const drawer = ref(null)
</script>

<style scoped>
.logo {
  width: 50px;
  height: 50px;
  border-radius: 8px;
}

.nav-bar-btn-container {
  padding: 0px;
  margin: 0px;
  border-bottom: #afc4d6d0 1px solid;
}

.nav-bar-btn {
  box-shadow: none !important;
  padding: 16px 12px;
  margin: 0px 0px 0px 12px;
  background-color: #D6E6F2;
  font-size: 16px;
  height: auto !important;
  justify-content: start;
  text-align: center;
}

.nav-bar-btn:hover {
  background-color: #afc4d6d0;
  box-shadow: -10px 10px 15px rgba(0, 0, 0, 0.5) !important;
  z-index: 1;
}
</style>