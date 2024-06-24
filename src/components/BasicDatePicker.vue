<template>
  <v-col :class="class_style">
    <v-menu v-model="menu_open" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px"
      min-width="290px">
      <template v-slot:activator="{ props }">
        <v-text-field v-bind="props" label="日期" v-model="format_date"></v-text-field>
      </template>
      <v-date-picker v-model="date_temp" locale="zh-TW"></v-date-picker>
    </v-menu>
  </v-col>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useDateFormat } from '@vueuse/core'

const menu_open = ref(false)
const date_temp = defineModel('date_temp')
const props = defineProps(['class_style'])

const format_date = computed(() => {
  if (date_temp.value == null) return ""
  setTimeout(() => {
    menu_open.value = false
  }, 120)
  return useDateFormat(date_temp.value, 'YYYY-MM-DD').value
})
</script>