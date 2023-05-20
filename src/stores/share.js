import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useShareStore = defineStore('share', () => {
  const active = ref(false)
  const link = ref('https://chrome.google.com/webstore/detail/promptsync/inidphchdjjbmjlacjlkjlopllbidljk')

  function open() {
    active.value = true
  }

  function close() {
    active.value = false
  }

  return { active, link, open, close }
})
