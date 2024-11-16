<template>
    <div id="container">
        <div id="world-cont">
            <div id="world-text">
                <div id="title-box"><span id="title">{{ songJSON.title }}</span> <span class="vis themesong">{{songJSON.artist}}</span></div>
                <div id="url"></div>
                <div id="username"><a style="text-decoration: none; color: inherit;" :href=usernameHref>by @{{ worldsResult.user.username }}</a></div>
                <div id="embedd" v-if="songHref"><iframe width="100%" :style=songStyle scrolling="no" frameborder="no" allow="autoplay" :src=songHref></iframe></div>
                <div id="description">{{ songJSON.description }}</div>
            </div>
        </div>
        <h1>가사</h1>
        <div id="songs-lyrics" class="box-cont">
            <div>{{songJSON.lyrics}}</div>
        </div>
        <h1>연관된 캐릭터</h1>
        <div v-if="songJSON.relatedTo" id="info-character">
            <div v-for="character of songJSON.relatedTo">
                <router-link :to="`/${route.params.username}/${route.params.world}/character/${character}`">
                    <img :src=worldJSON.character.list[character].avatar />
                    <div class="character-name">{{worldJSON.character.list[character].name}}</div>
                    <div class="character-category">{{worldJSON.character.category[worldJSON.character.list[character].category]}}</div>
                </router-link>
            </div>
        </div>
        <h1>사용된 작품</h1>
        <div v-if="notesResult.length > 0" id="works-content">
            <div class="box-cont" v-for="(note, i) of notesResult">
                <div style="background-color: var(--accent); color: white; width: 50px; text-align: center;">{{i+1}}</div>
                <router-link style="flex-grow: 1;" :to="`/${note.user.username}/${JSON.parse(note.text.split('```')[1]).url}`">
                    <div>{{note.cw.split('#')[0]}} <span class="vis" :class=note.visibility>{{note.visibility}}</span></div>
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
        }),
    referrerPolicy: "unsafe-url"
    }
var worldsResult = await $fetch(getWorldsUrl, getWorldsParam)
var worldJSON = JSON.parse(worldsResult.content[0].text.split('```')[1])
var songJSON = worldJSON.themeSong[route.params.songid-1]

var bannerUrl = worldsResult.eyeCatchingImage ? worldsResult.eyeCatchingImage.url : decodeURIComponent(worldsResult.user.avatarUrl.split('?url=')[1].split('&')[0])

var usernameHref = '/'+worldsResult.user.username
var songHref = ''
var songStyle= "height: 166px;"
if (songJSON.embed) {
    if (`${parseInt(songJSON.embed)}`==songJSON.embed) { //sc
        songHref = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${songJSON.embed}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`
    } else { //yt
        songHref = `https://www.youtube.com/embed/${songJSON.embed}`
        songStyle = "aspect-ratio: 16 / 9;"
    }
}

var getNotesUrl = config.public.misskey+`/api/notes/search-by-tag`
var getNotesParam = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
    },
    body: JSON.stringify({
            tag: 'cabinetKeyWorks',
            query: [['soundtrack/'+route.params.songid], [route.params.world]]
        })
    }
var notesResult = await $fetch(getNotesUrl, getNotesParam)

onMounted(async ()=> {
    document.querySelector('#url').innerText = location.href.split('//')[1]
})

</script>
<style>

img {
    width: 100%;
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

#world-text {
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