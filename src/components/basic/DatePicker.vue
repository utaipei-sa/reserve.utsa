<template>
  <v-menu 
    v-model="is_menu_open" 
    :close-on-content-click="false" 
    transition="scale-transition" 
    offset-y max-width="290px"
    min-width="290px">
    <template v-slot:activator="{ props }">
      <v-text-field v-bind="props" label="日期" v-model="format_date"></v-text-field>
    </template>
    <v-date-picker v-model="date_input" locale="zh-TW"></v-date-picker>
  </v-menu>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useDateFormat } from '@vueuse/core'

const is_menu_open = ref(false)
const date_input = defineModel('date_input')

const format_date = computed(() => {
  if (date_input.value == null) return ""
  /* setTimeout(() => {
    is_menu_open.value = false
  }, 120) */
  is_menu_open.value = false
  return useDateFormat(date_input.value, 'YYYY-MM-DD').value
})
</script>