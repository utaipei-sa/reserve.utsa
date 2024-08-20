<template>
  <v-navigation-drawer v-model="drawer" temporary color="#fffffff7">
    <v-container class="px-0">
      <v-row>
        <v-col class="v-col-12 d-flex align-center justify-center pb-0 mt-12">
          <router-link class="d-flex" to="/">
            <img :src="utsaLogo" alt="UTSA Logo" width="90px" height="90px" />
          </router-link>
        </v-col>
        <v-col class="v-col-12 pt-0">
          <router-link
            class="d-flex text-decoration-none align-center justify-center"
            to="/"
          >
            <span
              class="font-weight-bold align-center justify-center text-black text-h6"
              >借用預約平台</span
            >
          </router-link>
        </v-col>
        <v-divider class="mb-4" />
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/">
            <v-btn class="w-100 nav-bar-btn" @click="dialog = true">
              <v-icon class="ml-4 mr-3" icon="mdi-account" />
              登入
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/timetable">
            <v-btn class="w-100 nav-bar-btn" @click="drawer = !drawer">
              <v-icon class="ml-4 mr-3" icon="mdi-calendar-clock" />
              時間查詢
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/form">
            <v-btn class="w-100 nav-bar-btn" @click="drawer = !drawer">
              <v-icon class="ml-4 mr-3" icon="mdi-clipboard-edit-outline" />
              立即預約
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/">
            <v-btn class="w-100 nav-bar-btn" @click="dialog = true">
              <v-icon class="ml-4 mr-3" icon="mdi-alert" />
              錯誤回報
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/">
            <v-btn class="w-100 nav-bar-btn" @click="dialog = true">
              <v-icon class="ml-4 mr-3" icon="mdi-comment-quote" />
              意見回饋
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 nav-bar-btn-container">
          <router-link to="/">
            <v-btn class="w-100 nav-bar-btn" @click="dialog = true">
              <v-icon class="ml-4 mr-3" icon="mdi-file-document" />
              規則說明
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
  <v-app-bar :elevation="6" flat color="#E4EBF5" v-if="width <= 960">
    <v-app-bar-title class="d-flex align-center ml-0 pl-0 justify-center">
      <v-row no-gutters align="center">
        <v-col class="d-flex align-center">
          <v-btn
            class="pa-0 ma-0 appbar-menu-icon"
            @click.stop="drawer = !drawer"
          >
            <v-icon icon="mdi-menu" color="#191F23" />
          </v-btn>
        </v-col>
        <router-link
          class="text-decoration-none justify-center"
          to="/"
          v-if="width > 320"
        >
          <v-col class="d-flex pa-0 ma-0">
            <img
              :src="title"
              alt="Reserve Platform"
              width="auto"
              height="auto"
              style="max-width: 300px; max-height: 60px"
            />
          </v-col>
        </router-link>
      </v-row>
    </v-app-bar-title>
  </v-app-bar>
  <v-app-bar
    :elevation="6"
    max-width="960px"
    rounded="4"
    color="#E4EBF5"
    v-if="width > 960"
  >
    <v-app-bar-title>
      <v-row no-gutters class="align-center">
        <router-link class="text-decoration-none" to="/">
          <v-col class="d-flex align-center">
            <img
              :src="title"
              alt="Reserve Platform"
              width="auto"
              height="auto"
              style="max-width: 300px; max-height: 60px"
            />
          </v-col>
        </router-link>
        <v-col class="d-flex">
          <router-link class="pa-0 ma-0" to="/timetable">
            <v-btn class="text-black">時間查詢</v-btn>
          </router-link>
          <router-link class="pa-0 ma-0" to="/form">
            <v-btn class="text-black">立即預約</v-btn>
          </router-link>
          <router-link class="pa-0 ma-0" to="/">
            <v-btn class="text-black" @click="dialog = true">規則說明</v-btn>
          </router-link>
        </v-col>
        <v-col cols="auto" class="justify-end mr-6">
          <router-link class="pa-0 ma-0" to="/">
            <v-btn
              class="font-weight-bold bg-transparent"
              @click="dialog = true"
              >登入</v-btn
            >
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
import { useWindowSize } from '@vueuse/core';
import { ref } from 'vue';
import utsaLogo from '@/assets/utsaLogo.svg';
import title from '@/assets/title.svg';
const { width } = useWindowSize();
const drawer = ref(null);
const dialog = ref(false);
</script>

<style scoped>
.appbar-menu-icon {
  position: absolute;
  left: 0px;
  align-items: center;
}

.nav-bar-btn-container {
  padding: 0px;
  margin: 0px;
}

.nav-bar-btn {
  box-shadow: none !important;
  padding: 16px 24px;
  margin: 0px;
  font-size: 16px;
  height: auto !important;
  justify-content: start;
  text-align: center;
  border-radius: 0px;
  background-color: transparent;
}

.nav-bar-btn:hover {
  background-color: #e6f3ee;
  font-weight: bold;
}
</style>
