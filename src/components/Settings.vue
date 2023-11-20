<script setup>
import Modal from "./Modal.vue"
import { useSettingsStore } from "../stores/settings"
import { storeToRefs } from "pinia"

const settings = useSettingsStore()
const { websites } = storeToRefs(settings)
</script>

<template>
    <Modal :modal-active="settings.active" @close="settings.close()">
        <div>
            <h2>Settings</h2>
            <p>Websites Enabled</p>
            <div class="checkboxContainer" v-for="website in websites">
                <input
                    :id="website.name"
                    v-model="website.active"
                    type="checkbox"
                />
                <label :for="website.name">{{ website.name }}</label>
            </div>
        </div>
    </Modal>
</template>

<style lang="less">
.checkboxContainer {
    display: flex;
    gap: 10px;
}
label {
    font-size: 12px;
}
</style>
