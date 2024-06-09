<script setup>
import Modal from "../Modal.vue"
import { usePromptLibraryStore } from "../../stores/promptLibrary"

const promptLibrary = usePromptLibraryStore()
</script>

<template>
    <Modal
        :modal-active="promptLibrary.editorActive"
        @close="promptLibrary.closeEditor()"
    >
        <h2>Prompt Editor</h2>
        <form>
            <label>Name</label>
            <input type="text" v-model="promptLibrary.formName" />
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
    min-width: 600px;

    label {
        margin-bottom: var(--gap-xtiny);
    }

    input {
        margin-bottom: var(--gap-small);
    }

    textarea {
        height: 200px;
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
