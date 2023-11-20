import { ref, watch } from "vue"
import { defineStore } from "pinia"

export const useSettingsStore = defineStore("settings", () => {
    const active = ref(false)
    const websites = ref([
        {
            name: "OpenAI ChatGPT",
            active: true,
            src: "https://chat.openai.com/chat",
        },
        {
            name: "Bing Chat",
            active: true,
            src: "https://bing.com/chat",
        },
        {
            name: "Google Bard",
            active: true,
            src: "https://bard.google.com",
        },
    ])

    function open() {
        active.value = true
    }

    function close() {
        active.value = false
    }

    function loadSettings() {
        const savedSettings = JSON.parse(localStorage.getItem("websites"))
        if (savedSettings) {
            for (let savedSetting of savedSettings) {
                for (let website in websites.value) {
                    if (savedSetting.name == websites.value[website].name) {
                        websites.value[website].active = savedSetting.active
                    }
                }
            }
        }
    }

    watch(websites.value, () => {
        localStorage.setItem("websites", JSON.stringify(websites.value))
    })

    loadSettings()

    return { active, websites, open, close }
})
