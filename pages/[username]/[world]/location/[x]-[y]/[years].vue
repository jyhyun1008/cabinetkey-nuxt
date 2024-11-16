<template>
    <div id="container">
        <div id="location-cont">
            <div id="banner"><img :src=bannerUrl></div>
            <div id="avatar" v-if="locationJSON.avatar"><img :src=locationJSON.avatar></div>
            <div id="location-text">
                <div id="title">{{ locationJSON.name }}</div>
                <div id="url"></div>
                <div id="username"><a style="text-decoration: none; color: inherit;" :href=usernameHref>by @{{worldsResult.user.username}}</a></div>
                <div id="description" v-html="`${marked.parse(locationJSON.description)}`"></div>
            </div>
        </div>
        <h1>연관된 캐릭터</h1>
        <div v-if="locationJSON.relatedTo" id="info-character">
            <div v-for="character of locationJSON.relatedTo">
                <router-link :to="`/${route.params.username}/${route.params.world}/character/${character}`">
                    <img :src=worldJSON.character.list[character].avatar />
                    <div class="character-name">{{worldJSON.character.list[character].name}}</div>
                    <div class="character-category">{{worldJSON.character.category[worldJSON.character.list[character].category]}}</div>
                </router-link>
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
        })
    }
var worldsResult = await $fetch(getWorldsUrl, getWorldsParam)
var bannerUrl = worldsResult.eyeCatchingImage ? worldsResult.eyeCatchingImage.url : decodeURIComponent(worldsResult.user.avatarUrl.split('?url=')[1].split('&')[0])
var description = worldsResult.summary ? worldsResult.summary : ''
var usernameHref = '/'+worldsResult.user.username
var worldJSON = JSON.parse(worldsResult.content[0].text.split('```')[1])
var locationJSON = worldJSON.location[route.params.x+','+route.params.y][route.params.years]
console.log(locationJSON)

onMounted(async ()=> {
    document.querySelector('#url').innerText = location.href.split('//')[1]
})

</script>
<style>

img {
    width: 100%;
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
    border-radius: 30px;
    height: 128px;
}

#username, .world-name {
    margin-bottom: 10px;
}

#location-cont, .box-cont {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background-color: white;
    overflow: hidden;
}

#location-cont {
    display: flex;
    flex-direction: column;
    min-height: 100px;
    justify-content: center;
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

#location-text {
    padding: 10px;
    width: 100%;
}

#url {
    font-size: 0.7em;
    color: rgb(173, 173, 173);
}

#info-location {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
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

.location-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 5px;
    max-width: 300px;
}

.location-list > div {
    text-align: center;
}

.list-title {
    background-color: var(--accent);
    color: white;
    border-radius: 10px;
}

</style>