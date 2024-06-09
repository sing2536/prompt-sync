<script setup>
import { Icon } from "@iconify/vue"
import { usePromptLibraryStore } from "../../stores/promptLibrary"
import { usePromptStore } from "../../stores/prompt"

const promptLibrary = usePromptLibraryStore()
const promptStore = usePromptStore()

function selectPrompt(prompt) {
    promptStore.ask(prompt)

    promptLibrary.close()
}
</script>

<template>
    <div>
        <p>Select a prompt to add to your conversations.</p>
        <div class="add-button">
            <button
                class="primary dense outline"
                @click="promptLibrary.openEditor()"
            >
                <Icon icon="subway:add" />New Prompt
            </button>
        </div>
        <table>
            <tr>
                <th class="name">Name</th>
                <th></th>
                <!-- <th></th> -->
            </tr>
            <tr
                class="options"
                v-for="(prompt, promptIndex) in promptLibrary.prompts"
                @click="selectPrompt(prompt.prompt)"
            >
                <td>
                    {{ prompt.name }}
                </td>
                <td
                    class="action"
                    @click.stop="promptLibrary.openEditor(promptIndex)"
                    v-tooltip="'Edit'"
                >
                    <Icon icon="lucide:edit" />
                </td>
                <!-- <td class="action" v-tooltip="'Reposition'">
                    <Icon icon="ic:baseline-drag-indicator" />
                </td> -->
            </tr>
        </table>
    </div>
</template>

<style lang="less" scoped>
.add-button {
    margin-bottom: var(--gap-tiny);
}
table {
    border-collapse: collapse;
}
th {
    text-align: left;
    font-weight: bold;
    text-transform: uppercase;
}

td,
th {
    padding: var(--gap-tiny);
    border-bottom: 1px solid var(--color-shade2);
}

tr {
    line-height: var(--gap-medium);
}

tr.options:hover {
    cursor: pointer;
    background: var(--color-shade2);
}

td.action {
    text-align: center;
    padding: 0 var(--gap-tiny);

    &:hover {
        color: var(--color-primary);
    }
}

.name {
    width: 100%;
}
</style>
