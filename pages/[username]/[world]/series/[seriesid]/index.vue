<template>
    <div id="container">
        <div id="world-cont">
            <div id="banner"><img :src=bannerUrl></div>
            <div id="avatar-series"><img :src=avatar></div>
            <div id="world-text">
                <div id="title">{{ seriesJSON.title }}</div>
                <div id="url"></div>
                <div id="username"><a style="text-decoration: none; color: inherit;" :href=usernameHref>by @{{ worldsResult.user.username }}</a></div>
                <div id="description">{{ description }}</div>
            </div>
        </div>
        <div id="works-content">
            <div class="box-cont" v-for="(workContent, j) of seriesJSON.contents" style="margin-bottom: 20px;">
                <div style="background-color: var(--accent); color: white; width: 50px; text-align: center;">{{j+1}}</div>
                <router-link style="flex-grow: 1; max-width: calc(100% - 60px);" :to="`/${route.params.username}/${route.params.world}/series/${route.params.seriesid}/${j+1}`">
                    <div style="width: max-content;">{{workContent.title}} <span class="vis" :class=workContent.vis>{{workContent.vis}}</span></div>
                </router-link>
            </div>
        </div>
        <h1>소속 캐비닛</h1>
        <div id="worlds-cont">
            <router-link :to="`/${route.params.username}/${route.params.world}`" class="world-content">
                <div class="world-banner"><img :src=worldBannerUrl></div>
                <div class="world-text">
                    <div class="world-title">{{worldsResult.title}}</div>
                    <div class="world-name">by @{{worldsResult.user.username}}</div>
                    <div class="world-description">{{worldsResult.summary}}</div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { marked } from 'marked';

const config = useRuntimeConfig()
const route = useRoute()

var getWorldsUrl = config.public.misskey+`/api/pages/show`
var getWorldsParam = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
    },
    body: JSON.stringify({
            pageId: route.params.world,
        })
    }
var worldsResult = await $fetch(getWorldsUrl, getWorldsParam)
var worldJSON = JSON.parse(worldsResult.content[0].text.split('```')[1])
var seriesJSON = worldJSON.works[route.params.seriesid]

var avatar = seriesJSON.avatar ? seriesJSON.avatar : worldsResult.eyeCatchingImage ? worldsResult.eyeCatchingImage.url : decodeURIComponent(worldsResult.user.avatarUrl.split('?url=')[1].split('&')[0])
var bannerUrl = seriesJSON.eyeCatchingImage ? seriesJSON.eyeCatchingImage : avatar
var description = seriesJSON.description
console.log(seriesJSON)

var worldBannerUrl = worldsResult.eyeCatchingImage ? worldsResult.eyeCatchingImage.url : decodeURIComponent(worldsResult.user.avatarUrl.split('?url=')[1].split('&')[0])

var usernameHref = '/'+worldsResult.user.username

onMounted(async ()=> {
    document.querySelector('#url').innerText = location.href.split('//')[1]
})

</script>
<style scoped>

img {
    width: 100%;
}

#avatar-series {
    position: relative;
    top: -64px;
    left: 10px;
    width: 96px;
    height: 64px;
}

#avatar-series > img {
    width: 96px;
    border-radius: 10px;
    height: 128px;
    object-fit: cover;
}

.box-cont {
    display: flex;
    align-items: center;
    gap: 10px;
}

.box-cont > div {
    padding: 10px;
}

#banner  {
    width: 100%;
    height: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

#banner > img {
    width: 100%;
    aspect-ratio: 1 / 1;
}

#world-text, .world-text {
    padding: 10px;
    width: 100%;
}

#url {
    font-size: 0.7em;
    color: rgb(173, 173, 173);
}

#world-nav {
    display: flex;
    height: 2em;
    align-items: center;
}

#works-content {
    flex-direction: column;
}

#works-content a, .box-cont a {
  color: inherit;
  text-decoration: none;
}

span.vis {
    padding: 4px;
    border-radius: 10px;
}

span.public {
    background-color: var(--accent);
    color: white;
}

.box-cont img {
    border-radius: 10px;
}

</style>