<template>
    <div id="container">
        <h1>이 서버의 창작물이에요!</h1>
        <div v-if="worldsArray.length == 0" class="worlds-cont">
            <div class="nocontents">수상할 정도로 아무 것도 없습니다!</div>
        </div>
        <div v-else style="display: flex; gap: 20px; flex-direction: column;">
            <div v-for="(world, i) of worldsArray" style="width: 100%;" class="worlds-cont">
                <router-link :to="`/${world.user.username}/${world.id}`" class="world-content">
                    <div class="world-banner"><img :src=worldsBannerArray[i]></div>
                    <div class="world-text">
                        <div class="world-title">{{world.title}}</div>
                        <div class="world-name">@{{world.user.username}}</div>
                        <div class="world-description">{{world.summary}}</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
const config = useRuntimeConfig()

var getWorldsNoteUrl = config.public.misskey+`/api/notes/search`
var getWorldsNoteParam = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
    },
    body: JSON.stringify({
        limit: 100,
        query: 'cabinetKeySettings'
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
    console.log(JSON.parse(worldsResult.content[0].text.split('```')[1]))
    if (JSON.parse(worldsResult.content[0].text.split('```')[1]).info.vis == 'public') {
        worldsArray.push(worldsResult)
        worldsBannerArray.push(worldsResult.eyeCatchingImage ? worldsResult.eyeCatchingImage.url : decodeURIComponent(worldsResult.user.avatarUrl.split('?url=')[1].split('&')[0]))
    }
}

</script>
<style>
#profile-cont, #worlds-cont, .worlds-cont {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background-color: white;
    overflow: hidden;
}

#worlds-cont, .worlds-cont {
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