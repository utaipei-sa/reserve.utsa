<template>
  <v-card elevation="0" color="transparent">
    <v-container :class="width > 960 ? `px-2` : `px-0`">
      <v-row>
        <v-col class="v-col-auto">
          <v-card color="transparent" elevation="0" rounded="0">
            <v-card-title class="pb-0" style="border-bottom: 5px solid #e6f3ee"
              >場地</v-card-title
            >
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="v-col-sm-4 v-col-12">
          <v-select
            label="場地"
            :items="space_list[1]"
            v-model="space_input"
            bg-color="transparent"
            color="primary-2"
            variant="underlined"
          ></v-select>
        </v-col>
        <v-col class="v-col-sm-4 v-col-12">
          <DatePicker v-model:date_input="date_input" label="日期"></DatePicker>
        </v-col>
        <v-col class="v-col-sm-4 v-col-12">
          <v-select
            label="時間"
            :items="time_list"
            v-model="time_input"
            bg-color="transparent"
            color="primary-2"
            variant="underlined"
          ></v-select>
        </v-col>
        <v-col class="v-col-sm-4 v-col-12">
          <v-btn
            @click="addobj()"
            color="success-light"
            elevation="0"
            bg-color="transparent"
            >新增</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-alert
            v-if="alert"
            color="error"
            icon="$error"
            :title="alert_title"
            :text="alert_text"
            elevation="4"
          >
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import { useDateFormat } from '@vueuse/core';
import { ref } from 'vue';
import { apiGetReserveSpaceAvailableTime } from '@/api';
const props = defineProps(['space_list', 'time_list']);
const space_data = defineModel('space_data');
const date_input = ref();
const time_input = ref('');
const space_input = ref('');
const alert_title = '時段無法借用';
const alert_text = '可以查詢時間表，確認此時段的借用情況';
const time_list = ['08:00-12:00', '13:00-17:00', '18:00-22:00'];

const alert = ref(false);

const addobj = async () => {
  const format_temp1 =
    useDateFormat(date_input.value.toString(), 'YYYY-MM-DDT').value +
    time_input.value.toString().split('-')[0];
  const format_temp2 =
    useDateFormat(date_input.value.toString(), 'YYYY-MM-DDT').value +
    time_input.value.toString().split('-')[1];
  let check_flag;
  try {
    const response = await apiGetReserveSpaceAvailableTime({
      space_id: props.space_list[0][space_input.value],
      start_datetime: format_temp1,
      end_datetime: format_temp2,
      intervals: false
    });
    check_flag = response['data']['availability'];
  } catch (err) {
    console.error(err);
  }
  if (check_flag == 0) {
    alert.value = true;
    setTimeout(() => {
      alert.value = false;
    }, 5000);
    return;
  }
  useDateFormat(date_input.value.toString(), 'YYYY-MM-DD').value;
  if (
    space_input.value != '' &&
    date_input.value != '' &&
    time_input.value != ''
  ) {
    space_data.value.push({
      space_name: space_input.value,
      datetime: useDateFormat(date_input.value.toString(), 'YYYY-MM-DD').value,
      period: time_input.value
    });
  }
};
</script>
