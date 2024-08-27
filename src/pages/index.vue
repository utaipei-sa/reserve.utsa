<template>
  <v-sheet
    rounded="rounded"
    class="bg-transparent ma-0 pa-0 justify-center align-center h-100"
  >
    <v-parallax
      :src="background"
      style="overflow: hidden; height: 100%; max-height: calc(100vh - 60px)"
    >
      <div class="background-overlay"></div>

      <!-- 公告 -->
      <div class="announcement-position">
        <v-card
          class="pa-2 rounded-lg overflow-x-hidden text-overflow-content ml-0 align-center"
          width="95%"
        >
          <div class="d-flex align-center" width="95%">
            <v-icon class="mx-2" icon="mdi-bullhorn-outline" />
            <v-carousel
              height="20"
              continuous="true"
              :show-arrows="false"
              hide-delimiters="false"
              cycle
              hide-delimiter-background
              :interval="announcement.length * 1500"
              class="align-center bg-white"
            >
              <v-carousel-item
                v-for="(item, i) in announcement"
                :key="i"
                class="align-center"
              >
                {{ item }}
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-card>
      </div>
      <!-- 電腦版 -->
      <v-container
        class="d-flex justify-center align-center fill-width rounded-lg pa-10 ma-0"
        fluid="true"
        v-if="width > 960"
        style="height: 100vh"
      >
        <v-card class="bg-transparent w-100" :elevation="0">
          <v-card-title class="pa-1 homepage-slogan">
            不只是場地<br />更是回憶的製造地
          </v-card-title>
          <v-row class="d-flex justify-start ga-4 pa-1">
            <v-col
              class="d-flex align-center justify-center pa-0 my-5 ml-2"
              cols="auto"
            >
              <v-hover v-slot="{ isHovering, props }">
                <router-link to="/timetable">
                  <v-btn
                    class="text-h5 py-1 px-8 font-weight-bold rounded-lg text-overflow ml-2 mr-6"
                    width="100%"
                    height="80px"
                    :color="isHovering ? 'primary' : undefined"
                    v-bind="props"
                  >
                    <v-icon class="mr-2" icon="mdi-calendar-check" />
                    時間查詢
                  </v-btn>
                </router-link>
              </v-hover>
            </v-col>
            <v-col
              class="d-flex align-center justify-center pa-0 my-5"
              cols="auto"
            >
              <v-hover v-slot="{ isHovering, props }">
                <router-link to="/form">
                  <v-btn
                    class="text-h5 py-1 px-8 font-weight-bold rounded-lg text-overflow mx-6"
                    width="100%"
                    height="80px"
                    :color="isHovering ? 'primary' : undefined"
                    v-bind="props"
                  >
                    <v-icon class="mr-2" icon="mdi-square-edit-outline" />
                    立即預約
                  </v-btn>
                </router-link>
              </v-hover>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
      <!-- 手機版 -->
      <v-container class="d-flex fill-height justify-center align-end" v-else>
        <div
          class="d-flex fill-height w-100 justify-start align-center my-4 text-gray flex-grow rounded-lg h-50 homepage-slogan"
        >
          <p class="mt-12 pt-12 pl-4">不只是場地<br />更是回憶的製造地</p>
        </div>
        <div class="rounded-lg justify-center w-100">
          <v-col class="d-flex align-center justify-center pa-0 my-5">
            <router-link to="/timetable" class="w-100">
              <v-btn
                class="py-2 rounded-lg text-overflow homepage-btn"
                width="100%"
                min-width="170px"
                height="80px"
              >
                <v-icon class="mr-2" icon="mdi-calendar-check" />
                時間查詢
              </v-btn>
            </router-link>
          </v-col>
          <v-col class="d-flex align-center justify-center pa-0 my-5">
            <router-link to="/form" class="w-100">
              <v-btn
                class="py-2 rounded-lg text-overflow homepage-btn"
                width="100%"
                min-width="170px"
                height="80px"
              >
                <v-icon class="mr-2" icon="mdi-square-edit-outline" />
                立即預約
              </v-btn>
            </router-link>
          </v-col>
        </div>
      </v-container>
      <!-- 更多資訊 -->
      <v-fab
        class="mr-3 mb-6"
        :color="width > 960 ? `grey-lighten-5` : `grey-darken-4`"
        size="35"
        fixed
        app
        appear
        location="bottom end"
        extended
        prepend-icon="mdi-help"
      >
        <v-menu
          activator="parent"
          location="top end"
          transition="fade-transition"
        >
          <template v-slot:default="{ props }">
            <v-card
              :class="width > 960 ? 'menu-light' : 'menu-dark'"
              class="bg-transparent"
              elevation="0"
              v-bind="props"
            >
              <v-list
                density="compact"
                max-width="200"
                rounded="lg"
                slim
                class="mb-4 justify-center homepage-list"
              >
                <v-list-item class="homepage-list" title="問題回報" link />
                <v-list-item class="homepage-list" title="意見回饋" link />
                <v-divider class="homepage-menu-divider" />
                <span class="d-flex justify-center align-center homepage-list">
                  <v-list-item
                    title="聯絡我們"
                    class="text-subtitle-1 d-flex align-center justify-center mt-2"
                  >
                    <v-btn
                      v-for="(icon, i) in icons"
                      :key="i"
                      :href="icon.link"
                      size="medium"
                      variant="plain"
                      target="_blank"
                    >
                      <v-icon
                        :icon="icon.icon"
                        class="align-center rounded-circle pa-4 mr-2 mt-2 homepage-list-btn"
                      />
                    </v-btn>
                  </v-list-item>
                </span>
              </v-list>
            </v-card>
          </template>
        </v-menu>
      </v-fab>
    </v-parallax>
  </v-sheet>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';
const { width } = useWindowSize();
import background from '@/assets/background.jpg';
const announcement = [
  '政府宣佈災防假時，不開放借用',
  '正在加載中......',
  '加載中，請稍後......'
];
const icons = [
  {
    icon: 'mdi-email-outline',
    link: 'mailto:utsa@go.utaipei.edu.tw'
  },
  {
    icon: 'mdi-instagram',
    link: 'https://www.instagram.com/utaipei_sa/'
  },
  {
    icon: 'mdi-facebook',
    link: 'https://www.facebook.com/Utaipeisa2.0/?locale=zh_TW'
  }
];
</script>

<style scoped>
.announcement-position {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  top: 80px;
  width: 100%;
  z-index: 1000;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff9f 100%
  );
}

.homepage-slogan {
  font-family: Inter;
  font-size: 40px;
  font-weight: 999;
  line-height: 60px;
  letter-spacing: 0.05em;
  text-align: left;
  z-index: 15;
}

.homepage-btn {
  font-family: Inter;
  font-size: 28px;
  font-weight: 600;
  line-height: 33.89px;
  letter-spacing: 0.02em;
  text-align: left;
}

.homepage-list {
  background-color: #303030;
  color: white;
}

.homepage-menu-divider {
  color: white;
  width: 80%;
  margin: 0 auto;
}

.homepage-list-btn {
  background-color: white;
  color: #212121;
}

@media screen and (min-width: 960px) {
  .homepage-slogan {
    font-size: 64px;
    line-height: 86px;
  }

  .homepage-list {
    background-color: #fafafa;
    color: #212121;
  }

  .homepage-menu-divider {
    color: #212121;
  }

  .homepage-list-btn {
    background-color: #212121;
    color: white;
  }

  .background-overlay {
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff9f 100%
    );
  }
}

@media (max-width: 390px) {
  .homepage-slogan {
    font-size: calc(10px + 8vw);
  }
}
</style>
