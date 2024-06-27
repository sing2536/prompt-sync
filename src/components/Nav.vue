<script setup>
import { Icon } from '@iconify/vue';
import { usePromptStore } from '../stores/prompt';
import { useShareStore } from '../stores/share';
import QueryModal from './QueryModal.vue';
import { onMounted, ref } from 'vue';
import { useSettingsStore } from '../stores/settings';
import { usePromptLibraryStore } from '../stores/promptLibrary';

const prompt = usePromptStore()
const shareStore = useShareStore()
const settings = useSettingsStore()
const promptLibrary = usePromptLibraryStore()
const queryModal = ref(null);

onMounted(()=>{
  document.querySelector('textarea').focus()
})

chrome.runtime?.onMessage.addListener((msg) => {
  switch (msg?.action) {
    case 'focusPrompt':
      setTimeout(() => document.querySelector('textarea').focus(), 500);
      break;
  }
})
</script>

<template>
  <div class="nav-container">

    <div class="logo">PromptSync</div>

    <div class="center-container">

      <div class="prompt-actions">
        <div class="action" @click="promptLibrary.open()" v-tooltip="'Prompt Library'">
          <Icon icon="mdi:message-draw"/>
          <div class="new-tag">NEW</div>
        </div>
      </div>

      <div class="prompt-container">
        <textarea v-model="prompt.query" id="mainQuery" @keypress.enter.exact="prompt.ask()" @keydown.ctrl.space="prompt.reset()" rows="3" placeholder="Make sure you're logged in to all platforms first before using this extension.&#10CTRL+Space to reset chats.&#10Happy prompting!"></textarea>
        <div class="enlarge-button" @click="queryModal.open()" v-tooltip="'Enlarge'">
          <Icon icon="akar-icons:enlarge" />
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
        <div class="action mobile-hide" @click="shareStore.open()" v-tooltip="'Share app'">
          <Icon icon="ic:baseline-share" />
        </div>
        <a class="action mobile-hide" href="https://github.com/sing2536/prompt-sync" target="_blank" v-tooltip="'Github'">
          <Icon icon="mdi:github" />
        </a>
        <div class="action" @click="settings.open()" v-tooltip="'Settings'">
          <Icon icon="ic:round-settings" />
        </div>
      </div>
      
    </div>

    <QueryModal ref="queryModal"/>
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
    right: 12px;
    bottom: 2px;

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
  background-color: var(--color-background2);
  // background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
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
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--gap-small);
  font-size: 1.8em;

  .action {
    display: flex;
    border-radius: 50%;
    width: 40px;
    height: 40px;
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
  padding-right: 30px;
}

.new-tag {
  position: absolute;
  top: 6px;
  background: var(--color-red);
  color: var(--color-text);
  border-radius: 2px;
  padding: 4px 2px;
  font-size: 9px;
  font-weight: 800;
  line-height: 4px;
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
  .mobile-hide {
    display: none !important;
  }
}
</style>
