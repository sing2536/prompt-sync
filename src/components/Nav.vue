<script setup>
import { Icon } from '@iconify/vue';
import { usePromptStore } from '../stores/prompt';
import { useShareStore } from '../stores/share';
import QueryModal from './QueryModal.vue';
import { ref } from 'vue';

const prompt = usePromptStore()
const shareStore = useShareStore()
const queryModal = ref(null);

function github() {
  window.open('https://github.com/sing2536/prompt-sync', '_blank')
}

function share() {
  shareStore.open()
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
      <div class="prompt-container">
        <textarea v-model="prompt.query" id="mainQuery" @keydown.ctrl.enter="prompt.ask()" @keydown.ctrl.space="prompt.reset()" rows="3" placeholder="Make sure you're logged in to all platforms below before prompting.&#10CTRL+Enter to send prompt, CTRL+Space to reset chats.&#10Happy prompting!"></textarea>
        <div class="enlarge-button" @click="queryModal.open()" v-tooltip="'Enlarge'">
          <Icon icon="mdi:resize" />
        </div>
      </div>
  
      <div class="prompt-actions">
        <div class="action" @click="prompt.ask()" v-tooltip="'Send'">
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

    <QueryModal :active="expandQuery" ref="queryModal"/>
  </div>
</template>

<style lang="less" scoped>
.prompt-container {
  position: relative;
  display: flex;
  width: 600px;

  .enlarge-button {
    color: var(--color-text2);
    font-size: large;
    position: absolute;
    right: 8px;
    bottom: 0;

    &:hover {
      cursor: pointer;
      color: var(--color-primary);
    }
  }
}
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
  gap: var(--gap-small);
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
  font-size: 1.8em;

  .action {
    display: flex;
    border-radius: 50%;
    width: 44px;
    height: 44px;
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
  font-size: 1.6em;
  font-weight: 800;
  color: var(--color-text);
}

textarea {
  line-height: 18px;
  font-size: small;
  resize: none;
  padding: var(--gap-xtiny) var(--gap-tiny);
}

@media (max-width: 1200px) {
  .logo {
    display: none;
  }
}

@media (max-width: 950px) {
  .prompt-container {
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
