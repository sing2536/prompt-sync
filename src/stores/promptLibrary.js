import { ref, watch } from "vue"
import { defineStore } from "pinia"

export const usePromptLibraryStore = defineStore("promptLibrary", () => {
    const active = ref(false)
    const editorActive = ref(false)
    const editPromptIndex = ref(null)
    const prompts = ref([])

    const formName = ref("")
    const formPrompt = ref("")

    function save() {
        const formData = {
            name: formName.value,
            prompt: formPrompt.value,
        }

        if (editPromptIndex.value != null) {
            prompts.value[editPromptIndex.value] = formData
        } else {
            prompts.value.push(formData)
        }

        closeEditor()
    }

    function remove() {
        prompts.value.splice(editPromptIndex.value, 1)

        closeEditor()
    }

    function open() {
        active.value = true
    }

    function openEditor(promptIndex) {
        if (promptIndex != undefined) {
            editPromptIndex.value = promptIndex

            formName.value = prompts.value[promptIndex].name
            formPrompt.value = prompts.value[promptIndex].prompt
        }

        editorActive.value = true
    }

    function close() {
        active.value = false
    }

    function closeEditor() {
        editPromptIndex.value = null
        editorActive.value = false

        formName.value = ""
        formPrompt.value = ""
    }

    async function loadPrompts() {
        const storage = await chrome.storage?.sync.get("prompts")

        if (storage.prompts) {
            prompts.value = storage.prompts
        }
    }

    async function savePrompts() {
        await chrome.storage?.sync.set({ prompts: [...prompts.value] })
    }

    watch(
        prompts,
        async () => {
            savePrompts()
        },
        { deep: true }
    )

    loadPrompts()

    return {
        active,
        editorActive,
        open,
        openEditor,
        close,
        closeEditor,
        prompts,
        remove,
        save,
        editPromptIndex,
        formName,
        formPrompt,
    }
})
