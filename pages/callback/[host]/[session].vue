<template>
    <div id="container">
    </div>
</template>
<script setup>

const route = useRoute()

import { onMounted } from 'vue';

onMounted(async ()=> {

    var result = await $fetch(`https://${route.params.host}/api/miauth/${route.params.session}/check`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({})
    })
    localStorage.setItem('token', result.token)
    localStorage.setItem('username', result.username)
    const knownAs = result.knownAs

})
</script>