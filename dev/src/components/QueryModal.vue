<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';
import { usePromptStore } from '../stores/prompt';
import { watch } from 'vue';

const prompt = usePromptStore()
const active = ref(false)

function open() {
    active.value = true
}

function send() {
    prompt.ask()
    active.value = false
}

watch(active, (v)=> {
 if (v) setTimeout(()=> document.querySelector('#enlargedQuery').focus(), 500)
})

defineExpose({ open })
</script>

<template>
    <Modal :modal-active="active" @close="active = false">
        <div class="modal-content">
            <h2>Enlarged Prompt</h2>
            <textarea id="enlargedQuery" v-model="prompt.query" @keydown.ctrl.enter="send()"></textarea>
            <button class="raised primary fill" @click="send()">Send</button>
        </div>
    </Modal>
</template>

<style lang="less" scoped>
@media (min-width: 800px) {
    .modal-content {
        width: 600px;
    }
}
textarea {
    resize: vertical;
    height: 70vh;
    margin-bottom: var(--gap-small);
}
</style>
