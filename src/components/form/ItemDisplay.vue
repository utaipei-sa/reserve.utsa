<template>
  <v-row v-if="wh.width.value < width_rwd && item_data.length != 0" v-for="(i, index) in item_data">
    <v-col>
      <v-card color="grey-lighten-3">
        <v-container>
          <v-row class="align-center" v-if="submit_flag">
            <v-col class="v-col-12">
              <span >物品名稱：</span>
              {{ i['item_name'] }}
            </v-col>
            <v-col class="v-col-12">
              <span >借用日期：</span>
              {{ i['start_datetime'] }}
            </v-col>
            <v-col class="v-col-12">
              <span >歸還日期：</span>
              {{ i['end_datetime'] }}
            </v-col>
            <v-col class="v-col-12">
              <span >數　　量：</span>
              {{ i['quantity'] }}
            </v-col>
          </v-row>
          <v-row class="align-center" v-else>
            <v-col class="v-col-sm-2 v-col-12">
              <span >物品名稱：</span>
              {{ i['item_name'] }}
            </v-col>
            <v-col class="v-col-sm-3 v-col-12">
              <span >借用日期：</span>
              {{ i['start_datetime'] }}
            </v-col>
            <v-col class="v-col-sm-3 v-col-12">
              <span >歸還日期：</span>
              {{ i['end_datetime'] }}
            </v-col>
            <v-col class="v-col-sm-2  v-col-12">
              <span >數　　量：</span>
              {{ i['quantity'] }}
            </v-col>
            <v-col class="v-col-sm-2 v-col-12" >
              <v-btn @click="delitem(index)" >刪除</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-if="wh.width.value > width_rwd && item_data.length != 0">
    <v-col>
      <v-table>
        <thead>
          <tr>
            <th>物品名稱</th>
            <th>借用日期</th>
            <th>歸還日期</th>
            <th>數量</th>
            <th>  </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i,index) in item_data" :key="i">
            <td>
              {{ i['item_name'] }}
            </td>
            <td>
              {{ i['start_datetime'] }}
            </td>
            <td>
              {{ i['end_datetime'] }}
            </td>
            <td>
              {{ i['quantity'] }}
            </td>
            <td v-if="btn_flag">
              <v-btn @click="delitem(index)" >刪除</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>
<script setup>
import { useWindowSize } from '@vueuse/core'

const wh = useWindowSize()
const props = defineProps(['width_rwd','btn_flag','submit_flag'])
const width_rwd = props.width_rwd
const btn_flag = props.btn_flag
const submit_flag = props.submit_flag
const item_data = defineModel('item_data')
const delitem = (index) => {
  item_data.value.splice(index, 1)
}
</script>