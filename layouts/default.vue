<template>
	<v-app dark>
		<v-toolbar fixed app>
			<v-toolbar-title v-text="'MMO Game'"></v-toolbar-title>
			<v-spacer />
			<v-btn @click="onMainPageClick">Главная</v-btn>
			<v-btn v-if="isAdmin" @click="onApiDocClick">API</v-btn>
			<v-btn v-if="isGuest" @click="registerModalState = !registerModalState">Регистрация</v-btn>
			<v-btn v-if="isGuest" @click="loginModalState = !loginModalState">Вход</v-btn>
			<span v-if="false === isGuest">{{username}}</span>
			<v-btn v-if="false === isGuest" @click="logout">Выход</v-btn>
		</v-toolbar>
		<v-content class="py-0">
			<nuxt />
			<no-ssr>
				<v-dialog v-model="registerModalState" width="500">
					<register-form @onSuccess="onRegistered" />
				</v-dialog>
			</no-ssr>
			<no-ssr>
				<v-dialog v-model="loginModalState" width="500">
					<login-form @onSuccess="onLogin" @onError="onLoginError" />
				</v-dialog>
			</no-ssr>
			<no-ssr>
				<v-snackbar
						v-model="showUpperMessage"
						:timeout="6000"
						:color="upperMessageType"
						:top="true"
				>
					{{ upperMessageText }}
					<v-btn
							color="pink"
							flat
							@click="showUpperMessage = false"
					>
						ОК
					</v-btn>
				</v-snackbar>
			</no-ssr>
		</v-content>
		<v-footer app>
			<v-spacer /><span>&copy; {{ new Date().getFullYear() }}</span><v-spacer />
		</v-footer>
	</v-app>
</template>

<script lang="ts" src="./default.ts"></script>
