<script setup>
import { Icon } from '@iconify/vue';
import { usePromptStore } from '../stores/prompt';
import { useShareStore } from '../stores/share';

const prompt = usePromptStore()
const shareStore = useShareStore()

function github() {
  window.open('https://github.com/sing2536/prompt-sync', '_blank')
}

function share() {
  try {
    navigator.share({
      title: 'PromptSync',
      url: shareStore.link
    })
  } catch {
    shareStore.open()
  }
}

if (chrome.runtime) {
  chrome.runtime.onMessage.addListener((msg) => {
    switch (msg?.action) {
      case 'focusPrompt':
        setTimeout(() => document.querySelector('textarea').focus(), 500);
        break;
    }
  })
}
</script>

<template>
  <div class="nav-container">

    <div class="logo">PromptSync</div>

    <div class="center-container">
      <textarea v-model="prompt.query" @keydown.ctrl.enter="prompt.ask()" @keydown.ctrl.space="prompt.reset()" rows="3" placeholder="Make sure you're logged in to all platforms below before prompting.&#10CTRL+Enter to send prompt, CTRL+Space to reset chats.&#10Happy prompting!"></textarea>
  
      <div class="prompt-actions">
        <div class="action" @click="prompt.ask()" v-tooltip="'Send prompt'">
          <Icon icon="fluent:send-28-filled" />
        </div>
        <div class="action" @click="prompt.reset()" v-tooltip="'Reset chats'">
          <Icon icon="material-symbols:device-reset-rounded" />
        </div>
      </div>
    </div>

    <div class="end-container">
      <div class="prompt-actions">
        <div class="action" @click="share()" v-tooltip="'Share app'">
          <Icon icon="ic:baseline-share" />
        </div>
        <div class="action" @click="github()" v-tooltip="'Github'">
          <Icon icon="mdi:github" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.nav-container {
  display: flex;
  height: var(--nav-height);
  align-items: center;
  justify-content: space-evenly;
  background: var(--color-background);
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
  gap: var(--gap-medium);
  padding: 0 var(--gap-large);
}

.center-container {
  display: flex;
  gap: var(--gap-medium);
  flex: 1;
}

.end-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.prompt-actions {
  display: flex;
  align-items: center;
  gap: var(--gap-small);
  font-size: 2.2em;

  .action {
    display: flex;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
      color: var(--color-shade);
      background: var(--color-text);
    }
  }
}

.logo {
  flex: 1;
  font-size: 2em;
  font-weight: 900;
  color: var(--color-text);
}

textarea {
  width: 600px;
  resize: none;
}

@media (max-width: 1200px) {
  .logo {
    display: none;
  }
}

@media (max-width: 950px) {
  textarea {
    width: 100%;
  }

  .end-container {
    flex: 0;
  }
}

@media (max-width: 790px) {
  .nav-container{
    padding: 0 var(--gap-small);
  }
  .end-container {
    display: none;
  }
}
</style>
