<template>
  <v-dialog
    width="75%"
    scrollable
    v-model="dialog_flag"
    @click:outside="click_confirm()"
  >
    <v-card>
      <v-card-title class="text-h4 pa-3">
        {{ props.dialog_title }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        {{ props.dialog_text }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="取消"
          variant="outlined"
          color="error"
          v-if="props.cancel_button_flag"
          @click="
            props.click_cancel();
            dialog_flag = false;
          "
        ></v-btn>
        <v-btn
          text="確認"
          variant="tonal"
          color="primary"
          @click="
            props.click_confirm();
            dialog_flag = false;
          "
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
const props = defineProps([
  'dialog_text',
  'dialog_title',
  'cancel_button_flag',
  'click_cancel',
  'click_confirm'
]);

const dialog_flag = defineModel('dialog_flag');
</script>
