<script setup>
import Iframes from "./components/Iframes.vue"
import Nav from "./components/Nav.vue"
import PromptLibrary from "./components/PromptLibrary/PromptLibrary.vue"
import PromptLibraryEditor from "./components/PromptLibrary/PromptLibraryEditor.vue"
import Settings from "./components/Settings.vue"
import ShareModal from "./components/ShareModal.vue"
</script>

<template>
    <Nav />
    <Iframes />
    <PromptLibrary />
    <PromptLibraryEditor />
    <ShareModal />
    <Settings />
</template>
