<template>
  <v-sheet rounded="rounded" class="h-100 form-bg">
    <v-container :class="width > 960 ? `px-10` : `px-5`">
      <v-row>
        <v-col>
          <BasicInfo v-model:basic_info="basic_info" :edit_flag="false" />
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
        <v-col class="d-flex justify-center my-6" v-if="width < 960">
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
        <v-col v-else>
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
import { useWindowSize } from '@vueuse/core';
const { width } = useWindowSize();
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
