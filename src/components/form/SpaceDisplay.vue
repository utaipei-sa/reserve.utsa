<template>
  <v-row
    v-if="wh.width.value < width_rwd && space_data.length != 0"
    v-for="(i, index) in space_data"
  >
    <v-col class="v-col-12">
      <v-card elevation="3">
        <v-container>
          <v-row v-if="submit_flag">
            <v-col class="v-col-12">
              <span v-if="wh.width.value < width_rwd">場地名稱：</span>
              {{ i['space_name'] }}
            </v-col>
            <v-col class="v-col-12">
              <span v-if="wh.width.value < width_rwd">借用日期：</span>
              {{ i['datetime'] }}
            </v-col>
            <v-col class="v-col-12">
              <span v-if="wh.width.value < width_rwd">借用時間：</span>
              {{ i['period'] }}
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col class="v-col-sm-3 v-col-12">
              <span v-if="wh.width.value < width_rwd">場地名稱：</span>
              {{ i['space_name'] }}
            </v-col>
            <v-col class="v-col-sm-3 v-col-12">
              <span v-if="wh.width.value < width_rwd">借用日期：</span>
              {{ i['datetime'] }}
            </v-col>
            <v-col class="v-col-sm-3 v-col-12">
              <span v-if="wh.width.value < width_rwd">借用時間：</span>
              {{ i['period'] }}
            </v-col>
            <v-col class="v-col-sm-3 v-col-12">
              <v-btn @click="delspace(index)" color="error" elevation="0"
                >刪除</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-if="wh.width.value > width_rwd && space_data.length != 0">
    <v-col>
      <v-table>
        <thead>
          <tr>
            <th>場地名稱</th>
            <th>借用日期</th>
            <th>借用時間</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, index) in space_data" :key="i">
            <td>
              {{ i['space_name'] }}
            </td>
            <td>
              {{ i['datetime'] }}
            </td>
            <td>
              {{ i['period'] }}
            </td>
            <td v-if="btn_flag">
              <v-btn @click="delspace(index)" color="error" elevation="0"
                >刪除</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>
<script setup>
import { useWindowSize } from '@vueuse/core';

const wh = useWindowSize();
const space_data = defineModel('space_data');
const props = defineProps(['width_rwd', 'btn_flag', 'submit_flag']);
const width_rwd = props.width_rwd;
const btn_flag = props.btn_flag;
const submit_flag = props.submit_flag;
const delspace = (index) => {
  space_data.value.splice(index, 1);
};
</script>
