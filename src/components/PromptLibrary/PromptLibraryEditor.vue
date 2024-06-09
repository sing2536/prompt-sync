<script setup>
import Modal from "../Modal.vue"
import { usePromptLibraryStore } from "../../stores/promptLibrary"

const promptLibrary = usePromptLibraryStore()
</script>

<template>
    <Modal
        :modal-active="promptLibrary.editorActive"
        @close="promptLibrary.closeEditor()"
        width="600px"
    >
        <h1>Prompt Editor</h1>
        <form>
            <label>Name</label>
            <input type="text" v-model="promptLibrary.formName" v-focus />
            <label>Prompt</label>
            <textarea type="text" v-model="promptLibrary.formPrompt" />
        </form>
        <div class="form-actions">
            <button
                v-if="promptLibrary.editPromptIndex != null"
                class="red outline"
                @click="promptLibrary.remove()"
            >
                Delete
            </button>
            <button class="primary raised" @click="promptLibrary.save()">
                Save
            </button>
        </div>
    </Modal>
</template>

<style lang="less" scoped>
form {
    display: flex;
    flex-direction: column;

    input {
        margin-bottom: var(--gap-small);
    }

    textarea {
        height: 400px;
    }
}

.form-actions {
    margin-top: var(--gap-small);
    display: flex;
    justify-content: space-between;

    & > *:only-child {
        margin-left: auto;
    }
}
</style>
