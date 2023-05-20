<script setup>

</script>

<template>
    <div class="iframes-container">
        <iframe width="50%" src="https://chat.openai.com/chat" allow="clipboard-write" frameborder="0"></iframe>
        <iframe width="50%" src="https://bard.google.com/" allow="clipboard-write" frameborder="0"></iframe>
    </div>
</template>

<style lang="less" scoped>
.iframes-container {
    display: flex;
    height: calc(100vh - var(--nav-height));
}
</style>
