<template>
    <v-container class="h-100 w-100" style="align-content: center;">
        <div class="login-container">
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="email">帳號:</label>
                    <v-text-field type="text" v-model="email" required></v-text-field>
                </div>
                <div class="form-group">
                    <label for="password">密碼:</label>
                    <v-text-field type="password" v-model="password" required></v-text-field>
                </div>
                <v-btn>登入</v-btn>
            </form>
        </div>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
const email = ref('');
const passowrd = ref('');
</script>

<style scoped>
.aaa{
    
}
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {

    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: #000000 1px solid;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #1cc8df;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #349a72;
}
</style>