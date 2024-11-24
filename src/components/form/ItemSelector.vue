<template>
  <v-card elevation="0" color="transparent">
    <v-container :class="width > 960 ? `px-2` : `px-0`">
      <v-row>
        <v-col class="v-col-auto">
          <v-card color="transparent" elevation="0" rounded="0">
            <v-card-title class="pb-0" style="border-bottom: 5px solid #e6f3ee"
              >物品</v-card-title
            >
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="v-col-sm-3 v-col-12">
          <v-select
            label="物品"
            :items="item_list[1]"
            v-model="item_temp"
            bg-color="transparent"
            color="primary-2"
            variant="underlined"
          ></v-select>
        </v-col>
        <v-col class="v-col-sm-3 v-col-12">
          <DatePicker v-model:date_input="date_input1"></DatePicker>
        </v-col>
        <v-col class="v-col-sm-3 v-col-12">
          <DatePicker v-model:date_input="date_input2"></DatePicker>
        </v-col>
        <v-col class="v-col-sm-3 v-col-12">
          <v-text-field
            label="數量"
            type="number"
            v-model="quantity_temp"
            bg-color="transparent"
            color="primary-2"
            variant="underlined"
          ></v-text-field
          ><!-- multiple -->
        </v-col>
        <v-col class="v-col-sm-4 v-col-12">
          <v-btn @click="addobj()" color="success-light" elevation="0"
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
import { apiGetReserveItemAvailableTime } from '@/api';
import { useWindowSize } from '@vueuse/core';

const width = useWindowSize();
const props = defineProps(['item_list']);
const item_data = defineModel('item_data');
const alert_title = ref('時段無法借用');
const alert_text = ref('可以查詢時間表，確認此時段的借用情況');
const date_input1 = ref();
const date_input2 = ref();
const quantity_temp = ref();
const item_temp = ref('');
const alert = ref(false);
const alert_title_list = [
  '物品數量不可為負數或零',
  '時段無法借用',
  '起始時間晚於結束時間'
];
const alert_text_list = [
  '請確認需要的物品數量是否正確',
  '可以查詢時間表，確認次時段的借用情況',
  '請將起始時間與結束時間對調'
];
//  [小於0, 被借光了, 時間順序錯誤]

const addobj = async () => {
  let alert_timer;
  const date1 = new Date(date_input1.value);
  const date2 = new Date(date_input2.value);
  if (date1.getTime() > date2.getTime()) {
    set_alert(alert_timer, alert_title_list[2], alert_text_list[2]);
    return;
  }
  const format_temp1 = useDateFormat(
    date_input1.value,
    'YYYY-MM-DDTHH:mm'
  ).value;
  const format_temp2 = useDateFormat(
    date_input2.value,
    'YYYY-MM-DDTHH:mm'
  ).value;
  let check = -1;
  try {
    const response = await apiGetReserveItemAvailableTime({
      item_id: props.item_list[0][item_temp.value],
      start_datetime: format_temp1,
      end_datetime: format_temp2,
      intervals: false
    });
    console.log(response);
    check = response['data']['available_quantity'];
    console.log(check);
  } catch (err) {
    console.error(err);
  }
  if (quantity_temp.value <= 0) {
    set_alert(alert_timer, alert_title_list[0], alert_text_list[0]);
    return;
  }
  if (check < quantity_temp.value) {
    set_alert(alert_timer, alert_title_list[1], alert_text_list[1]);
    return;
  }
  if (
    item_temp.value != '' &&
    date_input1.value != '' &&
    date_input2.value != '' &&
    quantity_temp.value != 0
  ) {
    item_data.value.push({
      item_name: item_temp.value,
      start_datetime: useDateFormat(format_temp1, 'YYYY-MM-DD').value,
      end_datetime: useDateFormat(format_temp2, 'YYYY-MM-DD').value,
      quantity: quantity_temp.value
    });
    console.log(item_data);
  }
};

const set_alert = (timer, title, text) => {
  clearTimeout(timer);
  alert.value = true;
  alert_title.value = title;
  alert_text.value = text;
  timer = setTimeout(() => {
    alert.value = false;
  }, 5000);
};
</script>