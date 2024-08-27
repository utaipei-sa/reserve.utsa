<template>
    <v-container>
        <v-card flat color="grey" >
            <v-card-title style="color:#000;font-weight: bold;">
                {{ spaces_name }}
            </v-card-title>
            <v-sheet
            color="grey-lighten-1"
            rounded
            >
                <v-slide-group
                show-arrows
                >
                    <template v-slot:prev >
                        <v-btn class="h-100" color="grey-lighten-1" @click="prev()">
                            &lt;
                        </v-btn>
                    </template>
                    <template v-slot:next>
                        <v-btn class="h-100" color="grey-lighten-1" @click="next()">
                            &gt;
                        </v-btn>
                    </template>
                    <v-slide-group-item
                    v-for="(i, index) in datas"
                    :key="index"
                    >
                        <v-card
                        v-if="index % 3===0"
                        color="grey-lighten-1"
                        class="text-center"
                        >
                            {{ i.end_datetime }}
                            <v-chip variant="flat" :color=handle_color(datas[index].availability) class="w-100" style="max-height: 10px;"></v-chip>
                            <v-chip variant="flat" :color=handle_color(datas[index+1].availability) class="w-100" style="max-height: 10px;" ></v-chip>
                            <v-chip variant="flat" :color=handle_color(datas[index+2].availability) class="w-100" style="max-height: 10px;"></v-chip>
                        </v-card>
                    </v-slide-group-item>
                </v-slide-group>
            </v-sheet>
        </v-card>
</v-container>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import {
    apiGetReserveSpaceAvailableTime
} from '@/api';
import { useDateFormat } from '@vueuse/core';

const props = defineProps(['space_id','space_name']);
const space_id = props.space_id;
const spaces_name = props.space_name;
const datas = ref() ;
const start_datetime = ref(new Date());
const end_datetime = ref(new Date());
const currentTime = ref(new Date());
const Ncount = ref(0);
const Pcount = ref(0);
const Page = ref(0);

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

const next = async () => {
    if(Page.value >= 0) {
        const newStartDate = new Date(start_datetime.value);
        const newEndDate = new Date(end_datetime.value);
        Ncount.value++;
        newStartDate.setDate(newStartDate.getDate() + 10*Ncount.value);
        newEndDate.setDate(newEndDate.getDate() + 10*Ncount.value);
        await getData(
            useDateFormat(newStartDate, 'YYYY-MM-DDT08:00').value,
            useDateFormat(newEndDate, 'YYYY-MM-DDT22:00').value,
            true
        );
    }
    Page.value++;
    
}

const prev = async ()=>{
    Page.value--;
    if(Page.value <= 0) {
        const newStartDate = new Date(start_datetime.value);
        const newEndDate = new Date(end_datetime.value);
        Pcount.value++;
        newStartDate.setDate(newStartDate.getDate() - 10*Pcount.value)
        newEndDate.setDate(newEndDate.getDate() - 10*Pcount.value)
        await getData(
            useDateFormat(newStartDate, 'YYYY-MM-DDT08:00').value,
            useDateFormat(newEndDate, 'YYYY-MM-DDT22:00').value,
            false
        );
    }
    
}
const getData = async (start, end, NextFlag) =>{
    try{
    const response = await apiGetReserveSpaceAvailableTime({
    space_id: space_id,
    start_datetime: start,
    end_datetime: end,
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
    const newData = response['data'];
    if(NextFlag) datas.value = [...datas.value, ...newData];
    else datas.value=[...newData, ...datas.value]
    } catch (error) {
        console.error(error);
    }
}
</script>