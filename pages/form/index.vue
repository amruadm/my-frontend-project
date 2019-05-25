<template>
	<v-container>
		<v-layout>
			<v-flex xs12 md4>
				<v-text-field
						v-model="contact.firstName"
						:rules="rules.firstName"
						label="Имя"
				></v-text-field>
				<v-text-field
						v-model="contact.secondName"
						:rules="rules.secondName"
						label="Фамилия"
				></v-text-field>
				<v-text-field
						v-model="contact.email"
						:rules="rules.email"
						label="E-mail"
				></v-text-field>
				<v-text-field
						v-model="contact.phone"
						:rules="rules.phone"
						label="Телефон"
				></v-text-field>
				<v-select
						:items="genderLabels"
						item-text="label"
						item-value="id"
						v-model="contact.gender"
						label="Пол"
				></v-select>
				<v-btn large color="primary" @click="send">Отправить</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script lang="ts" src="./index.ts"></script>

<style scoped>

</style>
