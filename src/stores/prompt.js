import { ref } from "vue"
import { defineStore } from "pinia"

export const usePromptStore = defineStore("prompt", () => {
    const query = ref("")

    function ask(prompt) {
        if (!prompt && !query.value) return

        chrome.tabs?.getCurrent((tab) => {
            chrome.tabs?.sendMessage(tab.id, {
                action: "query",
                data: query.value || prompt,
            })
            query.value = ""
        })
    }

    function reset() {
        location.reload()
    }

    return { query, ask, reset }
})
