<template>
    <v-container class="register-form">
        <v-layout>
            <v-flex xs12>
                <div v-if="RegisterFormState.Wait === formState" class="text-xs-center">
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </div>
                <template v-else-if="RegisterFormState.Write === formState">
                    <v-text-field
                            v-model="formData.login"
                            :rules="rules.login"
                            label="Имя пользователя"
                    ></v-text-field>
                    <v-text-field
                            v-model="formData.password"
                            :rules="rules.password"
                            label="Пароль"
                            type="password"
                    ></v-text-field>
                    <v-text-field
                            v-model="confirmPassword"
                            :rules="rules.confirm"
                            label="Подтвердите пароль"
                            type="password"
                    ></v-text-field>
                    <v-text-field
                            v-model="formData.email"
                            :rules="rules.email"
                            label="E-mail"
                    ></v-text-field>
                    <v-btn large color="primary" @click="send">Зарегистрироваться</v-btn>
                </template>
                <div v-else-if="RegisterFormState.Success === formState" class="text-xs-center">
                    <span>Да здравствует {{formData.login}}! Наш новый герой!</span>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts" src="./register-form.ts"></script>

<style lang="stylus">
    .register-form {
        background: #47494e;
    }
</style>