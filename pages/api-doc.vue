<template>
    <div class="api-doc-page">
        <div :id="rootElementId"></div>
    </div>
</template>

<script lang="ts" src="./api-doc.ts"></script>

<style lang="stylus">
    .api-doc-page {
        padding: 2rem 0;
        background: white;
        min-height 100%;
    }
</style>