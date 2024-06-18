<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    color="blue-lighten-4"
  >
    <v-container>
      <v-row class="">
        <v-col class="v-col-12">

        </v-col>
        <v-col class="v-col-12">
          
        </v-col>
        <v-col class="v-col-12">
          <router-Link  to="/" class=""  > 
            <v-btn class="w-100 " @click="drawer = !drawer" >首頁</v-btn>
          </router-Link>
        </v-col>
        <v-col class="v-col-12 ">
          <router-link  to="/form" class="" >
            <v-btn class="w-100" @click="drawer = !drawer">表單</v-btn>
          </router-link>
        </v-col>
        <v-col class="v-col-12 ">
          <router-link  to="/timetable" class="">
            <v-btn class="w-100" @click="drawer = !drawer">時間表</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
      
      
      
  </v-navigation-drawer>
  <v-app-bar :elevation="10" flat color="primary" class="" v-if="width<=960" >
    <v-app-bar-title >
      <v-btn class="pa-0 ma-0 " @click.stop="drawer = !drawer" >
          <v-icon icon="mdi-format-list-bulleted" />
      </v-btn>
    </v-app-bar-title>
  </v-app-bar>
  <v-app-bar :elevation="10" max-width="960px" rounded="4" color="primary"  v-if="width>960" >
    <v-app-bar-title   >
      <router-link  class="pa-0 ma-0 " to="/">
        <v-btn  class="text-white">
          <v-icon icon="mdi-home" />
        </v-btn>
      </router-link>
      <router-link  class="pa-0 ma-0 " to="/form" >
        <v-btn  class="text-white">表單</v-btn>
      </router-link> 
      <router-link  class="pa-0 ma-0 " to="/timetable" >
        <v-btn  class="text-white">時間表</v-btn>
      </router-link>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
  import { useWindowSize } from '@vueuse/core'
  import { ref  } from 'vue'
  const { width, height } = useWindowSize()
  const drawer = ref(null)
</script>
