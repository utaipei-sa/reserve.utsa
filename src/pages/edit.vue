<template>
  <v-sheet rounded="rounded" class="h-100 form-bg">
    <v-container :class="width > 960 ? `px-10` : `px-5`">
      <v-row>
        <v-col>
          <BasicInfo v-model:basic_info="basic_info" :edit_flag="true" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card elevation="0" class="form-cards">
            <v-container class="px-0">
              <SpaceSelector
                v-model:space_data="space_data"
                :space_list="space_list"
              />
              <SpaceDisplay
                v-model:space_data="space_data"
                width_rwd="600"
                :btn_flag="true"
                :submit_flag="false"
              />
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card elevation="0" class="form-cards">
            <v-container class="px-0">
              <ItemSelector
                v-model:item_data="item_data"
                :item_list="item_list"
              />
              <ItemDisplay
                v-model:item_data="item_data"
                width_rwd="600"
                :btn_flag="true"
                :submit_flag="false"
              />
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card elevation="0" class="form-cards">
            <v-container :class="width > 960 ? `px-2` : `px-0`">
              <v-row>
                <v-col class="v-col-auto">
                  <v-card color="transparent" elevation="0" rounded="0">
                    <v-card-title
                      class="pb-0"
                      style="border-bottom: 5px solid #e6f3ee"
                      >備註</v-card-title
                    >
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card color="transparent" elevation="0">
                    <v-textarea
                      v-model="note"
                      color="transparent"
                      class="h-100"
                    />
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="v-col-auto">
          <v-btn
            color="error"
            height="auto"
            variant="flat"
            style="font-size: 18px; line-height: 45px"
            @click="delete_form_dialog_flag = true"
          >
            刪除預約
          </v-btn>
        </v-col>
        <v-col class="v-col-auto">
          <SubmitDialog
            :edit_flag="true"
            :submit_data="{
              space_data: space_data,
              item_data: item_data,
              note: note,
              basic_info: basic_info
            }"
            :silist="{
              item_list: item_list,
              space_list: space_list
            }"
            v-model:loading="loading"
          />
        </v-col>
      </v-row>
    </v-container>
    <ResponseDialog
      dialog_text="確定要刪除此筆預約嗎"
      dialog_title="刪除預約"
      :cancel_button_flag="true"
      :click_cancel="() => {}"
      :click_confirm="
        () => {
          delete_form();
        }
      "
      v-model:dialog_flag="delete_form_dialog_flag"
    ></ResponseDialog>
    <ResponseDialog
      :dialog_text="dialog_text"
      :dialog_title="dialog_title"
      :cancel_button_flag="cancel_button_flag"
      :click_cancel="() => {}"
      :click_confirm="
        () => {
          click_confirm_function();
        }
      "
      v-model:dialog_flag="response_dialog_flag"
    ></ResponseDialog>
  </v-sheet>
</template>

<script setup>
import {
  apiGetReserveItems,
  apiGetReserveSpaces,
  apiGetReserve,
  apiDeleteReserve
} from '@/api';
import { handle_response } from '@/api/response';
import { useDateFormat } from '@vueuse/core';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const item_list = ref([{}, [], {}]);
const space_list = ref([{}, [], {}]);
const space_data = ref([]);
const item_data = ref([]);
const note = ref('');
const loading = ref(true);

const basic_info = ref({
  email: '',
  org: '',
  department: '',
  name: '',
  reason: ''
});
const delete_form_dialog_flag = ref(false);
const response_dialog_flag = ref(false);
const dialog_text = ref('');
const dialog_title = ref('');
const cancel_button_flag = ref(false);
const click_confirm_function = ref(() => {});
const route = useRoute();
const id = route.query.id;
const router = useRouter();
const return_homepage = () => {
  router.replace({
    name: '/'
  });
};
const delete_form = async () => {
  loading.value = true;
  try {
    const response = await apiDeleteReserve(id);
    console.log(response);
    const dialog_content = handle_response(response['data']['code'], 'delete');
    change_dialog_status(dialog_content);
    click_confirm_function.value = return_homepage;
  } catch (error) {
    console.error(error);
    const dialog_content = handle_response(
      error['response']['data']['error_code']
    );
    change_dialog_status(dialog_content);
  }
  loading.value = false;
};
const change_dialog_status = (dialog_content) => {
  dialog_text.value = dialog_content.dialog_text;
  dialog_title.value = dialog_content.dialog_title;
  response_dialog_flag.value = true;
};
onMounted(async () => {
  if (id == null) {
    return_homepage();
  }
  try {
    const items = await apiGetReserveItems();
    const spaces = await apiGetReserveSpaces();
    const reservation = await apiGetReserve(id);
    const spaces_fetch_list = spaces['data']['data'];
    for (let i = 0; i < spaces_fetch_list.length; i++) {
      space_list.value[0][spaces_fetch_list[i]['name']['zh-tw']] =
        spaces_fetch_list[i]['_id'];
      space_list.value[1].push(spaces_fetch_list[i]['name']['zh-tw']);
      space_list.value[2][spaces_fetch_list[i]['_id']] =
        spaces_fetch_list[i]['name']['zh-tw'];
    }
    const items_fetch_list = items['data']['data'];
    for (let i = 0; i < items_fetch_list.length; i++) {
      item_list.value[0][items_fetch_list[i]['name']['zh-tw']] =
        items_fetch_list[i]['_id'];
      item_list.value[1].push(items_fetch_list[i]['name']['zh-tw']);
      item_list.value[2][items_fetch_list[i]['_id']] =
        items_fetch_list[i]['name']['zh-tw'];
    }
    basic_info.value.department = reservation.data.department_grade;
    basic_info.value.email = reservation.data.email;
    basic_info.value.name = reservation.data.name;
    basic_info.value.org = reservation.data.organization;
    basic_info.value.reason = reservation.data.reason;
    note.value = reservation.data.note;
    for (let i = 0; i < reservation.data.item_reservations.length; i++) {
      console.log(reservation);
      item_data.value[i] = {};
      item_data.value[i]['item_name'] =
        item_list.value[2][reservation.data.item_reservations[i]['item_id']];
      item_data.value[i]['start_datetime'] = useDateFormat(
        reservation.data.item_reservations[i]['start_datetime'],
        'YYYY-MM-DD'
      ).value;
      item_data.value[i]['end_datetime'] = useDateFormat(
        reservation.data.item_reservations[i]['end_datetime'],
        'YYYY-MM-DD'
      ).value;
      item_data.value[i]['quantity'] =
        reservation.data.item_reservations[i]['quantity'];
    }
    console.log(item_data.value);
    for (let i = 0; i < reservation.data.space_reservations.length; i++) {
      console.log(reservation);
      space_data.value[i] = {};
      space_data.value[i]['space_name'] =
        space_list.value[2][reservation.data.space_reservations[i]['space_id']];

      const start_date_temp = useDateFormat(
        reservation.data.space_reservations[i]['start_datetime'],
        'YYYY-MM-DD'
      ).value;
      const end_date_temp = useDateFormat(
        reservation.data.space_reservations[i]['end_datetime'],
        'YYYY-MM-DD'
      ).value;
      if (start_date_temp === end_date_temp) {
        space_data.value[i]['datetime'] = start_date_temp;
        space_data.value[i]['period'] =
          useDateFormat(
            reservation.data.space_reservations[i]['start_datetime'],
            'HH:mm'
          ).value +
          '-' +
          useDateFormat(
            reservation.data.space_reservations[i]['end_datetime'],
            'HH:mm'
          ).value;
      } else {
        space_data.value[i]['datetime'] = 'Data Corrupted';
        space_data.value[i]['period'] = 'Data Corrupted';
      }
    }
    console.log(space_data.value);
  } catch (error) {
    console.log(error);
    const dialog_content = handle_response(
      error['response']['data']['error_code'],
      'edit'
    );
    dialog_text.value = dialog_content.dialog_text;
    dialog_title.value = dialog_content.dialog_title;
    response_dialog_flag.value = true;
    click_confirm_function.value = return_homepage;
  }
  loading.value = false;
});
</script>

<style scoped>
.form-bg {
  background-image: linear-gradient(135deg, #eef1f5 0%, #b5c4df 100%);
}

.form-cards {
  padding: 0px 24px;
  margin-top: 24px;
  border-radius: 16px;
  background-image: linear-gradient(180deg, #ffffff98 0%, #ffffff55 100%);
}

@media screen and (max-width: 959) {
  .form-cards {
    padding: 0px 8px;
  }
}
</style>
