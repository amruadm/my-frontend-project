<template>
    <v-container class="login-form">
        <v-layout>
            <v-flex xs12>
                <div v-if="LoginFormState.Authenticate === state" class="text-xs-center">
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </div>
                <template v-else-if="LoginFormState.Login === state">
                    <v-text-field
                            v-model="creditinals.username"
                            :rules="rules.username"
                            label="Имя пользователя"
                    ></v-text-field>
                    <v-text-field
                            v-model="creditinals.password"
                            :rules="rules.password"
                            label="Пароль"
                            type="password"
                    ></v-text-field>
                    <v-btn large color="primary" @click="login">Войти</v-btn>
                </template>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script src="./login-form.ts" lang="ts"></script>

<style lang="stylus">
    .login-form {
        background: #47494e;
    }
</style>