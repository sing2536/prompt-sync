<script setup>
import { Icon } from '@iconify/vue';
import { ref } from '@vue/reactivity';

const props = defineProps(['modalActive'])
const showContent = ref(false)
</script>

<template>
    <Transition name="fade" @enter="showContent = true">
        <!-- we use mousedown so input drags doesn't cause modal to close -->
        <div v-if="modalActive" class="modal-container" @mousedown="showContent = false">
            <Transition name="modal" @leave="$emit('close')">
                <div v-if="showContent" class="modal-wrapper" @mousedown.stop>
    
                    <div class="modal-header-actions">
                        <icon @click="showContent = false" icon="maki:cross"></icon>
                    </div>
    
                    <div class="modal-content">
                        <slot />
                    </div>
    
                    <div v-if="$slots.footer" class="modal-footer">
                        <slot name="footer" />
                    </div>
    
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<style lang="less" scoped>
.modal-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background-color: var(--mask-background)
}
.modal-wrapper {
    display: flex;
    flex-direction: column;
    background: var(--color-background2);
    gap: var(--gap-small);
    border-radius: var(--radius-normal);
    max-height: 95vh;
    margin: var(--gap-medium);
    position: relative;
}
.modal-header-actions {
    position: absolute;
    top: var(--gap-medium);
    right: var(--gap-medium);
    font-size: x-large;
    z-index: 2;

    :hover {
        cursor: pointer;
        color: var(--color-primary);
    }
}
.modal-content {
    padding: var(--gap-medium);
    overflow: auto;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: var(--gap-medium);
    padding-top: 0;
}

@media (max-width: 800px) {
    .modal-wrapper {
        margin: 0;
        height: 100vh;
        width: 100vw;
        max-height: 100%;
    }
}

.modal-enter-active, .modal-leave-active {
    transition: all 0.2s ease-in-out;
}
.modal-enter-from, .modal-leave-to {
    transform: scale(0.9);
    opacity: 0;
}

.fade-enter-active, .fade-leave-active {
    transition: all 0.2s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>