<template>
	<v-app dark>
		<v-toolbar fixed app>
			<v-toolbar-title v-text="'MMO Game'"></v-toolbar-title>
			<v-spacer />
			<v-btn @click="registerModalState = !registerModalState">Регистрация</v-btn>
		</v-toolbar>
		<v-content>
			<v-container>
				<nuxt />
				<no-ssr>
					<v-dialog v-model="registerModalState" width="500">
						<register-form />
					</v-dialog>
				</no-ssr>
			</v-container>
		</v-content>
		<v-footer app>
			<v-spacer /><span>&copy; {{ new Date().getFullYear() }}</span><v-spacer />
		</v-footer>
	</v-app>
</template>

<script lang="ts" src="./default.ts"></script>
