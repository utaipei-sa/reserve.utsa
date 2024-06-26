<template>
  <v-row>
    <v-col class="v-col-auto">
      <v-card title="物品" color="grey-lighten-1"></v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="v-col-sm-3 v-col-12 ">
      <v-select label="物品" :items="item_list[1]" v-model="item_temp"></v-select>
    </v-col>
    <!--  -->
    <DatePicker class_style="v-col-sm-3 v-col-12" v-model:date_temp="date_temp1"></DatePicker>
    <DatePicker class_style="v-col-sm-3 v-col-12" v-model:date_temp="date_temp2"></DatePicker>
    <v-col class="v-col-sm-3 v-col-12">
      <v-text-field label="數量" type="number" v-model="quantity_temp"></v-text-field><!-- multiple -->
    </v-col>
    <v-col class="v-col-sm-4 v-col-12">
      <v-btn @click="addobj()">新增</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-alert v-if="alert" color="error" icon="$error" :title="alert_title" :text="alert_text" elevation="4">
      </v-alert>
    </v-col>
  </v-row>
</template>

<script setup>
import axios from 'axios';
import { useDateFormat } from '@vueuse/core'
import { ref } from 'vue';
import DatePicker from './DatePicker.vue';

const props = defineProps(['item_list'])
const item_data = defineModel('item_data')

const alert_title = ref("時段無法借用")
const alert_text = ref("可以查詢時間表，確認此時段的借用情況")
const date_temp1 = ref()
const date_temp2 = ref()
const quantity_temp = ref()
const item_temp = ref('')
const alert = ref(false)

const addobj = async () => {
  let format_temp1 = useDateFormat(date_temp1.value, "YYYY-MM-DDTHH:mm").value
  let format_temp2 = useDateFormat(date_temp2.value, "YYYY-MM-DDTHH:mm").value
  /* console.log(date_format_temp1)
  console.log(this.space_temp,this.space_date_temp.toString(),this.space_time_temp) */
  let check = -1
  await axios.get("http://localhost:3000/api/v1/reserve/integral_item_availability",
    {
      params: {
        item_id: props.item_list[0][item_temp.value],
        start_datetime: format_temp1,
        end_datetime: format_temp2
      }
    },).then((response) => {
      let temp = response['data']['data']
      check = temp['available_quantity']
      console.log(response);
    })
  console.log(check);
  let alert_timer
  if (quantity_temp.value <= 0) {
    clearTimeout(alert_timer)
    alert.value = true
    alert_title.value = "物品數量不可為負數或零"
    alert_text.value = "請確認需要的物品數量是否正確"
    alert_timer = setTimeout(() => {
      alert.value = false
    }, 5000)
    return
  }
  if (check < quantity_temp.value) {
    clearTimeout(alert_timer)
    alert.value = true
    alert_title.value = "時段無法借用"
    alert_text.value = "可以查詢時間表，確認次時段的借用情況"
    alert_timer = setTimeout(() => {
      alert.value = false
    }, 5000)

    return
  }
  let date1 = new Date(date_temp1.value)
  let date2 = new Date(date_temp2.value)
  if (date1.getTime() > date2.getTime()) {
    clearTimeout(alert_timer)
    alert.value = true
    alert_title.value = "起始時間晚於結束時間"
    alert_text.value = "請將起始時間與結束時間對調"
    alert_timer = setTimeout(() => {
      alert.value = false
    }, 5000)
    return
  }
  else if (item_temp.value != "" && date_temp1.value != "" && date_temp2.value != "" && quantity_temp.value != 0) {
    item_data.value.push([item_temp.value, useDateFormat(format_temp1, "YYYY-MM-DD").value, useDateFormat(format_temp2, "YYYY-MM-DD").value, quantity_temp.value])
    console.log(item_data)
  }
}

</script>