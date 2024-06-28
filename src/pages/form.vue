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
              <SpaceSelector v-model:space_data="space_data" :space_list="space_list" />
              <SpaceDisplay v-model:space_data="space_data" width_rwd="600" :btn_flag="true" :submit_flag="false"/>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card color="grey-lighten-2">
            <v-container>
              <ItemSelector v-model:item_data="item_data" :item_list="item_list" />
              <ItemDisplay v-model:item_data="item_data" width_rwd="600" :btn_flag="true" :submit_flag="false"/>
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
          <SubmitDialog :submit_data="{
              space_data: space_data,
              item_data: item_data,
              note: note,
              basic_info: basic_info
            }" 
            :silist="{
              item_list: item_list,
              space_list: space_list
            }" />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    axios
      .get('http://localhost:3000/api/v1/reserve/spaces',
      ).then((response) => {
        let temp = response['data']
        for (let i = 0; i < temp['data'].length; i++) {
          this.space_list[0][response['data']['data'][i]['name']['zh-tw']] = response['data']['data'][i]['_id']
          this.space_list[1].push(response['data']['data'][i]['name']['zh-tw'])
        }
      })
    axios
      .get('http://localhost:3000/api/v1/reserve/items',
      ).then((response) => {
        let temp = response['data']
        for (let i = 0; i < temp['data'].length; i++) {
          this.item_list[0][response['data']['data'][i]['name']['zh-tw']] = response['data']['data'][i]['_id']
          this.item_list[1].push(response['data']['data'][i]['name']['zh-tw'])
        }
      })
  },
  data() {
    return {
      item_list: [{}, []],
      space_list: [{}, []],
      space_data: [],
      item_data: [],
      submit: null,
      note: "",
      basic_info: {
        email: "",
        org: "",
        department: "",
        name: "",
        reason: "",
      }
    }
  },
}
</script>
<style></style>