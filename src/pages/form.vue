<template>
  <v-sheet rounded="rounded" color="grey-lighten-4">
    <v-container>
      <v-row>
        <v-col>
          <BasicInfo v-model:basic_info="basic_info" :edit_flag="false" />
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
            :edit_flag="false"
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
          />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { apiGetReserveItems, apiGetReserveSpaces } from '@/api';
import { ref, onMounted } from 'vue';
const item_list = ref([{}, [], {}]);
const space_list = ref([{}, [], {}]);
const space_data = ref([]);
const item_data = ref([]);
const note = ref('');
const basic_info = ref({
  email: '',
  org: '',
  department: '',
  name: '',
  reason: ''
});

onMounted(async () => {
  try {
    const items = await apiGetReserveItems();
    const spaces = await apiGetReserveSpaces();
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
  } catch (error) {
    console.error(error);
  }
});
</script>
