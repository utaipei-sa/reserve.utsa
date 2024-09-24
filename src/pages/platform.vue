<template>
    <v-sheet color="grey" class="h-100">
        <v-container >
            <v-row>
                <v-col>
                    <Selector
                    v-model:option="option"
                    />
                </v-col>
            </v-row> 
            <v-row v-if="option==0">
              <SpaceStatus 
              v-for="(i) in space_data" :key="i._id"
              :space_id=i._id
              :space_name="i.name['zh-tw']"
              />
            </v-row>
            <v-row v-if="option==1">
                <itemStatus 
                v-for="(i) in item_data" :key="i._id"
                :item_id=i._id
                :item_name="i.name['zh-tw']"
                :max_quantity="i.quantity"
                />
            </v-row>
        </v-container>
    </v-sheet>
  </template>
  
<script setup>
    import { ref, onMounted } from 'vue'
    import {
    apiGetReserveSpaces,
    apiGetReserveItems
    } from '@/api';
    const option = ref('0');
    const space_data = ref();
    const item_data = ref();
    onMounted(async () => {
        const spaces = await apiGetReserveSpaces();
        space_data.value = spaces['data']['data'];
        const items = await apiGetReserveItems();
        item_data.value = items['data']['data'];
    })
</script>