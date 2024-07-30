<template>
    <v-sheet rounded="rounded" class="footer">
        <v-footer class="d-flex flex-column px-0 py-0">
            <div class="d-flex align-center w-100 px-4" style="background-color: #D6E6F2;">
                <div class="d-flex justify-space-between align-center w-100 pa-2" v-if="width > 320">
                    <img :src="cLogo" class="pa-0 ma-0" alt="Logo" style="max-height: 50px;" />
                    <div class="d-flex align-center">
                        <v-btn v-for="icon in icons" :key="icon.text" :href="icon.link"
                            class="text-subtitle-1 d-flex align-center" size="small" variant="plain" target="_blank">
                            <v-icon :icon="icon.icon" class="align-center bg-white rounded-circle pa-4" />
                        </v-btn>
                    </div>
                </div>
                <div class="d-flex flex-column align-center w-100 pa-2" v-else>
                    <img :src="cLogo" class="pa-0 ma-0" alt="Logo" style="max-height: 50px;" />
                    <div class="d-flex align-center">
                        <v-btn v-for="icon in icons" :key="icon.text" :href="icon.link"
                            class="text-subtitle-1 d-flex align-center" size="small" variant="plain" target="_blank">
                            <v-icon :icon="icon.icon" class="align-center bg-white rounded-circle pa-4" />
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-footer>
    </v-sheet>
</template>

<script setup>
import cLogo from '@/assets/(c).svg';
import { useWindowSize } from '@vueuse/core';
const { width } = useWindowSize();
const icons = [
    {
        icon: 'mdi-facebook',
        link: 'https://www.facebook.com/Utaipeisa2.0/?locale=zh_TW',
    },
    {
        icon: 'mdi-instagram',
        link: 'https://www.instagram.com/utaipei_sa/',
    },
    {
        icon: 'mdi-email',
        link: 'mailto:utsa@go.utaipei.edu.tw',
    },
];
</script>
