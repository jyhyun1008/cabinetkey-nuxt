<template>
    <div id="container">
        <div id="profile-cont">
            <div id="banner"><img :src=profileResult.bannerurl></div>
            <div id="avatar"><img :src=avatar></div>
            <div id="profile-text">
                <div id="name">{{ name }}</div>
                <div id="url"></div>
                <div id="username">@{{ profileResult.username }}</div>
                <div id="bio">{{ profileResult.bio }}</div>
            </div>
        </div>
        <h1>{{name}} 님의 창작물이에요!</h1>
        <div id="worlds-cont">
            <div class="nocontents" v-if="worldsNoteResult.length == 0">수상할 정도로 아무 것도 없습니다!</div>
            <div v-else v-for="(world, i) of worldsNoteResult" style="width: 100%;">
                <router-link :to="`/${route.params.username}/${world.text.split(' ')[0]}`" class="world-content">
                    <div class="world-banner"><img :src=worldsBannerArray[i]></div>
                    <div class="world-text">
                        <div class="world-title">{{worldsArray[i].title}}</div>
                        <div class="world-name">@{{worldsArray[i].user.username}}</div>
                        <div class="world-description">{{worldsArray[i].summary}}</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
const config = useRuntimeConfig()
import { marked } from 'marked';

const route = useRoute()

    var getProfileUrl = `/api/users/show`
    var getProfileParam = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            username: route.params.username
        })
    }

    var result = await $fetch(getProfileUrl, getProfileParam)
    var profileResult = result.rows[0]
    var avatar = profileResult.avatarurl
    var name = profileResult.knownname ? profileResult.knownname : profileResult.username

    var getWorldsNoteUrl = config.public.misskey+`/api/notes/search`
    var getWorldsNoteParam = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            limit: 100,
            query: 'cabinetKeySettings1'
            })
        }
    
    var worldsNoteResult = await $fetch(getWorldsNoteUrl, getWorldsNoteParam)

    var worldsArray = []
    var worldsBannerArray = []
    for await (var world of worldsNoteResult) {
        var pageId = world.text.split(' ')[0]

        var getWorldsUrl = config.public.misskey+`/api/pages/show`
        var getWorldsParam = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                    pageId: pageId,
                })
            }
        var worldsResult = await $fetch(getWorldsUrl, getWorldsParam)
        worldsArray.push(worldsResult)
        worldsBannerArray.push(worldsResult.eyeCatchingImage ? worldsResult.eyeCatchingImage.url : decodeURIComponent(profileResult.avatarUrl.split('?url=')[1].split('&')[0]))
    }

onMounted(async ()=> {
    document.querySelector('#url').innerHTML = '<span>'+location.href.split('//')[1]+'</span> <i class="hgi-stroke hgi-copy-01"></i>'

    document.querySelector('i.hgi-stroke').addEventListener('click', ()=>{
        copyToClipboard()
    })

    function copyToClipboard() {
        navigator.clipboard.writeText('https://'+document.querySelector('#url span').innerText).then(() => {
            alert("복사되었습니다.");
        })
    };
})

</script>
<style>
#profile-cont, #worlds-cont {
    width: 100%;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
  overflow: hidden;
}

#worlds-cont {
    display: flex;
    flex-direction: column;
    min-height: 100px;
    justify-content: center;
    align-items: center;
}

.world-content {
    width: 100%;
    color: inherit;
    text-decoration: none;
}

#banner, .world-banner {
    width: 100%;
    height: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

#banner > img, .world-banner > img {
    width: 100%;
    aspect-ratio: 1 / 1;
}

#avatar {
    position: relative;
    top: -64px;
    left: 10px;
    width: 128px;
    height: 64px;
}

#avatar > img {
    width: 128px;
    border-radius: 50%;
    height: 128px;
}

#profile-text, .world-text {
    padding: 10px;
    width: 100%;
}

</style>