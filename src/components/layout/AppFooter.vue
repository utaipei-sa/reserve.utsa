<template>
    <v-sheet rounded="rounded" class="footer mt-12 flex-1">
        <v-footer class="d-flex flex-column px-0">
            <div class="d-flex flex-column align-center py-4 mx-0 w-100" style="background-color: #D6E6F2;">
                <strong class="text-h6 font-weight-bold text-center mb-2">聯絡我們</strong>
                <div class="d-flex flex-wrap justify-center">
                    <v-btn v-for="icon in icons" :key="icon.text" :href="icon.link"
                        class="text-subtitle-1 d-flex align-center" size="small" variant="plain" target="_blank">
                        <v-icon class="mr-2">{{ icon.icon }}</v-icon>
                        {{ icon.text }}
                    </v-btn>
                </div>
            </div>

            <div class="px-4 py-2 text-center w-100 ma-0" style="background-color: #F7FBFC;">
                {{ new Date().getFullYear() }} — <strong>UTSA</strong>
            </div>
        </v-footer>
    </v-sheet>
</template>

<script setup>
const icons = [
    {
        icon: 'mdi-facebook',
        link: 'https://www.facebook.com/Utaipeisa2.0/?locale=zh_TW',
        text: '學生會FB',
    },
    {
        icon: 'mdi-instagram',
        link: 'https://www.instagram.com/utaipei_sa/',
        text: '學生會IG',
    },
    {
        icon: 'mdi-email',
        link: 'mailto:utsa@go.utaipei.edu.tw',
        text: '學生會Email',
    },
];
</script>

<style scoped>
html,
body {
    height: 100%;
    margin: 0;
    background-color: #F7FBFC;
}
</style>