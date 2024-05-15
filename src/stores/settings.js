import { ref, watch } from "vue"
import { defineStore } from "pinia"

export const useSettingsStore = defineStore("settings", () => {
    const active = ref(false)
    const websites = ref([
        {
            name: "OpenAI ChatGPT",
            active: true,
            src: "https://chatgpt.com",
        },
        {
            name: "Bing Chat",
            active: true,
            src: "https://www.bing.com/chat",
        },
        {
            name: "Google Gemini",
            active: true,
            src: "https://Gemini.google.com",
        },
        // {
        //     name: "Claude AI",
        //     active: false,
        //     src: "https://claude.ai",
        // },
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
