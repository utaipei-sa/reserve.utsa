<template>
  <v-sheet rounded="rounded" class="main-content" :style="{ backgroundColor: '#F7FBFC', color: `#191F23` }">
    <v-container class="border-info" v-if="width > 960">

      <v-row>
        <v-col>
          <v-card class="pa-2 rounded-lg overflow-x-hidden text-overflow-content">
            <!-- 公告 -->
            <div class="text-overflow">
              <v-icon class="mr-2" icon="mdi-bullhorn-outline" />
              政府宣佈災防假時，不開放借用
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col class="d-flex flex-column align-center">
          <v-btn to="/timetable" class="rounded-lg my-3" width="95%" height="215px">
            <div class="d-flex flex-column align-center">
              <v-icon class="mb-2" icon="mdi-calendar-check" size="84px" />
              <span class="text-h5 font-weight-bold">查詢時間</span>
            </div>
          </v-btn>
          <v-btn to="/form" class="rounded-lg my-3" width="95%" height="215px">
            <div class="d-flex flex-column align-center">
              <v-icon class="mb-2" icon="mdi-square-edit-outline" size="84px" />
              <span class="text-h5 font-weight-bold">立即預約</span>
            </div>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col class="d-flex flex-column align-center">
          <v-card class="pa-6 rounded-lg" width="95%">
            <v-card-title class="pa-0 mb-2"><v-icon class="mr-2" icon="mdi-clipboard-outline" />借用規則</v-card-title>
            <li class="ml-3" v-for="mes in RemindMessage" :key="mes"> {{ mes }} </li>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col class="d-flex flex-column align-center">
          <div class="d-flex justify-between rounded-lg mx-1" style="width: 95%;">
            <v-col cols="6" class="d-flex align-center justify-center pa-0">
              <v-btn class="text-h6 py-2 rounded-lg text-overflow" width="100%" height="auto">
                <v-icon icon="mdi-flag-outline" />
                問題回報
              </v-btn>
            </v-col>
            <v-col cols="6" class="d-flex align-center justify-center pa-0">
              <v-btn class="text-h6 py-2 rounded-lg text-overflow" width="100%" height="auto">
                <v-icon icon="mdi-lightbulb-outline" />
                意見回饋
              </v-btn>
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="border-info" v-if="width <= 960">
      <v-row>
        <v-col>
          <v-card class="pa-2 rounded-lg overflow-x-hidden text-overflow-content">
            <!-- 公告 -->
            <div class="text-overflow">
              <v-icon class="mr-2" icon="mdi-bullhorn-outline" />
              政府宣佈災防假時，不開放借用
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col class="d-flex flex-column align-center">
          <v-btn to="/timetable" class="rounded-lg my-3" width="95%" height="215px">
            <div class="d-flex flex-column align-center">
              <v-icon class="mb-2" icon="mdi-calendar-check" size="84px" />
              <span class="text-h5 font-weight-bold">查詢時間</span>
            </div>
          </v-btn>
          <v-btn to="/form" class="rounded-lg my-3" width="95%" height="215px">
            <div class="d-flex flex-column align-center">
              <v-icon class="mb-2" icon="mdi-square-edit-outline" size="84px" />
              <span class="text-h5 font-weight-bold">立即預約</span>
            </div>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col class="d-flex flex-column align-center">
          <v-card class="pa-6 rounded-lg" width="95%">
            <v-card-title class="pa-0 mb-2"><v-icon class="mr-2" icon="mdi-clipboard-outline" />借用規則</v-card-title>
            <li class="ml-3" v-for="mes in RemindMessage" :key="mes"> {{ mes }} </li>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col class="d-flex flex-column align-center">
          <div class="d-flex justify-between rounded-lg mx-1" style="width: 95%;">
            <v-col cols="6" class="d-flex align-center justify-center pa-0">
              <v-btn class="text-h6 px-4 py-2 rounded-lg text-overflow" width="100%" height="auto">
                <v-icon icon="mdi-flag-outline" />
                問題回報
              </v-btn>
            </v-col>
            <v-col cols="6" class="d-flex align-center justify-center pa-0">
              <v-btn class="text-h6 px-4 py-2 rounded-lg text-overflow" width="100%" height="auto">
                <v-icon icon="mdi-lightbulb-outline" />
                意見回饋
              </v-btn>
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';
const { width } = useWindowSize();
const RemindMessage = [
  "預約領取時間：平日12:10~12:30",
  "天母資源請到課活組借用",
  "冷氣電卡請自備",
  "其他規定",
  "(後臺管理者自行設定)"
];
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  background-color: #F7FBFC;
}

.transparent-card {
  border-radius: 20px;
}

@media screen and (min-width: 960px) {
  .transparent-card {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
}

.main-content {
  padding: 12px 0px 0px 0px;
  flex: 1;
  background-color: #F7FBFC;
}

.message {
  font-size: 16px;
  align-items: center;
}

.text-overflow {
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>