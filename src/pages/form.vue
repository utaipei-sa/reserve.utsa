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
        <v-col>
          <SubmitDialog
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
  </v-sheet>
</template>

<script setup>
import { apiGetReserveItems, apiGetReserveSpaces } from "@/api";
import { ref, onMounted } from "vue";
const item_list = ref([{}, []]);
const space_list = ref([{}, []]);
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

onMounted(async () => {
  try {
    const items = await apiGetReserveItems();
    const spaces = await apiGetReserveSpaces();
    for (let i = 0; i < spaces["data"]["data"].length; i++) {
      space_list.value[0][spaces["data"]["data"][i]["name"]["zh-tw"]] =
        spaces["data"]["data"][i]["_id"];
      space_list.value[1].push(spaces["data"]["data"][i]["name"]["zh-tw"]);
    }
    for (let i = 0; i < items["data"]["data"].length; i++) {
      item_list.value[0][items["data"]["data"][i]["name"]["zh-tw"]] =
        items["data"]["data"][i]["_id"];
      item_list.value[1].push(items["data"]["data"][i]["name"]["zh-tw"]);
    }
  } catch (error) {
    console.error(error);
  }
});
</script>
