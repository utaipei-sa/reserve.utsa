<template>
  <v-row v-if="wh.width.value >= 600 && space_data.length != 0">
    <v-col class="v-col-12 pa-0 pl-1">
      <v-container>
        <v-row>
          <v-col class="v-col-3 pa-1">
            <v-card class="bg-grey-lighten-1 ">
              <v-card-title class="justify-center text-subtitle-1 text-center">
                場地名稱
              </v-card-title>
            </v-card>
          </v-col>
          <v-col class="v-col-3 pa-1">
            <v-card class="bg-grey-lighten-1 ">
              <v-card-title class="justify-center text-subtitle-1 text-center">
                借用日期
              </v-card-title>
            </v-card>
          </v-col>
          <v-col class="v-col-3 pa-1">
            <v-card class="bg-grey-lighten-1 ">
              <v-card-title class="justify-center text-subtitle-1 text-center">
                借用時間
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
  <v-row v-for="(i, index) in space_data">
    <v-col class="v-col-12">
      <v-card color="grey-lighten-3">
        <v-container>
          <v-row>
            <v-col class="v-col-sm-3 v-col-12">
              <span v-if="wh.width.value < 600">場地名稱：</span>
              {{ i[0] }}
            </v-col>
            <v-col class="v-col-sm-3 v-col-12">
              <span v-if="wh.width.value < 600">借用日期：</span>
              {{ i[1] }}
            </v-col>
            <v-col class="v-col-sm-3 v-col-12">
              <span v-if="wh.width.value < 600">借用時間：</span>
              {{ i[2] }}
            </v-col>
            <v-col class="v-col-sm-3 v-col-12">
              <v-btn @click="delspace(index)" a>刪除</v-btn>
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
const space_data = defineModel('space_data')
const delspace = (index) => {
  space_data.value.splice(index, 1)
}
</script>