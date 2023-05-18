<script setup>
import Modal from './Modal.vue';
import {useShareStore} from '../stores/share.js';
import { onActivated } from 'vue';
import { watch } from 'vue';

const share = useShareStore()

function copy() {
    const copyText =  document.querySelector('#shareLink')

    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    document.execCommand('copy')
}

function openLink() {
    window.open(share.link, '_blank')
}

watch(() => share.active, (val) => {
    if (val) setTimeout(() => copy(), 500);
})
</script>

<template>
    <Modal :modal-active="share.active" @close="share.close()">
        <div>
            <h2>Thanks for sharing!</h2>
            <p>Link should already be copied to your clipboard.</p>
            <input id="shareLink" type="text" :value="share.link">
            <button class="raised primary fill" @click="copy()">Copy</button>
            <button class="primary fill" @click="openLink()">Open</button>
        </div>
    </Modal>
</template>

<style lang="less" scoped>
input, button {
    margin-bottom: var(--gap-tiny);
}
</style>
