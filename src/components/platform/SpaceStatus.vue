<template>
    <v-container class="">
        <v-card flat color="grey" >
            <v-row>
                <v-col>
                    <v-card-title style="color:#000;font-weight: bold;">
                    {{ spaces_name }}
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
                        v-if="index % 3===0"
                        color="grey-lighten-1"
                        class="text-center"
                        >
                            {{ i.end_datetime }}
                            <v-chip variant="flat" :color=handle_color(datas[index].availability) class="w-75" style="max-height: 10px;"></v-chip>
                            <v-chip variant="flat" :color=handle_color(datas[index+1].availability) class="w-75" style="max-height: 10px;" ></v-chip>
                            <v-chip variant="flat" :color=handle_color(datas[index+2].availability) class="w-75" style="max-height: 10px;"></v-chip>
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </v-card>
</v-container>
</template>
  
<script setup>
import { ref, onMounted , watch } from 'vue';
import {
    apiGetReserveSpaceAvailableTime
} from '@/api';
import { useDateFormat } from '@vueuse/core';
import DatePickerIcon from './DatePickerIcon.vue';

const props = defineProps(['space_id','space_name']);
const space_id = props.space_id;
const spaces_name = props.space_name;
const datas = ref() ;
const start_datetime = ref();
const end_datetime = ref();
const currentTime = ref();
const FirstFlag = ref(false);

const handle_color = (data)=>{
    return data === 1 ? "green" : "orange";
}

onMounted(async () => {
    try {
    currentTime.value = new Date();
    start_datetime.value = new Date();
    end_datetime.value = new Date();
    start_datetime.value.setDate(currentTime.value.getDate() - 10)
    end_datetime.value.setDate(currentTime.value.getDate() + 10)
    const response = await apiGetReserveSpaceAvailableTime({
    space_id: space_id,
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
    } catch (error) {
    console.error(error);
    }
})

watch(currentTime, async(newValue, oldValue) => {
    try {
        if(FirstFlag.value){
            console.log(start_datetime.value, end_datetime.value)
            start_datetime.value = new Date(newValue).setDate(newValue.getDate() - 14)
            end_datetime.value = new Date(newValue).setDate(newValue.getDate() + 15)
            console.log(start_datetime.value, end_datetime.value)
            const response = await apiGetReserveSpaceAvailableTime({
            space_id: space_id,
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
            //await getData(start_datetime.value, end_datetime.value);
        }else{
            FirstFlag.value = true;
        }
    } catch (error) {
    console.error(error);
    }   
    });
</script>