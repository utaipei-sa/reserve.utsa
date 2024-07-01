<template>
  <v-dialog width="75%" scrollable>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" @click="add_reserve()" text="繼續"> </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col class="v-col-md-4 v-col-12">名字:{{ submit_data.basic_info.name }}</v-col>
              <v-col class="v-col-md-4 v-col-12">單位:{{ submit_data.basic_info.org }}</v-col>
              <v-col class="v-col-md-4 v-col-12">系級:{{ submit_data.basic_info.department }}</v-col>
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
            <v-row v-if="wh.width.value >= 700 && submit_data.item_data.length != 0">
              <v-col>
                <v-divider />
              </v-col>
            </v-row>
            <ItemDisplay 
              v-model:item_data="submit_data.item_data" 
              width_rwd="700" 
              :btn_flag="false" 
              :submit_flag="true"/>
            <v-row v-if="wh.width.value >= 700 && submit_data.space_data.length != 0">
              <v-col>
                <v-divider />
              </v-col>
            </v-row>
            <SpaceDisplay 
              v-model:space_data="submit_data.space_data" 
              width_rwd="700" 
              :btn_flag="false" 
              :submit_flag="true"/>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="取消" variant="outlined" @click="isActive.value = false"></v-btn>
          <v-btn text="確認" variant="tonal" @click="isActive.value = false, post_api()"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { useWindowSize } from '@vueuse/core'
import { useDateFormat } from '@vueuse/core'
import axios from 'axios';
const wh = useWindowSize()
const props = defineProps(['submit_data', 'silist'])
const submit_data = props.submit_data
const silist = props.silist
const submit = ref()
const add_reserve = () => {
  const date = new Date()
  const temp = useDateFormat(date, "YYYY-MM-DDTHH:mm:ss.SSS+08:00")
  submit.value =
  {
    "submit_datetime": temp.value,
    "organization": submit_data.basic_info.org,
    "name": submit_data.basic_info.name,
    "department_grade": submit_data.basic_info.department,
    "email": submit_data.basic_info.email,
    "reason": submit_data.basic_info.reason,
    "space_reservations": [],
    "item_reservations": [],
    "note": submit_data.note
  }
  for (var i = 0; i < submit_data.space_data.length; i++) {
    const date_format_temp1 = useDateFormat(submit_data.space_data[i][1], "YYYY-MM-DDT").value + submit_data.space_data[i][2].toString().split('-')[0]
    const date_format_temp2 = useDateFormat(submit_data.space_data[i][1], "YYYY-MM-DDT").value + submit_data.space_data[i][2].toString().split('-')[1]
    submit.value.space_reservations.push(
      {
        "space_id": silist.space_list[0][submit_data.space_data[i][0]],
        "start_datetime": date_format_temp1,
        "end_datetime": date_format_temp2
      }
    )
  }
  for (var i = 0; i < submit_data.item_data.length; i++) {
    const date_format_temp1 = useDateFormat(submit_data.item_data[i][1], "YYYY-MM-DDTHH:mm").value
    const date_format_temp2 = useDateFormat(submit_data.item_data[i][2], "YYYY-MM-DDTHH:mm").value
    submit.value.item_reservations.push(
      {
        "item_id": silist.item_list[0][submit_data.item_data[i][0]],
        "start_datetime": date_format_temp1,
        "end_datetime": date_format_temp2,
        "quantity": submit_data.item_data[i][3]
      }
    )
  }
}
const post_api = async () => {
  await axios.post("http://localhost:3000/api/v1/reserve/reservation"
    , submit.value
  ).then(function (response) {
    console.log(response)
  }).catch(function (error) {
    console.log(error)
  })
}

</script>