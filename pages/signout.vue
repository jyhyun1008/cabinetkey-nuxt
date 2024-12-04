<template>
    <div id="container">
    </div>
</template>
<script setup>

import { onMounted } from 'vue';

onMounted(async ()=> {
    localStorage.clear()
    location.href="/"
})
</script>