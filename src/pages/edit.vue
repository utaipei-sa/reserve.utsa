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
          <v-btn color="error" variant="outlined" @click="delete_form()"> 刪除預約 </v-btn>
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
    <v-dialog width="75%" scrollable v-model="dialog_flag">
      <v-card  >
        <v-card-title class="text-h4 pa-3">
          {{ dialog_title }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          {{ dialog_text }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="取消"
            variant="outlined"
            color="error"
            @click="dialog_flag = false"
          ></v-btn>
          <v-btn
            text="確認"
            variant="tonal"
            color="primary"
            @click="dialog_flag = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
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
const dialog_flag = ref(false)
const dialog_title = ref("")
const dialog_text = ref("")
const basic_info = ref({
  email: "",
  org: "",
  department: "",
  name: "",
  reason: "",
});
const route = useRoute();
const router = useRouter();
const delete_form = () => {
  dialog_flag.value = true
  dialog_title.value = "刪除預約"
  dialog_text.value = "確定要刪除此筆預約嗎"
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
    const spaces_fetch_list = spaces["data"]["data"]
    for (let i = 0; i < spaces_fetch_list.length; i++) {
      space_list.value[0][spaces_fetch_list[i]["name"]["zh-tw"]] =
      spaces_fetch_list[i]["_id"];
      space_list.value[1].push(spaces_fetch_list[i]["name"]["zh-tw"]);
      space_list.value[2][spaces_fetch_list[i]["_id"]] =
      spaces_fetch_list[i]["name"]["zh-tw"];
    }
    const items_fetch_list = items["data"]["data"]
    for (let i = 0; i < items_fetch_list.length; i++) {
      item_list.value[0][items_fetch_list[i]["name"]["zh-tw"]] =
      items_fetch_list[i]["_id"];
      item_list.value[1].push(items_fetch_list[i]["name"]["zh-tw"]);
      item_list.value[2][items_fetch_list[i]["_id"]] =
      items_fetch_list[i]["name"]["zh-tw"];
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
