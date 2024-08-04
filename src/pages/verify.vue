<template>
  <v-sheet class="h-100 bg-grey-lighten-4">
    <v-container class="h-100">
      <v-row class="justify-center align-center h-100">
        <v-col class="px-sm-16">
          <v-alert
            :title="message.dialog_title"
            :type="alert_type"
            :text="message.dialog_text"
          />
          <v-card class="my-4 bg-grey-lighten-2">
            <v-card-text v-if="hasContent">
              <v-container>
                <v-row>
                  <v-col>名字:{{ name }}</v-col>
                  <v-col>單位:{{ org }}</v-col>
                  <v-col>系級:{{ department }}</v-col>
                </v-row>
                <v-row>
                  <v-col>email:{{ email }}</v-col>
                </v-row>
                <v-row>
                  <v-col>理由:{{ reason }}</v-col>
                </v-row>
                <v-row>
                  <v-col>備註:{{ note }}</v-col>
                </v-row>
                <ItemDisplay
                  v-model:item_data="item_data"
                  width_rwd="600"
                  :btn_flag="false"
                  :submit_flag="true"
                />
                <SpaceDisplay
                  v-model:space_data="space_data"
                  width_rwd="600"
                  :btn_flag="false"
                  :submit_flag="true"
                />
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
import {
  apiGetReserve,
  apiGetReserveItems,
  apiGetReserveSpaces,
  apiPatchReserveVerify
} from '@/api';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  R_SUCCESS,
  R_ALREADY_VERIFIED,
  handle_response
} from '@/api/response.js';
import { useDateFormat } from '@vueuse/core';
const route = useRoute();
const item_list = ref({});
const space_list = ref({});
const id = route.query.id;
onMounted(async () => {
  try {
    const items = await apiGetReserveItems();
    const spaces = await apiGetReserveSpaces();
    for (let i = 0; i < spaces['data']['data'].length; i++) {
      space_list.value[spaces['data']['data'][i]['_id']] =
        spaces['data']['data'][i]['name']['zh-tw'];
    }
    for (let i = 0; i < items['data']['data'].length; i++) {
      item_list.value[items['data']['data'][i]['_id']] =
        items['data']['data'][i]['name']['zh-tw'];
    }
    check_verify_id(id);
  } catch (error) {
    console.error(error);
  }
});

const name = ref('');
const reason = ref('');
const department = ref('');
const org = ref('');
const email = ref('');
const note = ref('');
const item_data = ref();
const space_data = ref();
const hasContent = ref(false);
const alert_type = ref('success');
const message = ref('');
const check_verify_id = async (id) => {
  try {
    const verifyResponse = await apiPatchReserveVerify(id);
    if (verifyResponse['data']['code'] == R_SUCCESS) {
      await GetReservationData(id);
      console.log(verifyResponse);
      alert_type.value = 'success';
      hasContent.value = true;
      message.value = handle_response(verifyResponse['data']['code'], 'verify');
    }
  } catch (error) {
    console.log(error);
    const error_code = error['response']['data']['error_code'];
    message.value = handle_response(error_code, 'verify');
    hasContent.value = message.value.dialog_ContentFlag;
    alert_type.value = message.value.dialog_alert;
    if (error_code == R_ALREADY_VERIFIED) await GetReservationData(id);
  }
};
const GetReservationData = async (id) => {
  try {
    const reservationResponse = await apiGetReserve(id);
    const data = reservationResponse.data;
    department.value = data.department_grade;
    email.value = data.email;
    item_data.value = data.item_reservations;
    name.value = data.name;
    note.value = data.note;
    reason.value = data.reason;
    org.value = data.organization;
    space_data.value = data.space_reservations;
    item_data.value.forEach((item) => {
      item['item_name'] = item_list.value[item['item_id']];
    });
    space_data.value.forEach((space) => {
      space['space_name'] = space_list.value[space['space_id']];
      space['period'] =
        useDateFormat(space['start_datetime'], 'HH:mm').value +
        '~' +
        useDateFormat(space['end_datetime'], 'HH:mm').value;
      space['datetime'] = useDateFormat(
        space['start_datetime'],
        'YYYY-MM-DD'
      ).value;
    });
    console.log(space_data.value);
  } catch (error) {
    console.error(error);
  }
};
</script>
