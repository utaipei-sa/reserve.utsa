<template>
  <v-card
    elevation="0"
    color="#FFFFFF"
    class="mt-6 px-6"
    style="border-radius: 16px"
  >
    <v-container class="px-2">
      <v-row>
        <v-col class="v-col-auto">
          <v-card color="transparent" elevation="0" rounded="0">
            <v-card-title class="pb-0" style="border-bottom: 5px solid #e6f3ee"
              >基本資料</v-card-title
            >
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="v-col-md-4 v-col-sm-6 v-col-12">
          <v-text-field
            bg-color="transparent"
            :rules="[rules.required]"
            v-model="basic_info.name"
            label="名字"
            color="primary-2"
            variant="underlined"
          />
        </v-col>
        <v-col class="v-col-md-4 v-col-sm-6 v-col-12">
          <v-text-field
            bg-color="transparent"
            :rules="[rules.required]"
            v-model="basic_info.org"
            label="申請單位"
            color="primary-2"
            variant="underlined"
          />
        </v-col>
        <v-col class="v-col-md-4 v-col-sm-6 v-col-12">
          <v-text-field
            bg-color="transparent"
            :rules="[rules.required]"
            v-model="basic_info.department"
            label="申請人系級"
            color="primary-2"
            variant="underlined"
          />
        </v-col>
        <v-col class="v-col-12">
          <v-text-field
            bg-color="transparent"
            :rules="[rules.required]"
            v-model="basic_info.email"
            :disabled="edit_flag"
            label="email"
            color="primary-2"
            variant="underlined"
          />
        </v-col>
        <v-col class="v-col-12">
          <v-text-field
            bg-color="transparent"
            :rules="[rules.required]"
            v-model="basic_info.reason"
            label="借用理由"
            color="primary-2"
            variant="underlined"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
const basic_info = defineModel('basic_info');
const props = defineProps(['edit_flag']);
const rules = {
  required: (value) => !!value || 'Field is required'
};
</script>
