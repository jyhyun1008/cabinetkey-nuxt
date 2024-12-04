<template>
    <div id="container">
        <h1>로그인</h1>
        <div>현재는 연합우주(미스키 계열) 로그인만 지원해요!</div>
        <div style="display: flex; gap: 12px;">
            <input id="instance-url" placeholder="peacht.art" @change="instanceNameChange($event)" />
            <div id="signin" @click="signIn(host, $event)" class="button">로그인!</div>
        </div>
    </div>
</template>
<script setup>

import { v4 as uuidv4 } from "uuid";
const config = useRuntimeConfig()
var host = ''

function instanceNameChange(e) {
    host = e.target.value
}

var result = await $fetch('/api/db')
console.log(result)

async function signIn(host) {
    console.log(host)
    const sessionId = uuidv4();
    var signInUrl = `https://${host}/miauth/${sessionId}?name=cabinetKey&callback=${location.host}/callback/${host}/${sessionId}&permission=write:notes`
    location.href = signInUrl
}

</script>