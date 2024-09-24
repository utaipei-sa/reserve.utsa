<template>
  <v-row>
    <v-col>
      <v-card color="grey-lighten-2">
        <v-container>
          <v-row>
            <v-col>
              <v-select label="種類" :items="type_list" v-model="type_input" />
            </v-col>
          </v-row>
          <v-row v-if="type_input == '物品' || type_input == '場地'">
            <v-col>
              <v-select
                label="清單"
                v-if="type_input == '物品'"
                :items="item_list[1]"
                v-model="item"
              ></v-select>
              <v-select
                label="清單"
                v-if="type_input == '場地'"
                :items="space_list[1]"
                v-model="space"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <DatePicker v-model:date_input="date"></DatePicker>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="serach()">查詢</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useDateFormat } from '@vueuse/core';
import {
  apiGetReserveItems,
  apiGetReserveSpaces,
  apiGetReserveItemAvailableTime,
  apiGetReserveSpaceAvailableTime
} from '@/api';

const item_list = ref([{}, []]);
const space_list = ref([{}, []]);
const available = defineModel('available');
const has_data = defineModel('has_data');
const type_list = ['場地', '物品'];
const type = defineModel('type');
const type_input = ref('');
const date = ref();
const item = ref('');
const space = ref('');
const start_datetime = ref();
const end_datetime = ref();
const loading = defineModel('loading');

const serach = async () => {
  loading.value = true;
  available.value = [];
  type.value = type_input.value;

  try {
    if (type_input.value == '場地') {
      start_datetime.value = new Date(date.value);
      end_datetime.value = new Date(date.value);
      end_datetime.value.setDate(end_datetime.value.getDate() + 7);
      end_datetime.value = useDateFormat(
        end_datetime,
        'YYYY-MM-DDTHH:mm'
      ).value;
      start_datetime.value = useDateFormat(
        start_datetime,
        'YYYY-MM-DDTHH:mm'
      ).value;
      console.log(start_datetime, end_datetime);
      const response = await apiGetReserveSpaceAvailableTime({
        space_id: space_list.value[0][space.value],
        start_datetime: start_datetime.value,
        end_datetime: end_datetime.value,
        intervals: true
      });
      console.log(response);
      for (let i = 0; i < response['data'].length; i += 3) {
        let row_date = new Date(response['data'][i]['start_datetime']);
        available.value[i / 3] = {
          date: row_date.getMonth() + 1 + '/' + row_date.getDate(),
          time1: response['data'][i]['availability'],
          time2: response['data'][i + 1]['availability'],
          time3: response['data'][i + 2]['availability']
        };
      }
    } else if (type_input.value == '物品') {
      start_datetime.value = new Date(date.value);
      end_datetime.value = new Date(date.value);
      start_datetime.value.setHours(12);
      end_datetime.value.setDate(end_datetime.value.getDate() + 7);
      end_datetime.value.setHours(12);
      end_datetime.value = useDateFormat(
        end_datetime,
        'YYYY-MM-DDTHH:mm'
      ).value;
      start_datetime.value = useDateFormat(
        start_datetime,
        'YYYY-MM-DDTHH:mm'
      ).value;
      const response = await apiGetReserveItemAvailableTime({
        item_id: item_list.value[0][item.value],
        start_datetime: start_datetime.value,
        end_datetime: end_datetime.value,
        intervals: true
      });
      for (let i = 0; i < response['data'].length; i++) {
        let row_date = new Date(response['data'][i]['start_datetime']);
        available.value[i] = {
          date: row_date.getMonth() + 1 + '/' + row_date.getDate(),
          quantity: response['data'][i]['available_quantity']
        };
      }
      console.log(response);
    }
    has_data.value = true;
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
  loading.value = false;
};
onMounted(async () => {
  try {
    const items = await apiGetReserveItems();
    const spaces = await apiGetReserveSpaces();
    for (let i = 0; i < spaces['data']['data'].length; i++) {
      space_list.value[0][spaces['data']['data'][i]['name']['zh-tw']] =
        spaces['data']['data'][i]['_id'];
      space_list.value[1].push(spaces['data']['data'][i]['name']['zh-tw']);
    }
    for (let i = 0; i < items['data']['data'].length; i++) {
      item_list.value[0][items['data']['data'][i]['name']['zh-tw']] =
        items['data']['data'][i]['_id'];
      item_list.value[1].push(items['data']['data'][i]['name']['zh-tw']);
    }
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
  loading.value = false;
});
</script>
