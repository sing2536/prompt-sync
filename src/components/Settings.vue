<script setup>
import Modal from "./Modal.vue"
import { useSettingsStore } from "../stores/settings"
import { storeToRefs } from "pinia"

const settings = useSettingsStore()
const { websites } = storeToRefs(settings)
</script>

<template>
    <Modal
        :modal-active="settings.active"
        @close="settings.close()"
        width="500px"
    >
        <div>
            <h1>Settings</h1>
            <label class="label">Chats enabled</label>
            <div class="checkboxContainer" v-for="website in websites">
                <label :for="website.name">{{ website.name }}</label>
                <input
                    class="toggle"
                    :id="website.name"
                    v-model="website.active"
                    type="checkbox"
                />
            </div>
        </div>
    </Modal>
</template>

<style lang="less">
.checkboxContainer {
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: space-between;
    padding: var(--gap-tiny);
    border-bottom: 1px solid var(--color-shade2);

    &:hover {
        background: var(--color-shade2);
    }
}

.toggle {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 36px;
    height: 22px;
    display: inline-block;
    position: relative;
    border-radius: 50px;
    overflow: hidden;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: var(--color-shade);
    transition: background-color ease 0.3s;
}

.toggle:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 2;
    width: 18px;
    height: 18px;
    background: var(--color-text3);
    left: 2px;
    top: 2px;
    border-radius: 50%;
    font: 10px/28px Helvetica;
    text-transform: uppercase;
    font-weight: bold;
    text-indent: -22px;
    word-spacing: 37px;
    color: var(--color-primary);
    text-shadow: -1px -1px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
}

.toggle:checked {
    background-color: var(--color-primary);
}

.toggle:checked:before {
    left: 16px;
}
</style>
