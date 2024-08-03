<template>
  <v-navigation-drawer v-model="drawer" temporary color="#f7fbff">
    <v-container>
      <v-row class="">
        <v-col class="v-col-12">

        </v-col>
        <v-col class="v-col-12">

        </v-col>
        <v-col class="v-col-12 d-flex align-center justify-center pb-0">
          <router-link class="d-flex" to="/">
            <img :src="utsaLogo" alt="UTSA Logo" class="logo" />
          </router-link>
        </v-col>
        <v-col class="v-col-12 pt-0">
          <router-link class="d-flex text-decoration-none align-center justify-center" to="/">
            <span class="font-weight-bold align-center justify-center text-black text-h6">借用預約平台</span>
          </router-link>
        </v-col>
        <v-divider class="mb-4" />
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/" class="">
            <v-btn class="w-100 nav-bar-btn" @click="dialog = true">
              <v-icon class="mr-2" icon="mdi-account" />
              登入
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/timetable" class="">
            <v-btn class="w-100 nav-bar-btn" @click=" drawer = !drawer">
              <v-icon class="mr-2" icon="mdi-calendar-clock" />
              時間查詢
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/form" class="">
            <v-btn class="w-100 nav-bar-btn" @click=" drawer = !drawer">
              <v-icon class="mr-2" icon="mdi-clipboard-edit-outline" />
              立即預約
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/form" class="">
            <v-btn class="w-100 nav-bar-btn" @click="dialog = true">
              <v-icon class="mr-2" icon="mdi-alert" />
              錯誤回報
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/timetable" class="">
            <v-btn class="w-100 nav-bar-btn" @click="dialog = true">
              <v-icon class="mr-2" icon="mdi-comment-quote" />
              意見回饋
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/timetable" class="">
            <v-btn class="w-100 nav-bar-btn" @click="dialog = true">
              <v-icon class="mr-2" icon="mdi-file-document" />
              規則說明
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
    <v-footer class="app-bar-footer">
      <p>
        Background Image by <a
          href="https://pixabay.com/users/pexels-2286921/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2181916">Pexels</a>
        from <a
          href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2181916">Pixabay</a>
      </p>
    </v-footer>
  </v-navigation-drawer>

  <v-app-bar :elevation="6" flat color="#f7fbfff5" class="" v-if="width <= 960">
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
  </v-app-bar>"
  <v-app-bar :elevation="6" max-width="960px" rounded="4" color="#f7fbff" v-if="width > 960">
    <v-app-bar-title>
      <v-row no-gutters align="center">
        <router-link class="text-decoration-none" to="/">
          <v-col class="d-flex align-center">
            <img :src="title" alt="Reserve Platform" width="auto" height="100%" />
          </v-col>
        </router-link>
        <v-col class="d-flex">
          <router-link class="pa-0 ma-0 " to="/timetable">
            <v-btn class="text-black">時間查詢</v-btn>
          </router-link>
          <router-link class="pa-0 ma-0 " to="/form">
            <v-btn class="text-black">立即預約</v-btn>
          </router-link>
          <router-link class="pa-0 ma-0 " to="/">
            <v-btn class="text-black" @click="dialog = true">規則說明</v-btn>
          </router-link>
        </v-col>
        <v-col cols="auto" class="justify-end mr-6">
          <router-link class="pa-0 ma-0" to="/">
            <v-btn class="font-weight-bold bg-cyan-lighten-5" @click="dialog = true">登入</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-app-bar-title>
  </v-app-bar>

  <v-dialog v-model="dialog" max-width="300px">
    <v-card>
      <v-card-title>
        <span class="font-weight-bold">通知</span>
      </v-card-title>
      <v-card-subtitle>
        <p>目前沒有此功能</p>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import utsaLogo from '@/assets/utsaLogo.svg'
import title from '@/assets/title.svg'
const { width } = useWindowSize()
const drawer = ref(null)
const dialog = ref(false);
</script>

<style scoped>
.logo {
  width: 90px;
  height: 90px;
  border-radius: 8px;
}

.nav-bar-btn-container {
  padding: 0px;
  margin: 0px;
  border-bottom: #afc4d6d0 1px solid;
}

.nav-bar-btn {
  box-shadow: none !important;
  padding: 16px 24px;
  margin: 0px;
  background-color: #f7fbff;
  font-size: 16px;
  height: auto !important;
  justify-content: start;
  text-align: center;
}

.nav-bar-btn:hover {
  background-color: #E6FFFE;
  box-shadow: -10px 10px 15px rgba(0, 0, 0, 0.3) !important;
  z-index: 1;
}

.app-bar-footer {
  background-color: #ffffff63;
  bottom: 0px;
  position: absolute;
  font-size: 10px;
  width: 100%;
}

.parallax-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  object-fit: cover;
}
</style>