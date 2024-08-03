<template>
  <v-sheet rounded="rounded" class="bg-transparent ma-0 pa-0 justify-center align-center"
    :style="{ color: `#191F23`, width: `100%`, height: `100%` }">
    <!-- 公告 -->
    <div class="announcement-position">
      <v-card class="pa-2 rounded-lg overflow-x-hidden text-overflow-content ml-0 align-center" width="95%">
        <div class="d-flex align-center" width="95%">
          <v-icon class="mx-2" icon="mdi-bullhorn-outline" />
          <v-carousel height="20" continuous="true" :show-arrows="false" hide-delimiters="false" cycle
            hide-delimiter-background :interval="announcement.length * 1500" class="align-center bg-white">
            <v-carousel-item v-for="(item, i) in announcement" :key="i" class="align-center">
              {{ item }}
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-card>
    </div>
    <!-- 電腦版 -->
    <v-container class="d-flex justify-center align-center fill-width rounded-lg pa-10 ma-0" fluid="true"
      v-if="width > 1110" style="height: 100vh;">
      <v-row class="d-flex justify-center align-center w-100">
        <v-col class="w-50" cols="auto">
          <v-card class="bg-transparent w-100" :elevation="0">
            <v-card-title class="pa-1">
              <p class="text-h2 font-weight-bold pa-1" style="background-color: #ffffffbe;">
                不只是場地</p>
              <p class="text-h2 font-weight-bold pa-1" style="background-color: #ffffffbe;">更是回憶的製造地
              </p>
            </v-card-title>
            <v-row class="d-flex justify-start ga-1 pa-1">
              <v-col class="d-flex align-center justify-center pa-0 my-5 ml-2" cols="auto">
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn class="text-h5 py-1 px-8 font-weight-bold rounded-lg text-overflow" width="95%" height="80px"
                    :color="isHovering ? 'primary' : undefined" v-bind="props">
                    <v-icon class="mx-2" icon="mdi-calendar-check" />
                    時間查詢
                  </v-btn>
                </v-hover>
              </v-col>
              <v-col class="d-flex align-center justify-center pa-0 my-5" cols="auto">
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn class="text-h5 py-1 px-8 font-weight-bold rounded-lg text-overflow" width="95%" height="80px"
                    :color="isHovering ? 'primary' : undefined" v-bind="props">
                    <v-icon class="mx-2" icon="mdi-square-edit-outline" />
                    立即預約
                  </v-btn>
                </v-hover>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col class="w-50" cols="auto">
          <v-carousel height="80%" cycle continuous="true" :show-arrows="false" hide-delimiter-background
            :interval="slides.length * 2500">
            <v-carousel-item v-for="(slide, index) in slides" :key="index">
              <v-img :src="slide" contain />
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
    <!-- 平板版 -->
    <v-container class="d-flex justify-center align-center fill-width rounded-lg pa-10 ma-0" fluid="true"
      v-else-if="width > 772 && width <= 1110" style="height: 100vh;">
      <v-row class="d-flex justify-center align-center w-100">
        <v-col class="w-50" cols="auto">
          <v-card class="bg-transparent w-100" :elevation="0">
            <v-card-title class="pa-1">
              <p class="font-weight-bold pa-1 line-height-0.5" style="background-color: #ffffffbe; font-size: 4vw;">
                不只是場地</p>
              <p class="font-weight-bold pa-1 line-height-0.5" style="background-color: #ffffffbe; font-size: 4vw;">
                更是回憶的製造地
              </p>
            </v-card-title>
            <v-row class="d-flex justify-start ga-1 pa-1">
              <v-col class="d-flex align-center justify-center pa-0 my-5 ml-2" cols="auto">
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn class="text-h6 py-1 px-5 font-weight-bold rounded-lg text-overflow" width="95%" height="80px"
                    :color="isHovering ? 'primary' : undefined" v-bind="props">
                    <v-icon class="mx-2" icon="mdi-calendar-check" />
                    時間查詢
                  </v-btn>
                </v-hover>
              </v-col>
              <v-col class="d-flex align-center justify-center pa-0 my-5" cols="auto">
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn class="text-h6 py-1 px-5 font-weight-bold rounded-lg text-overflow" width="95%" height="80px"
                    :color="isHovering ? 'primary' : undefined" v-bind="props">
                    <v-icon class="mx-2" icon="mdi-square-edit-outline" />
                    立即預約
                  </v-btn>
                </v-hover>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col class="w-50" cols="auto">
          <v-carousel height="80%" cycle continuous="true" :show-arrows="false" hide-delimiter-background
            :interval="slides.length * 2500">
            <v-carousel-item v-for="(slide, index) in slides" :key="index">
              <v-img :src="slide" contain />
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
    <!-- 手機版 -->
    <v-container class="d-flex fill-height justify-center" v-else>
      <div class="d-flex flex-column fill-height justify-center align-start my-4 text-gray flex-grow rounded-lg h-50">
        <p class="font-weight-bold pa-1" style="background-color: #ffffffbe; font-size: 8vw;">不只是場地
        </p>
        <p class="font-weight-bold pa-1" style="background-color: #ffffffbe; font-size: 8vw;">
          更是回憶的製造地</p>
      </div>
      <div class="rounded-lg justify-center w-100">
        <v-col class="d-flex align-center justify-center pa-0 my-5">
          <v-btn class="text-h5 py-2 rounded-lg text-overflow" width="100%" min-width="170px" height="80px">
            <v-icon class="mx-2" icon="mdi-calendar-check" />
            時間查詢
          </v-btn>
        </v-col>
        <v-col class="d-flex align-center justify-center pa-0 my-5">
          <v-btn class="text-h5 py-2 rounded-lg text-overflow" width="100%" min-width="170px" height="80px">
            <v-icon class="mx-2" icon="mdi-square-edit-outline" />
            立即預約
          </v-btn>
        </v-col>
      </div>
    </v-container>
    <!-- 更多資訊 -->
    <v-fab color="cyan-lighten-5" :size="width > 960 ? 50 : 45" fixed app appear location="bottom end" extended
      prepend-icon="mdi-help">
      <v-menu activator="parent" location="start bottom" transition="fade-transition">
        <v-list density="compact" max-width="250" rounded="lg" slim class="mr-2">
          <v-list-item prepend-icon="mdi-alert" title="問題回報" link></v-list-item>
          <v-divider class="my-2" />
          <v-list-item prepend-icon="mdi-comment-quote" title="意見回饋" link></v-list-item>
          <v-divider class="my-2" />
          <span class="d-flex justify-center align-center">
            <v-list-item class="text-subtitle-1 d-flex align-center justify-center">
              <v-list-item-title class="d-flex justify-center">About us - UTSA</v-list-item-title>
              <v-btn v-for="(icon, i) in icons" :key="i" :href="icon.link" size="medium" variant="plain"
                target="_blank">
                <v-icon :icon="icon.icon" class="align-center bg-white rounded-circle pa-4" />
              </v-btn>
            </v-list-item>
          </span>
        </v-list>
      </v-menu>
    </v-fab>
  </v-sheet>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';
const { width } = useWindowSize();
const announcement = [
  "政府宣佈災防假時，不開放借用",
  "正在加載中......",
  "加載中，請稍後......"
]
const icons = [
  {
    icon: 'mdi-facebook',
    link: 'https://www.facebook.com/Utaipeisa2.0/?locale=zh_TW',
  },
  {
    icon: 'mdi-instagram',
    link: 'https://www.instagram.com/utaipei_sa/',
  },
  {
    icon: 'mdi-email',
    link: 'mailto:utsa@go.utaipei.edu.tw',
  },
];
const slides = [
  "https://via.placeholder.com/800x400.png?text=Slide+1",
  "https://via.placeholder.com/800x400.png?text=Slide+2",
  "https://via.placeholder.com/800x400.png?text=Slide+3",
  "https://via.placeholder.com/800x400.png?text=Slide+4",
];
</script>

<style scoped>
.v-list-item-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  overflow-wrap: break-word;
}

.v-list-item {
  overflow-wrap: break-word;
}

.announcement-position {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  top: 70px;
  width: 100%;
  z-index: 1000;
}
</style>