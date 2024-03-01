<script setup>
import { storeToRefs } from "pinia"
import { useSettingsStore } from "../stores/settings"

const settings = useSettingsStore()
const { websites } = storeToRefs(settings)
</script>

<template>
    <div class="iframes-container">
        <template v-for="website in websites">
            <iframe
                v-if="website.active"
                :width="100 / websites.filter((x) => x.active).length + '%'"
                :src="website.src"
                frameborder="0"
            ></iframe>
        </template>
    </div>
</template>

<style lang="less" scoped>
.iframes-container {
    display: flex;
    height: calc(100vh - var(--nav-height));
}
</style>
