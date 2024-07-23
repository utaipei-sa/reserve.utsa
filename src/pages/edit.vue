<template>
  <v-sheet rounded="rounded" color="grey-lighten-4">
    <v-container>
      <v-row>
        <v-col>
          <BasicInfo v-model:basic_info="basic_info" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card color="grey-lighten-2">
            <v-container>
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
          <v-card color="grey-lighten-2">
            <v-container>
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
          <v-card color="grey-lighten-2">
            <v-container>
              <v-row>
                <v-col class="v-col-auto">
                  <v-card title="備註" color="grey-lighten-1"></v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card>
                    <v-textarea v-model="note" />
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="v-col-auto">
          <v-btn color="error" variant="outlined" @click="delete_form()">
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
              basic_info: basic_info,
            }"
            :silist="{
              item_list: item_list,
              space_list: space_list,
            }"
          />
        </v-col>
      </v-row>
    </v-container>
    <ResponseDialog
      dialog_text="確定要刪除此筆預約嗎"
      dialog_title="刪除預約"
      :cancel_button_flag="true"
      :click_cancel="()=>{}"
      :click_confirm="()=>{delete_form()}"
      v-model:dialog_flag="delete_form_dialog_flag"
    ></ResponseDialog>
    
  </v-sheet>
</template>

<script setup>
import { apiGetReserveItems, apiGetReserveSpaces, apiGetReserve } from "@/api";
import { useDateFormat } from "@vueuse/core";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const item_list = ref([{}, [], {}]);
const space_list = ref([{}, [], {}]);
const space_data = ref([]);
const item_data = ref([]);
const note = ref("");
const basic_info = ref({
  email: "",
  org: "",
  department: "",
  name: "",
  reason: "",
});
const delete_form_dialog_flag = ref(false)
const route = useRoute();
const router = useRouter();
const delete_form = () => {
  delete_form_dialog_flag.value = true
  console.log(delete_form_dialog_flag)
  console.log("刪除預約")
};
onMounted(async () => {
  const id = route.query.id;
  if (id == null) {
    router.replace({
      name: "/",
    });
  }
  try {
    const items = await apiGetReserveItems();
    const spaces = await apiGetReserveSpaces();
    const reservation = await apiGetReserve(id);
    for (let i = 0; i < spaces["data"]["data"].length; i++) {
      space_list.value[0][spaces["data"]["data"][i]["name"]["zh-tw"]] =
        spaces["data"]["data"][i]["_id"];
      space_list.value[1].push(spaces["data"]["data"][i]["name"]["zh-tw"]);
      space_list.value[2][spaces["data"]["data"][i]["_id"]] =
        spaces["data"]["data"][i]["name"]["zh-tw"];
    }
    for (let i = 0; i < items["data"]["data"].length; i++) {
      item_list.value[0][items["data"]["data"][i]["name"]["zh-tw"]] =
        items["data"]["data"][i]["_id"];
      item_list.value[1].push(items["data"]["data"][i]["name"]["zh-tw"]);
      item_list.value[2][items["data"]["data"][i]["_id"]] =
        items["data"]["data"][i]["name"]["zh-tw"];
    }
    basic_info.value.department = reservation.data.department_grade;
    basic_info.value.email = reservation.data.email;
    basic_info.value.name = reservation.data.name;
    basic_info.value.org = reservation.data.organization;
    basic_info.value.reason = reservation.data.reason;
    note.value = reservation.data.note;
    for (let i = 0; i < reservation.data.item_reservations.length; i++) {
      console.log(reservation);
      item_data.value[i] = [];
      item_data.value[i][0] =
        item_list.value[2][reservation.data.item_reservations[i]["item_id"]];
      item_data.value[i][1] = useDateFormat(
        reservation.data.item_reservations[i]["start_datetime"],
        "YYYY-MM-DD"
      ).value;
      item_data.value[i][2] = useDateFormat(
        reservation.data.item_reservations[i]["end_datetime"],
        "YYYY-MM-DD"
      ).value;
      item_data.value[i][3] = reservation.data.item_reservations[i]["quantity"];
    }
    for (let i = 0; i < reservation.data.space_reservations.length; i++) {
      console.log(reservation);
      space_data.value[i] = [];
      space_data.value[i][0] =
        space_list.value[2][reservation.data.space_reservations[i]["space_id"]];

      const start_date_temp = useDateFormat(
        reservation.data.space_reservations[i]["start_datetime"],
        "YYYY-MM-DD"
      ).value;
      const end_date_temp = useDateFormat(
        reservation.data.space_reservations[i]["end_datetime"],
        "YYYY-MM-DD"
      ).value;
      if (start_date_temp === end_date_temp) {
        space_data.value[i][1] = start_date_temp;
        space_data.value[i][2] =
          useDateFormat(
            reservation.data.space_reservations[i]["start_datetime"],
            "HH:mm"
          ).value +
          "~" +
          useDateFormat(
            reservation.data.space_reservations[i]["end_datetime"],
            "HH:mm"
          ).value;
      } else {
        space_data.value[i][1] = "Data Corrupted";
        space_data.value[i][2] = "Data Corrupted";
      }
    }
  } catch (error) {
    console.error(error);
  }
});
</script>