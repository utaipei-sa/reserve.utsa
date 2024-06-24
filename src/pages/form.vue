<template>
  <v-sheet rounded="rounded" color="grey-lighten-4">
    <v-container>
      <v-row>
        <v-col>
          <BasicInfo v-model:name="name" v-model:org="org" v-model:department="department" v-model:email="email"
            v-model:reason="reason" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card color="grey-lighten-2">
            <v-container>
              <BasicSpaceSelector v-model:space_data="space_data" :space_list="space_list" />
              <v-row v-if="wh.width >= 600 && space_data.length != 0">
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
                      <v-col class="v-col-3 pa-1">
                        <v-card class="bg-grey-lighten-1 ">
                          <v-card-title class="justify-center text-subtitle-1 text-center">
                            借用日期
                          </v-card-title>
                        </v-card>
                      </v-col>
                      <v-col class="v-col-3 pa-1">
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
              <v-row v-for="(i, index) in space_data">
                <v-col class="v-col-12">
                  <v-card color="grey-lighten-3">
                    <v-container>
                      <v-row>
                        <v-col class="v-col-sm-3 v-col-12">
                          <span v-if="wh.width < 600">場地名稱：</span>
                          {{ i[0] }}
                        </v-col>
                        <v-col class="v-col-sm-3 v-col-12">
                          <span v-if="wh.width < 600">借用日期：</span>
                          {{ i[1] }}
                        </v-col>
                        <v-col class="v-col-sm-3 v-col-12">
                          <span v-if="wh.width < 600">借用時間：</span>
                          {{ i[2] }}
                        </v-col>
                        <v-col class="v-col-sm-3 v-col-12">
                          <v-btn @click="delspace(index)" a>刪除</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card color="grey-lighten-2">
            <v-container>
              <BasicItemSelector v-model:item_data="item_data" :item_list="item_list" />
              <v-row v-if="wh.width >= 600 && item_data.length != 0">
                <v-col class="v-col-12 pa-0 pl-1">
                  <v-container>
                    <v-row>
                      <v-col class="v-col-2 pa-1">
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
              <v-row v-for="(i, index) in item_data">
                <v-col>
                  <v-card color="grey-lighten-3">
                    <v-container>
                      <v-row>
                        <v-col class="v-col-sm-2 v-col-12">
                          <span v-if="wh.width < 600">物品名稱：</span>
                          {{ i[0] }}
                        </v-col>
                        <v-col class="v-col-sm-3 v-col-12">
                          <span v-if="wh.width < 600">借用日期：</span>
                          {{ i[1] }}
                        </v-col>
                        <v-col class="v-col-sm-3 v-col-12  ">
                          <span v-if="wh.width < 600">歸還日期：</span>
                          {{ i[2] }}
                        </v-col>
                        <v-col class="v-col-sm-2  v-col-12">
                          <span v-if="wh.width < 600">數　　量：</span>
                          {{ i[3] }}
                        </v-col>
                        <v-col class="v-col-sm-2 v-col-12">
                          <v-btn @click="delitem(index)" a>刪除</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
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
                      <v-col class="v-col-md-4 v-col-12">名字:{{ name }}</v-col>
                      <v-col class="v-col-md-4 v-col-12">單位:{{ org }}</v-col>
                      <v-col class="v-col-md-4 v-col-12">系級:{{ department }}</v-col>
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
                    <v-row v-if="wh.width >= 960 && item_data.length != 0">
                      <v-col>
                        <v-divider />
                      </v-col>
                    </v-row>
                    <v-row v-if="wh.width >= 960 && item_data.length != 0">
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

                    <v-row v-for="(i, index) in item_data">
                      <v-col>
                        <v-card color="grey-lighten-3">
                          <v-container>
                            <v-row class="align-center">
                              <v-col class="v-col-md-3 v-col-12">
                                <span v-if="wh.width < 960">物品名稱：</span>
                                {{ i[0] }}
                              </v-col>
                              <v-col class="v-col-md-3 v-col-12">
                                <span v-if="wh.width < 960">借用日期：</span>
                                {{ i[1] }}
                              </v-col>
                              <v-col class="v-col-md-3 v-col-12">
                                <span v-if="wh.width < 960">歸還日期：</span>
                                {{ i[2] }}
                              </v-col>
                              <v-col class="v-col-md-2 v-col-12">
                                <span v-if="wh.width < 960">數　　量：</span>
                                {{ i[3] }}
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-row v-if="wh.width >= 960 && space_data.length != 0">
                      <v-col>
                        <v-divider />
                      </v-col>
                    </v-row>
                    <v-row v-if="wh.width >= 960 && space_data.length != 0">
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
                    <v-row v-for="i in space_data">
                      <v-col>
                        <v-card color="grey-lighten-3">
                          <v-container>
                            <v-row class="align-center">

                              <v-col class="v-col-md-3 v-col-12">
                                <span v-if="wh.width < 960">場地名稱：</span>
                                {{ i[0] }}
                              </v-col>
                              <v-col class="v-col-md-4 v-col-12">
                                <span v-if="wh.width < 960">借用日期：</span>
                                {{ i[1] }}
                              </v-col>
                              <v-col class="v-col-md-4 v-col-12">
                                <span v-if="wh.width < 960">借用時間：</span>
                                {{ i[2] }}
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card>
                      </v-col>
                    </v-row>
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
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>

</template>

<script>
import axios from 'axios';
import { useDateFormat } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'

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
          let key = response['data']['data'][i]['name']['zh-tw']
          let value = response['data']['data'][i]['quantity']
          this.quantity_limit_list[key] = value
        }

      })
  },
  data() {
    return {
      wh: useWindowSize(),
      item_list: [{}, []],
      space_list: [{}, []],
      quantity_limit_list: {},
      space_data: [],
      item_data: [],
      submit: null,
      note: "",
      email: "",
      org: "",
      department: "",
      name: "",
      reason: "",
    }
  },
  methods: {
    async post_api() {
      console.log(this.submit);
      await axios.post("http://localhost:3000/api/v1/reserve/reservation"
        , this.submit
      ).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    },
    delspace(index) {
      this.space.space_data.splice(index, 1)
    },
    delitem(index) {
      this.item_data.splice(index, 1)
    },
    addReserve() {
      let date = new Date()
      let temp = useDateFormat(date, "YYYY-MM-DDTHH:mm:ss.SSS+08:00")
      this.submit =
      {
        "submit_datetime": temp.value,
        "organization": this.org,
        "name": this.name,
        "department_grade": this.department,
        "email": this.email,
        "reason": this.reason,
        "space_reservations": [],
        "item_reservations": [],
        "note": this.note
      }
      for (var i = 0; i < this.space_data.length; i++) {
        let date_format_temp1 = useDateFormat(this.space_data[i][1], "YYYY-MM-DDT").value
        console.log(date_format_temp1)
        date_format_temp1 += this.space_data[i][2].toString().split('-')[0]
        let date_format_temp2 = useDateFormat(this.space_data[i][1], "YYYY-MM-DDT").value
        date_format_temp2 += this.space_data[i][2].toString().split('-')[1]
        this.submit['space_reservations'].push(
          {
            "space_id": this.space_list[0][this.space_data[i][0]],
            "start_datetime": date_format_temp1,
            "end_datetime": date_format_temp2
          }
        )
      }
      for (var i = 0; i < this.item_data.length; i++) {
        console.log("item")
        let date_format_temp1 = useDateFormat(this.item_data[i][1], "YYYY-MM-DDTHH:mm").value
        let date_format_temp2 = useDateFormat(this.item_data[i][2], "YYYY-MM-DDTHH:mm").value
        this.submit['item_reservations'].push(
          {
            "item_id": this.item_list[0][this.item_data[i][0]],
            "start_datetime": date_format_temp1,
            "end_datetime": date_format_temp2,
            "quantity": this.item_data[i][3]
          }
        )
      }
    },
  }
}
</script>
<style></style>