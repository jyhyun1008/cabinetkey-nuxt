<template>
    <div id="container">
        <div id="location-cont">
            <div id="banner"><img :src=bannerUrl></div>
            <div id="avatar" v-if="locationJSON.avatar"><img :src=locationJSON.avatar></div>
            <div id="location-text">
                <div id="title">장소 [{{ route.params.x}}, {{route.params.y }}]</div>
                <div id="url"></div>
                <div id="username"><a style="text-decoration: none; color: inherit;" :href=usernameHref>by @{{worldsResult.user.username}}</a></div>
                <div id="description">{{ locationJSON.description }}</div>
                <div class="character-list" v-for="years of Object.keys(locationJSON)">
                    <div class="list-title">{{ years.replace(',', '-') }}</div><div><a :href="`/${route.params.username}/${route.params.world}/location/${route.params.x}-${route.params.y}/${years}`">{{ locationJSON[years].name }}</a></div>
                </div>
            </div>
        </div>
        <h1>소속 캐비닛</h1>
        <div id="worlds-cont">
            <router-link :to="`/${route.params.username}/${route.params.world}`" class="world-content">
                <div class="world-banner"><img :src=bannerUrl></div>
                <div class="world-text">
                    <div class="world-title">{{worldsResult.title}}</div>
                    <div class="world-name">by @{{worldsResult.user.username}}</div>
                    <div class="world-description">{{description}}</div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';

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
        }),
    referrerPolicy: "unsafe-url"
    }
var worldsResult = await $fetch(getWorldsUrl, getWorldsParam)
var bannerUrl = worldsResult.eyeCatchingImage ? worldsResult.eyeCatchingImage.url : decodeURIComponent(worldsResult.user.avatarUrl.split('?url=')[1].split('&')[0])
var description = worldsResult.summary ? worldsResult.summary : ''
var usernameHref = '/'+worldsResult.user.username
var worldJSON = JSON.parse(worldsResult.content[0].text.split('```')[1])
var locationJSON = worldJSON.location[route.params.x+','+route.params.y]
console.log(locationJSON)

onMounted(async ()=> {
    document.querySelector('#url').innerText = location.href.split('//')[1]
})

</script>
<style>


</style>