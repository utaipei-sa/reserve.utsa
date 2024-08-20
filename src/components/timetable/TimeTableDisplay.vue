<template>
  <v-row v-if="props.hasGetData">
    <v-col>
      <v-card class="timetable-cards" elevation="0">
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
              <td :class="{ 'lattice-disabled': i['quantity'] === 0 }">
                {{ i['quantity'] }}
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-table v-else>
          <thead>
            <tr>
              <th>日期</th>
              <th>08:00 - 12:00</th>
              <th>13:00 - 17:00</th>
              <th>18:00 - 22:00</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in available" :key="index">
              <td>{{ i['date'] }}</td>
              <td
                :class="
                  i['time1'] == '1' ? 'lattice-abled' : 'lattice-disabled'
                "
              >
                {{ i['time1'] == '1' ? '可借用' : '不可借' }}
              </td>
              <td
                :class="
                  i['time2'] == '1' ? 'lattice-abled' : 'lattice-disabled'
                "
              >
                {{ i['time2'] == '1' ? '可借用' : '不可借' }}
              </td>
              <td
                :class="
                  i['time3'] == '1' ? 'lattice-abled' : 'lattice-disabled'
                "
              >
                {{ i['time3'] == '1' ? '可借用' : '不可借' }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps(['hasGetData', 'type', 'available']);
</script>

<style scoped>
.timetable-cards {
  padding: 24px 24px;
  border-radius: 16px;
  background-image: linear-gradient(180deg, #ffffff98 0%, #ffffff55 100%);
}

.lattice-abled:hover {
  background-color: #e6f3ee;
}

.lattice-disabled {
  pointer-events: none;
  opacity: 0.5;
  color: #212121;
  background-color: #94949439;
}
</style>
