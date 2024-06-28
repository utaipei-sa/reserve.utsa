<template>
  <v-dialog width="75%" scrollable>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" @click="addReserve()" text="繼續"> </v-btn>
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
            <!-- <v-row v-if="wh.width.value >= 960 && submit_data.item_data.length != 0">
              <v-col class="v-col-12 pa-0 pl-1">
                <v-container>
                  <v-row>
                    <v-col class="v-col-3 pa-1">
                      <v-card class="bg-grey-lighten-1 ">
                        <v-card-title class="justify-center text-subtitle-1 text-center px-1">
                          物品名稱
                        </v-card-title>
                      </v-card>
                    </v-col>
                    <v-col class="v-col-3 pa-1">
                      <v-card class="bg-grey-lighten-1 ">
                        <v-card-title class="justify-center text-subtitle-1 text-center">
                          歸還日期
                        </v-card-title>
                      </v-card>

                    </v-col>
                    <v-col class="v-col-3 pa-1">
                      <v-card class="bg-grey-lighten-1  ">
                        <v-card-title class="justify-center text-subtitle-1 text-center">
                          借用時間
                        </v-card-title>
                      </v-card>
                    </v-col>
                    <v-col class="v-col-2 pa-1 ">
                      <v-card class="bg-grey-lighten-1 ">
                        <v-card-title class="justify-center text-subtitle-1 text-center">
                          數量
                        </v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>

            <v-row v-for="(i, index) in submit_data.item_data">
              <v-col>
                <v-card color="grey-lighten-3">
                  <v-container>
                    <v-row class="align-center">
                      <v-col class="v-col-md-3 v-col-12">
                        <span v-if="wh.width.value < 960">物品名稱：</span>
                        {{ i[0] }}
                      </v-col>
                      <v-col class="v-col-md-3 v-col-12">
                        <span v-if="wh.width.value < 960">借用日期：</span>
                        {{ i[1] }}
                      </v-col>
                      <v-col class="v-col-md-3 v-col-12">
                        <span v-if="wh.width.value < 960">歸還日期：</span>
                        {{ i[2] }}
                      </v-col>
                      <v-col class="v-col-md-2 v-col-12">
                        <span v-if="wh.width.value < 960">數　　量：</span>
                        {{ i[3] }}
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row> -->
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
            <!-- <v-row v-if="wh.width.value >= 960 && submit_data.space_data.length != 0">
              <v-col class="v-col-12 pa-0 pl-1">
                <v-container>
                  <v-row>
                    <v-col class="v-col-3 pa-1">
                      <v-card class="bg-grey-lighten-1 ">
                        <v-card-title class="justify-center text-subtitle-1 text-center">
                          場地名稱
                        </v-card-title>
                      </v-card>
                    </v-col>
                    <v-col class="v-col-4 pa-1">
                      <v-card class="bg-grey-lighten-1 ">
                        <v-card-title class="justify-center text-subtitle-1 text-center">
                          借用日期
                        </v-card-title>
                      </v-card>

                    </v-col>
                    <v-col class="v-col-4 pa-1">
                      <v-card class="bg-grey-lighten-1 ">
                        <v-card-title class="justify-center text-subtitle-1 text-center">
                          借用時間
                        </v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <v-row v-for="i in submit_data.space_data">
              <v-col>
                <v-card color="grey-lighten-3">
                  <v-container>
                    <v-row class="align-center">

                      <v-col class="v-col-md-3 v-col-12">
                        <span v-if="wh.width.value < 960">場地名稱：</span>
                        {{ i[0] }}
                      </v-col>
                      <v-col class="v-col-md-4 v-col-12">
                        <span v-if="wh.width.value < 960">借用日期：</span>
                        {{ i[1] }}
                      </v-col>
                      <v-col class="v-col-md-4 v-col-12">
                        <span v-if="wh.width.value < 960">借用時間：</span>
                        {{ i[2] }}
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row> -->
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
const addReserve = () => {
  console.log(props.submit_data.note)
  let date = new Date()
  let temp = useDateFormat(date, "YYYY-MM-DDTHH:mm:ss.SSS+08:00")
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
    let date_format_temp1 = useDateFormat(submit_data.space_data[i][1], "YYYY-MM-DDT").value
    console.log(date_format_temp1)
    date_format_temp1 += submit_data.space_data[i][2].toString().split('-')[0]
    let date_format_temp2 = useDateFormat(submit_data.space_data[i][1], "YYYY-MM-DDT").value
    date_format_temp2 += submit_data.space_data[i][2].toString().split('-')[1]
    submit.value.space_reservations.push(
      {
        "space_id": silist.space_list[0][submit_data.space_data[i][0]],
        "start_datetime": date_format_temp1,
        "end_datetime": date_format_temp2
      }
    )
  }
  for (var i = 0; i < submit_data.item_data.length; i++) {
    console.log("item")
    let date_format_temp1 = useDateFormat(submit_data.item_data[i][1], "YYYY-MM-DDTHH:mm").value
    let date_format_temp2 = useDateFormat(submit_data.item_data[i][2], "YYYY-MM-DDTHH:mm").value
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
  console.log(submit.value);
  await axios.post("http://localhost:3000/api/v1/reserve/reservation"
    , submit.value
  ).then(function (response) {
    console.log(response)
  }).catch(function (error) {
    console.log(error)
  })
}

</script>