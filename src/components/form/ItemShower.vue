<template>
  <v-row v-if="wh.width.value >= 600 && item_data.length != 0">
    <v-col class="v-col-12 pa-0 pl-1">
      <v-container>
        <v-row>
          <v-col class="v-col-2 pa-1">
            <v-card class="bg-grey-lighten-1 ">
              <v-card-title class="justify-center text-subtitle-1 text-center px-1">
                物品名稱
              </v-card-title>
            </v-card>
          </v-col>
          <v-col class="v-col-3 pa-1">
            <v-card class="bg-grey-lighten-1 ">
              <v-card-title class="justify-center text-subtitle-1 text-center">
                歸還日期
              </v-card-title>
            </v-card>
          </v-col>
          <v-col class="v-col-3 pa-1">
            <v-card class="bg-grey-lighten-1  ">
              <v-card-title class="justify-center text-subtitle-1 text-center">
                借用時間
              </v-card-title>
            </v-card>
          </v-col>
          <v-col class="v-col-2 pa-1 ">
            <v-card class="bg-grey-lighten-1 ">
              <v-card-title class="justify-center text-subtitle-1 text-center">
                數量
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
  <v-row v-for="(i, index) in item_data">
    <v-col>
      <v-card color="grey-lighten-3">
        <v-container>
          <v-row>
            <v-col class="v-col-sm-2 v-col-12">
              <span v-if="wh.width.value < 600">物品名稱：</span>
              {{ i[0] }}
            </v-col>
            <v-col class="v-col-sm-3 v-col-12">
              <span v-if="wh.width.value < 600">借用日期：</span>
              {{ i[1] }}
            </v-col>
            <v-col class="v-col-sm-3 v-col-12  ">
              <span v-if="wh.width.value < 600">歸還日期：</span>
              {{ i[2] }}
            </v-col>
            <v-col class="v-col-sm-2  v-col-12">
              <span v-if="wh.width.value < 600">數　　量：</span>
              {{ i[3] }}
            </v-col>
            <v-col class="v-col-sm-2 v-col-12">
              <v-btn @click="delitem(index)" a>刪除</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { useWindowSize } from '@vueuse/core'

const wh = useWindowSize()
const item_data = defineModel('item_data')
const delitem = (index) => {
  item_data.value.splice(index, 1)
}
</script>