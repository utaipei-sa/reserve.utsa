<template>
    <v-btn-toggle mandatory rounded="l" base-color="#c0c0c0" v-model="option">
        <v-btn>場地</v-btn>
        <v-btn>物品</v-btn>
        <v-btn>首頁</v-btn>
    </v-btn-toggle>
</template>
<script setup>
const option = defineModel('option');
</script>
