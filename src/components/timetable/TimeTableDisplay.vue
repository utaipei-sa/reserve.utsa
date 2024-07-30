<template>
  <v-row v-if="props.hasGetData">
    <v-col>
      <v-card color="grey-lighten-2">
        <v-table v-if="props.type == '物品'">
          <thead>
            <tr>
              <th>日期</th>
              <th>數量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in props.available" :key="index">
              <td>{{ i['date'] }}</td>
              <td>{{ i['quantity'] }}</td>
            </tr>
          </tbody>
        </v-table>
        <v-table v-else>
          <thead>
            <tr>
              <th>日期</th>
              <th>08:00-12:00</th>
              <th>13:00-17:00</th>
              <th>18:00-22:00</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in available" :key="index">
              <td>{{ i['date'] }}</td>
              <td>{{ i['time1'] == '1' ? '可借用' : '不可借' }}</td>
              <td>{{ i['time2'] == '1' ? '可借用' : '不可借' }}</td>
              <td>{{ i['time3'] == '1' ? '可借用' : '不可借' }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
const props = defineProps(['hasGetData','type','available'])
</script>