<template>
  <v-sheet class="h-100 bg-grey-lighten-4">
    <v-container class=" h-100">
      <v-row class="justify-center align-center h-100	">
        <v-col class="px-sm-16">
          <v-alert :title="title" :type="alert_type" :text="message.dialog_text" />
          <v-card class=" my-4 bg-grey-lighten-2">
            <v-card-text v-if="hasContent">
              <v-container>
                <v-row>
                  <v-col>名字:{{ name }}</v-col>
                  <v-col>單位:{{ org }}</v-col>
                  <v-col>系級:{{ department }}</v-col>
                </v-row>
                <v-row>
                  <v-col>email:{{ email }}</v-col>
                </v-row>
                <v-row>
                  <v-col>理由:{{ reason }}</v-col>
                </v-row>
                <v-row>
                  <v-col>備註:{{ note }}</v-col>
                </v-row>
                <v-row v-for="(i, index) in item_data">
                  <v-col>
                    <v-card color="grey-lighten-3">
                      <v-container>
                        <v-row class="align-center">
                          <v-col class="v-col-sm-1 v-col-12">
                            {{ index + 1 }}
                          </v-col>
                          <v-col class="v-col-sm-2 v-col-12">
                            {{ item_list[i['item_id']] }}
                          </v-col>
                          <v-col class="v-col-sm-3 v-col-12">
                            {{ i['start_datetime'] }}
                          </v-col>
                          <v-col class="v-col-sm-3 v-col-12">
                            {{ i['end_datetime'] }}
                          </v-col>
                          <v-col class="v-col-sm-3 v-col-12">
                            {{ i['quantity'] }}
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row v-for="(i, index) in space_data">
                  <v-col>
                    <v-card color="grey-lighten-3">
                      <v-container>
                        <v-row class="align-center">
                          <v-col class="v-col-sm-1 v-col-12">
                            {{ index + 1 }}
                          </v-col>
                          <v-col class="v-col-sm-4 v-col-12">
                            {{ space_list[i['space_id']] }}
                          </v-col>
                          <v-col class="v-col-sm-3 v-col-12">
                            {{ i['start_datetime'] }}
                          </v-col>
                          <v-col class="v-col-sm-3 v-col-12">
                            {{ i['end_datetime'] }}
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { apiGetReserve, apiGetReserveItems, apiGetReserveSpaces, apiPatchReserveVerify } from '@/api';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { R_SUCCESS, R_INVALID_INFO, R_ALREADY_VERIFIED, R_ID_NOT_FOUND, handle_response } from '@/api/response.js';

const item_list = ref({})
const space_list = ref({})
onMounted(async () => {
  try{
    const items = await apiGetReserveItems();
    const spaces = await apiGetReserveSpaces();
    for (let i = 0; i < spaces['data']['data'].length; i++) {
      space_list.value[spaces['data']['data'][i]['_id']] = spaces['data']['data'][i]['name']['zh-tw']
    }
    for (let i = 0; i < items['data']['data'].length; i++) {
      item_list.value[items['data']['data'][i]['_id']] = items['data']['data'][i]['name']['zh-tw']
    }
    check_verify_id(props.verifyid)
  }
  catch (error) {
    console.error(error);
  }
})

const props = defineProps(['verifyid'])
const name = ref("")
const reason = ref("")
const department = ref("")
const org = ref("")
const email = ref("")
const note = ref("")
const item_data = ref()
const space_data = ref()
const hasContent = ref(false)
const alert_type = ref("success")
const message = ref("")
const check_verify_id = async (verifyid) => {
  console.log(verifyid)
  try{
    const verifyResponse = apiPatchReserveVerify(verifyid)

    if (verifyResponse['data']['code'] == R_SUCCESS) {
      await GetReservationData(verifyid)
      console.log(reserve_data)
      alert_type.value = "success"
      hasContent.value = true
      message.value = handle_response(verifyResponse['data']['code'] ,"verify")
    } 
    } catch (error) {
      switch(verifyResponse['data']['code']) {
        case R_ID_NOT_FOUND:
          message.value = handle_response(verifyResponse['data']['code'] ,"verify")
          hasContent.value = false
          alert_type.value = "error"
          break;
        case R_ALREADY_VERIFIED:
          await GetReservationData(verifyid);
          message.value = handle_response(verifyResponse['data']['code'] ,"verify")
          hasContent.value = true;
          alert_type.value = "warning";
          break;
        case R_INVALID_INFO:
          message.value = handle_response(verifyResponse['data']['code'] ,"verify")
          hasContent.value = false
          alert_type.value = "error"
          break;
      }
    }
  }
  const GetReservationData = async (verifyid) => {
  try {
    const reservationResponse = apiGetReserve(verifyid)
    const data = reservationResponse.data
    department.value = data.department_grade
    email.value = data.email
    item_data.value = data.item_reservations
    name.value = data.name
    note.value = data.note
    reason.value = data.reason
    org.value = data.organization
    space_data.value = data.space_reservations
  } catch (error) {
    console.error(error)
  }
};
</script>
