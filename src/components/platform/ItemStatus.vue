<template>
    <v-container>
        <v-card flat color="grey" >
            <v-card-title style="color:#000;font-weight: bold;">
                {{ item_name }}
            </v-card-title>
            <v-sheet
            color="grey-lighten-1"
            rounded
            >
                <v-slide-group
                show-arrows
                :hasNext="Nflag"
                :hasPrev="Pflag"
                >

                </v-slide-group>
            </v-sheet>
        </v-card>
    </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { apiGetReserveItemAvailableTime } from '@/api';
import { useDateFormat } from '@vueuse/core';

const props = defineProps(['item_id','item_name']);
const item_id = props.item_id;
const item_name = props.item_name;
const start_datetime = ref(new Date());
const end_datetime = ref(new Date());
const currentTime = ref(new Date());
const datas = ref()

onMounted(async () => {
    try{
        currentTime.value = new Date();
        start_datetime.value = new Date();
        end_datetime.value = new Date();
        start_datetime.value.setDate(currentTime.value.getDate() - 15)
        end_datetime.value.setDate(currentTime.value.getDate() + 15)
        const response = await apiGetReserveItemAvailableTime({
        item_id: item_id,
        start_datetime: useDateFormat(
        start_datetime,
        'YYYY-MM-DDT08:00'
        ).value,
        end_datetime: useDateFormat(
        end_datetime,
        'YYYY-MM-DDT22:00'
        ).value,
        intervals: true
        });
        datas.value = response['data']
        console.log(datas.value);
    } catch(error) {
        console.error(error);
    }
});

</script>