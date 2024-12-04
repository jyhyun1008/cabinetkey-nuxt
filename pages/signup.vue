<template>
    <div id="container">
        <h1>가입</h1>
        <div>현재는 연합우주(미스키 계열) 신규 가입만 지원해요!</div>
        <div>계정이 있으시다면 <a href="/signin">로그인</a> 해주세요.</div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <div id="instance-dupl" style="font-size: 0.8rem;">인스턴스 주소</div>
            <input id="instance-url" placeholder="example.moe" @change="instanceNameChange($event)" />
            <div id="handle-dupl" style="font-size: 0.8rem;">캐비닛키 유저 페이지 핸들</div>
            <input id="handle" placeholder="username" @change="handleChange($event)" />
            <div id="email-dupl" style="font-size: 0.8rem;">이메일</div>
            <input id="email" placeholder="username@example.com" @change="emailChange($event)" />
            <div id="signup" @click="signIn(host, $event)" class="button">가입하기!</div>
            <div style="font-size: 0.8rem;">캐비닛키 핸들 및 연결된 서버는 변경할 수 없어요.</div>
        </div>
    </div>
</template>
<script setup>

import { onMounted } from 'vue';

onMounted(async ()=> {
    if (localStorage.getItem('token') && localStorage.getItem('username')) {
        location.href = '/' + localStorage.getItem('username')
    }
})

import { v4 as uuidv4 } from "uuid";
const config = useRuntimeConfig()
var host = ''
var handle = ''
var email = ''
var isFill = [false, false, false]

function instanceNameChange(e) {
    host = e.target.value
    isFill[0] = true
}

function handleChange(e) {
    handle = e.target.value
    isFill[1] = true
}

function emailChange(e) {
    email = e.target.value
    isFill[2] = true
}

async function signIn(host) {
    if (isFill[0] && isFill[1] && isFill[2]) {
        let ifHandleDupl = await $fetch('/api/users/show', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username: handle
            })
        })
        let ifEmailDupl = await $fetch('/api/users/show-by-email', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            })
        })
        if (ifHandleDupl.rows) {
            document.querySelector('#handle-dupl').innerHTML = '캐비닛키 유저 페이지 핸들: <span style="color: var(--accent);"> 이미 누군가가 사용 중인 핸들이에요!</span>'
        }
        if (ifEmailDupl.rows) {
            document.querySelector('#email-dupl').innerHTML = '이메일: <span style="color: var(--accent);">이미 누군가가 사용 중인 메일 주소예요!</span>'
        } else if (!ifHandleDupl.rows) {
            localStorage.setItem('email', email)
            localStorage.setItem('handle', handle)
            const sessionId = uuidv4();
            localStorage.setItem('session', sessionId)
            localStorage.setItem('host', host)
            var signInUrl = `https://${host}/miauth/${sessionId}?name=cabinetKey&callback=${location.host}/callback/signup&permission=write:notes,read:account`
            location.href = signInUrl
        }
    } else {
        alert('모든 입력칸을 채워주세요.')
    }
}

</script>