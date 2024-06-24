<template>
  <v-card color="grey-lighten-2">
    <v-container>
      <v-row>
        <v-col class="v-col-auto">
          <v-card title="基本資料" color="grey-lighten-1">
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="v-col-md-4 v-col-sm-6 v-col-12">
          <v-text-field :rules="[rules.required]" v-model="name" label="名字" />
        </v-col>
        <v-col class="v-col-md-4 v-col-sm-6 v-col-12">
          <v-text-field :rules="[rules.required]" v-model="org" label="申請單位" />
        </v-col>
        <v-col class="v-col-md-4 v-col-sm-6 v-col-12">
          <v-text-field :rules="[rules.required]" v-model="department" label="申請人系級" />
        </v-col>
        <v-col class="v-col-12">
          <v-text-field :rules="[rules.required]" v-model="email" label="email" />
        </v-col>
        <v-col class="v-col-12">
          <v-text-field :rules="[rules.required]" v-model="reason" label="借用理由" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
const name = defineModel('name')
const org = defineModel('org')
const department = defineModel('department')
const email = defineModel('email')
const reason = defineModel('reason')
  
const rules = {
  required: value => !!value || 'Field is required',
}
</script>