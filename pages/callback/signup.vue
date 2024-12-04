<template>
    <div id="container">
    </div>
</template>
<script setup>

import { onMounted } from 'vue';

onMounted(async ()=> {
    const host = localStorage.getItem('host')
    const session = localStorage.getItem('session')
    const email = localStorage.getItem('email')
    const handle = localStorage.getItem('handle')

    var result = await $fetch(`https://${host}/api/miauth/${session}/check`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({})
    })
    const username = result.user.username
    const knownName = result.user.name ? result.user.name : username
    const avatarUrl = result.user.avatarUrl ? result.user.avatarUrl : ''
    const bannerUrl = result.user.bannerUrl ? result.user.bannerUrl : ''
    localStorage.clear()
    localStorage.setItem('token', result.token)
    localStorage.setItem('username', username)
    localStorage.setItem('host', host)

    var ifUserExists = await $fetch('/api/users/show-by-social-handle', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            socialHandle: `@${username}@${host}`
        })
    })
    if (ifUserExists.rows.length == 0) {
        try {
            await $fetch('/api/users/create', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    username: handle,
                    knownName: knownName,
                    socialType: 'fediverse',
                    socialHandle: `@${username}@${host}`,
                    email: email,
                    avatarUrl: avatarUrl,
                    bannerUrl: bannerUrl
                })
            })
        } catch(e) {
            alert('오류가 생겼어요. 입력값에 문제가 있을 수 있으니 확인해 주세요.')
        }
    } else {
        alert('이미 존재하는 계정입니다. 로그인해 주세요.')
        localStorage.clear()
        location.href='/signin'
    }

})
</script>