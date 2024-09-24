<template>
    <v-container class="">
        <v-card flat color="grey" >
            <v-row>
                <v-col>
                    <v-card-title style="color:#000;font-weight: bold;">
                        {{ item_name }}
                    </v-card-title>
                </v-col>
                <v-col></v-col>
                <v-col>
                    <DatePickerIcon
                    v-model:date_input="currentTime"
                    ></DatePickerIcon>
                </v-col>
            </v-row>
            <v-sheet
            color="grey-lighten-1"
            rounded
            >
                <v-slide-group
                show-arrows
                >
                    <v-slide-item
                    v-for="(i, index) in datas"
                    :key="index"
                    >
                        <v-card
                        color="grey-lighten-1"
                        class="text-center"
                        style="overflow: visible; position: static;"
                        >
                            {{ i.end_datetime }}
                            <v-chip 
                            variant="flat" 
                            :color=handle_color(max_quantity-i.available_quantity)  
                            style="width:95%;max-height: 10px;min-width: 100px;left:50%;"
                            ></v-chip>
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </v-card>
    </v-container>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { apiGetReserveItemAvailableTime } from '@/api';
import { useDateFormat } from '@vueuse/core';
import DatePickerIcon from './DatePickerIcon.vue';

const props = defineProps(['item_id','item_name','max_quantity']);
const item_id = props.item_id;
const item_name = props.item_name;
const max_quantity = props.max_quantity;
const start_datetime = ref();
const end_datetime = ref();
const currentTime = ref();
const datas = ref()
const FirstFlag = ref(false);

onMounted(async () => {
    try{
        currentTime.value = new Date();
        start_datetime.value = new Date();
        end_datetime.value = new Date();
        start_datetime.value.setDate(currentTime.value.getDate() - 14)
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
        response.data.forEach(item => {
                        item.start_datetime = useDateFormat(
                            new Date(item.start_datetime),
                            'MM/DD'
                        ).value;
                        item.end_datetime = useDateFormat(
                            new Date(item.end_datetime),
                            'MM/DD'
                        ).value;
                    });
        datas.value = response['data']
    } catch(error) {
        console.error(error);
    }
});

const handle_color = (data)=>{
    return data >= max_quantity/2 ? data==max_quantity? 'red' : 'orange' : 'green'
}

watch(currentTime, async(newValue) => {
    try {
        if(FirstFlag.value){
            start_datetime.value = new Date(newValue).setDate(newValue.getDate() - 14)
            end_datetime.value = new Date(newValue).setDate(newValue.getDate() + 15)
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
            response.data.forEach(item => {
                        item.start_datetime = useDateFormat(
                            new Date(item.start_datetime),
                            'MM/DD'
                        ).value;
                        item.end_datetime = useDateFormat(
                            new Date(item.end_datetime),
                            'MM/DD'
                        ).value;
                    });
            datas.value=response['data'];
        }else{
            FirstFlag.value = true;
        }
    } catch (error) {
    console.error(error);
    }   
    });
</script>