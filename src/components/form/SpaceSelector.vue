<template>
  <v-row>
    <v-col class="v-col-auto">
      <v-card title="場地" color="grey-lighten-1"></v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="v-col-sm-4 v-col-12 ">
      <v-select label="場地" :items="space_list[1]" v-model="space_input"></v-select>
    </v-col>
    <v-col class="v-col-sm-4 v-col-12">
      <DatePicker v-model:date_input="date_input"></DatePicker>
    </v-col>
    <v-col class="v-col-sm-4 v-col-12">
      <v-select label="時間" :items="time_list" v-model="time_input"></v-select>
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

const props = defineProps(['space_list', 'time_list'])
const space_data = defineModel('space_data')
const date_input = ref()
const time_input = ref('')
const space_input = ref('')
const alert_title = "時段無法借用"
const alert_text = "可以查詢時間表，確認此時段的借用情況"
const time_list = ['08:00-12:00', '13:00-17:00', '18:00-22:00']

const alert = ref(false)

const addobj = async () => {
  let format_temp1 = useDateFormat(date_input.value.toString(), "YYYY-MM-DDT").value
  format_temp1 += time_input.value.toString().split('-')[0]
  let format_temp2 = useDateFormat(date_input.value.toString(), "YYYY-MM-DDT").value
  format_temp2 += time_input.value.toString().split('-')[1]
  let check_flag
  await axios.get("http://localhost:3000/api/v1/reserve/integral_space_availability",
    {
      params: {
        space_id: props.space_list[0][space_input.value],
        start_datetime: format_temp1,
        end_datetime: format_temp2
      }
    },).then((response) => {
      let temp = response['data']['data']
      check_flag = temp['availability']
      console.log(response);
    })
  console.log(check_flag);
  if (check_flag == 0) {
    alert.value = true
    setTimeout(() => {
      alert.value = false
    }, 5000)
    return
  }
  useDateFormat(date_input.value.toString(), "YYYY-MM-DD").value
  if (space_input.value != "" && date_input.value != "" && time_input.value != "") {
    space_data.value.push([space_input.value, useDateFormat(date_input.value.toString(), "YYYY-MM-DD").value, time_input.value])
  }
}

</script>