<template>
  <v-dialog width="75%" scrollable>
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        @click="add_reserve()"
        variant="tonal"
        color="primary"
        >{{ edit_flag ? '變更預約' : '送出預約' }}
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col class="v-col-md-4 v-col-12"
                >名字:{{ submit_data.basic_info.name }}</v-col
              >
              <v-col class="v-col-md-4 v-col-12"
                >單位:{{ submit_data.basic_info.org }}</v-col
              >
              <v-col class="v-col-md-4 v-col-12"
                >系級:{{ submit_data.basic_info.department }}</v-col
              >
            </v-row>
            <v-row>
              <v-col>email:{{ submit_data.basic_info.email }}</v-col>
            </v-row>
            <v-row>
              <v-col>理由:{{ submit_data.basic_info.reason }}</v-col>
            </v-row>
            <v-row>
              <v-col>備註:{{ props.submit_data.note }}</v-col>
            </v-row>
            <v-row
              v-if="wh.width.value >= 700 && submit_data.item_data.length != 0"
            >
              <v-col>
                <v-divider />
              </v-col>
            </v-row>
            <ItemDisplay
              v-model:item_data="submit_data.item_data"
              width_rwd="700"
              :btn_flag="false"
              :submit_flag="true"
            />
            <v-row
              v-if="wh.width.value >= 700 && submit_data.space_data.length != 0"
            >
              <v-col>
                <v-divider />
              </v-col>
            </v-row>
            <SpaceDisplay
              v-model:space_data="submit_data.space_data"
              width_rwd="700"
              :btn_flag="false"
              :submit_flag="true"
            />
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="取消"
            variant="outlined"
            color="error"
            @click="isActive.value = false"
          ></v-btn>
          <v-btn
            text="確認"
            variant="tonal"
            color="primary"
            @click="
              (isActive.value = false),
                props.edit_flag ? patch_api() : post_api()
            "
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
  <ResponseDialog
    :dialog_text="dialog_text"
    :dialog_title="dialog_title"
    :cancel_button_flag="cancel_button_flag"
    :click_cancel="() => {}"
    :click_confirm="() => {}"
    v-model:dialog_flag="response_dialog_flag"
  ></ResponseDialog>
</template>
<script setup>
import { ref } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { useDateFormat } from '@vueuse/core';
import { apiPostReserve, apiPutReserve } from '@/api';
import { handle_response } from '@/api/response';
import { useRoute } from 'vue-router';
const wh = useWindowSize();
const props = defineProps(['edit_flag', 'submit_data', 'silist']);
const submit_data = props.submit_data;
const silist = props.silist;
const submit = ref();
const edit_flag = props.edit_flag;
const response_dialog_flag = ref(false);
const dialog_text = ref('');
const dialog_title = ref('');
const cancel_button_flag = ref(false);
const route = useRoute();
const id = route.query.id;
const add_reserve = () => {
  const date = new Date();
  const temp = useDateFormat(date, 'YYYY-MM-DDTHH:mm:ss.SSS+08:00');
  submit.value = {
    submit_datetime: temp.value,
    organization: submit_data.basic_info.org,
    name: submit_data.basic_info.name,
    department_grade: submit_data.basic_info.department,
    email: submit_data.basic_info.email,
    reason: submit_data.basic_info.reason,
    space_reservations: [],
    item_reservations: [],
    note: submit_data.note
  };
  for (var i = 0; i < submit_data.space_data.length; i++) {
    const date_format_temp1 = useDateFormat(
      useDateFormat(submit_data.space_data[i]['datetime'], 'YYYY-MM-DDT')
        .value + submit_data.space_data[i]['period'].toString().split('-')[0],
      'YYYY-MM-DDTHH:mm:ss.SSS+0800'
    ).value;
    const date_format_temp2 = useDateFormat(
      useDateFormat(submit_data.space_data[i]['datetime'], 'YYYY-MM-DDT')
        .value + submit_data.space_data[i]['period'].toString().split('-')[1],
      'YYYY-MM-DDTHH:mm:ss.SSS+0800'
    ).value;
    submit.value.space_reservations.push({
      space_id: silist.space_list[0][submit_data.space_data[i]['space_name']],
      start_datetime: date_format_temp1,
      end_datetime: date_format_temp2
    });
  }
  for (var i = 0; i < submit_data.item_data.length; i++) {
    const date_format_temp1 = useDateFormat(
      new Date(submit_data.item_data[i]['start_datetime']).setHours(12),
      'YYYY-MM-DDTHH:mm:ss.SSS+0800'
    ).value;
    const date_format_temp2 = useDateFormat(
      new Date(submit_data.item_data[i]['end_datetime']).setHours(12),
      'YYYY-MM-DDTHH:mm:ss.SSS+0800'
    ).value;
    submit.value.item_reservations.push({
      item_id: silist.item_list[0][submit_data.item_data[i]['item_name']],
      start_datetime: date_format_temp1,
      end_datetime: date_format_temp2,
      quantity: Number(submit_data.item_data[i]['quantity'])
    });
  }
  console.log(submit.value);
};

const post_api = async () => {
  try {
    const response = await apiPostReserve(submit.value);
    console.log(response);
    const dialog_content = handle_response(response['data']['code'], 'new');
    change_dialog_status(dialog_content);
  } catch (error) {
    const dialog_content = handle_response(
      error['response']['data']['error_code']
    );
    change_dialog_status(dialog_content);
    console.error(error);
  }
};

const patch_api = async () => {
  console.log(submit.value);
  try {
    const response = await apiPutReserve(submit.value, id);
    const dialog_content = handle_response(response['data']['code'], 'edit');
    change_dialog_status(dialog_content);
    console.log(response);
  } catch (error) {
    /* const dialog_content = handle_response(
      error["response"]["data"]["error_code"]
    ); */
    console.error(error);
    /* change_dialog_status(dialog_content);
    console.error(error); */
  }
};
const change_dialog_status = (dialog_content) => {
  dialog_text.value = dialog_content.dialog_text;
  dialog_title.value = dialog_content.dialog_title;
  response_dialog_flag.value = true;
};
</script>
