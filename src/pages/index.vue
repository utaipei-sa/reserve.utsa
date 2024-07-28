<template>
  <v-sheet rounded="rounded" class="main-content" :style="{ backgroundColor: '#F7FBFC' }">
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col>
          <v-card class="text-center" style="background-color: #B9D7EA;">
            <v-card-text>
              <!--以下為提醒事項-->
              <div class="message">
                <span class="text-h5 font-weight-bold">提醒事項</span>
                <li v-for="item in RemindMessage" :key="item">
                  <v-icon class="pr-4" color="blue-grey-darken-4" icon="mdi-information" />{{ item }}
                </li>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-img src="">
              <!--pic for homepage-->
            </v-img>
            <v-carousel cycle height="400px" hide-delimiters show-arrows>
              <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
                <v-img :src="item.src" height="100%"></v-img>
              </v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-container class="">
      <v-row class="d-flex justify-center">
        <v-col>
          <v-card class="bg-grey-lighten-4">
            <v-card-text>
                <v-row class="d-flex justify-center">
                  <v-col>
                    <v-card title="聯絡我們" color="grey-lighten-1">
                      <v-card-text>
                        <v-row class="d-flex justify-center">
                          <v-col >
                            <v-btn text href="https://www.instagram.com/utaipei_sa/">學生會IG</v-btn>
                          </v-col>
                          <v-col>
                            <v-btn text href="https://www.facebook.com/Utaipeisa2.0/?locale=zh_TW">學生會FB</v-btn>
                          </v-col>
                          <v-col>
                            <v-btn text href="mailto:utsa@go.utaipei.edu.tw​">學生會Email</v-btn>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  
                </v-row>
              </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->
  </v-sheet>
</template>

<script setup>
const RemindMessage = [
  "預約領取時間：平日12:10~12:30",
  "天母資源請到課活組借用",
];
const items = [
  { src: 'https://via.placeholder.com/800x400.png?text=First+Slide' },
  { src: 'https://via.placeholder.com/800x400.png?text=Second+Slide' },
  { src: 'https://via.placeholder.com/800x400.png?text=Third+Slide' }
];
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  background-color: #F7FBFC;
}

.main-content {
  padding-top: 48px;
  flex: 1;
  background-color: #F7FBFC;
}

.message {
  font-size: 16px;
}

li {
  list-style-type: none;
  padding: 10px;
  font-size: 16px;
}
</style>