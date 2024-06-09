<script setup>
import Modal from "../Modal.vue"
import PromptLibraryList from "./PromptLibraryList.vue"
import { usePromptLibraryStore } from "../../stores/promptLibrary"

const promptLibrary = usePromptLibraryStore()
</script>

<template>
    <Modal
        :modal-active="promptLibrary.active"
        @close="promptLibrary.close()"
        width="600px"
    >
        <h1>Prompt Library (Beta)</h1>
        <div v-if="!promptLibrary.prompts.length" class="empty-state-container">
            <h2>You're just a few clicks away from efficiency.</h2>
            <p>Create your first custom prompt and optimize your workflow.</p>
            <button class="primary raised" @click="promptLibrary.openEditor()">
                Create Prompt
            </button>
        </div>
        <PromptLibraryList v-else />
    </Modal>
</template>

<style lang="less" scoped>
.empty-state-container {
    margin-top: var(--gap-medium);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h3 {
        margin-bottom: var(--gap-xtiny);
    }

    button {
        margin-top: var(--gap-tiny);
    }
}
</style>
