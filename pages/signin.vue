<template>
    <div id="container">
        <h1>로그인</h1>
        <div>현재는 연합우주(미스키 계열) 로그인만 지원해요!</div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <input id="instance-url" placeholder="peacht.art" @change="instanceNameChange($event)" />
            <div id="signin" @click="signIn(host, $event)" class="button">로그인!</div>
            <div style="font-size: 0.8rem;">계정이 없으시다면 <a href="/signup">가입</a>은 어떠세요?</div>
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

async function signIn(host) {
    const sessionId = uuidv4();
    localStorage.setItem('session', sessionId)
    localStorage.setItem('host', host)
    var signInUrl = `https://${host}/miauth/${sessionId}?name=cabinetKey&callback=${location.host}/callback/signin&permission=write:notes,read:account`
    location.href = signInUrl
}

</script>