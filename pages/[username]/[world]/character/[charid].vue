<template>
    <div id="container">
        <div id="character-cont">
            <div id="banner"><img :src=bannerUrl></div>
            <div id="avatar"><img :src=characterJSON.avatar></div>
            <div id="character-text">
                <div id="title">{{ characterJSON.name }}</div>
                <div id="url"></div>
                <div id="username"><a style="text-decoration: none; color: inherit;" :href=usernameHref>by @{{worldsResult.user.username}}</a></div>
                <div class="character-list" v-if="characterJSON.meaning">
                    <div class="list-title">이름의 유래</div><div>{{ characterJSON.meaning }}</div>
                </div>
                <div class="character-list" v-for="nickname of Object.keys(characterJSON.nickname)">
                    <div class="list-title">{{ nickname }}</div><div>{{ characterJSON.nickname[nickname] }}</div>
                </div>
                <div class="character-list" v-if="characterJSON.birthday">
                    <div class="list-title">생일</div><div>{{ characterJSON.birthday }}</div>
                </div>
                <div class="character-list" v-if="characterJSON.lived">
                    <div class="list-title">생몰년</div><div>{{ characterJSON.lived[0] }} - {{ characterJSON.lived[1] }}</div>
                </div>
                <div id="description" v-html="`${marked.parse(characterJSON.description)}`"></div>
            </div>
        </div>
        <h1 v-if="characterJSON.themeSong">이 캐릭터의 테마송</h1>
        <div v-for="(song, i) of characterJSON.themeSong" class="box-cont">
            <div style="background-color: var(--accent); color: white; width: 50px; text-align: center;">{{i+1}}</div>
            <router-link style="flex-grow: 1;" :to="`/${route.params.username}/${route.params.world}/soundtrack/${song+1}`">
                <div>{{worldJSON.themeSong[song].title}} <span class="vis themesong">{{worldJSON.themeSong[song].artist}}</span></div>
            </router-link>
        </div>
        <h1>연관된 캐릭터</h1>
        <div v-for="category of Object.keys(characterJSON.relatedTo)">
            <div style="border-radius: 15px; background-color: var(--accent); color: white; width: 100%; padding: 5px; text-align: center; margin-bottom: 12px;">{{category}}</div>
            <div v-for="character of characterJSON.relatedTo[category]" class="info-character">
                <div>
                    <router-link :to="`/${route.params.username}/${route.params.world}/character/${character}`">
                        <img :src=worldJSON.character.list[character].avatar />
                        <div class="character-name">{{worldJSON.character.list[character].name}}</div>
                        <div class="character-category">{{worldJSON.character.category[worldJSON.character.list[character].category]}}</div>
                    </router-link>
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
var bannerUrl = worldsResult.eyeCatchingImage ? worldsResult.eyeCatchingImage.url : decodeURIComponent(worldsResult.user.avatarUrl.split('?url=')[1].split('&')[0])
var description = worldsResult.summary ? worldsResult.summary : ''
var usernameHref = '/'+worldsResult.user.username
var worldJSON = JSON.parse(worldsResult.content[0].text.split('```')[1])
var characterJSON = worldJSON.character.list[route.params.charid]
console.log(characterJSON)

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

#character-cont {
    display: flex;
    flex-direction: column;
    min-height: 100px;
    justify-content: center;
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

#character-text {
    padding: 10px;
    width: 100%;
}

#url {
    font-size: 0.7em;
    color: rgb(173, 173, 173);
}

span.vis {
    padding: 4px;
    border-radius: 10px;
}

span.public {
    background-color: var(--accent);
    color: white;
}

.list-title {
    background-color: var(--accent);
    color: white;
    border-radius: 10px;
}

</style>