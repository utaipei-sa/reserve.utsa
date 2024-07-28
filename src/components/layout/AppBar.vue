<template>
  <v-navigation-drawer v-model="drawer" temporary color="#D6E6F2">
    <v-container>
      <v-row class="">
        <v-col class="v-col-12">

        </v-col>
        <v-col class="v-col-12">

        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/form" class="">
            <v-btn class="w-100 nav-bar-btn" @click=" drawer = !drawer">
              <v-icon class="mr-2">mdi-file-table</v-icon>
              表單
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/timetable" class="">
            <v-btn class="w-100 nav-bar-btn" @click=" drawer = !drawer">
              <v-icon class="mr-2">mdi-calendar-clock</v-icon>
              時間表
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/form" class="">
            <v-btn class="w-100 nav-bar-btn" @click=" drawer = !drawer">
              <v-icon class="mr-2">mdi-alert</v-icon>
              錯誤回報
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/timetable" class="">
            <v-btn class="w-100 nav-bar-btn" @click=" drawer = !drawer">
              <v-icon class="mr-2">mdi-comment-quote</v-icon>
              意見回饋
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>



  </v-navigation-drawer>
  <v-app-bar :elevation="10" flat color="#769FCD" class="" v-if="width <= 960">
    <v-app-bar-title>
      <v-btn class="pa-0 ma-0 " @click.stop="drawer = !drawer">
        <v-icon icon="mdi-format-list-bulleted" />
      </v-btn>
    </v-app-bar-title>
  </v-app-bar>
  <v-app-bar :elevation="10" max-width="960px" rounded="4" color="#769FCD" v-if="width > 960">
    <v-app-bar-title>
      <router-link class="pa-0 ma-0 " to="/">
        <v-btn class="text-white">
          <v-icon icon="mdi-home" />
        </v-btn>
      </router-link>
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
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
const { width, height } = useWindowSize()
const drawer = ref(null)
</script>

<style scoped>
.nav-bar-btn-container {
  padding: 0px;
  margin: 0px;
}

.nav-bar-btn {
  box-shadow: none !important;
  padding: 16px 0px;
  margin: 0px;
  margin-left: 24px;
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