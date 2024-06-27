<template>
  <v-sheet color="grey-lighten-4">
    <v-container>
      <TimeTableSelector 
        v-model:available="available" 
        :item_list="item_list" 
        :space_list="space_list"
        v-model:type="type" 
        v-model:has_data="hasGetData"/>
      <TimeTableDisplay 
        :hasGetData="hasGetData"
        :type="type"
        :available="available"/>
    </v-container>
  </v-sheet>
</template>
<script>
export default {
  data() {
    return {
      type: "",
      available: [],
      hasGetData: false,
    }
  }
}
</script>