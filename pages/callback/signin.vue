<template>
    <div id="container">
    </div>
</template>
<script setup>

import { onMounted } from 'vue';

onMounted(async ()=> {
    const host = localStorage.getItem('host')
    const session = localStorage.getItem('session')

    var result = await $fetch(`https://${host}/api/miauth/${session}/check`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({})
    })
    const username = result.user.username
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
        alert('해당 정보로 가입된 계정이 없습니다. 가입해주세요.')
        localStorage.clear()
        location.href='/signup'
    } else {
        localStorage.setItem('username', ifUserExists.rows[0].username)
        await $fetch('/api/users/update', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username: ifUserExists.rows[0].username
            })
        })
        location.href = '/mypage'
    }

})
</script>