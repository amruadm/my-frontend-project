<template>
	<v-container class="index-page">
		<v-btn v-if="false === showGameCanvas" large color="primary index-page__play" @click="showGameCanvas = !showGameCanvas">Играть</v-btn>
		<iframe v-if="showGameCanvas" src="/game/MMORPG.html" width="100%" height="100%"></iframe>
	</v-container>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus">
	.index-page {
		height: 100%;
		width 100%;
	}

	.index-page__play {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
