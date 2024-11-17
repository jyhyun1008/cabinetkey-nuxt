<template>
    <div id="container">
        <div id="character-cont">
            <div id="character-text">
                <div id="title-box"><span id="title">{{ noteResult.cw.split('#')[0] }}</span> <span class="vis" :class=noteResult.visibility >{{ noteResult.visibility }}</span></div>
                <div id="url"></div>
                <div id="username"><a style="text-decoration: none; color: inherit;" :href=usernameHref >by @{{worldsResult.user.username}}</a></div>
                <div v-if="songHref">BGM: <router-link :to="`/${route.params.username}/${route.params.world}/soundtrack/${songIndex}`" class="link-accent">{{worldJSON.themeSong[songIndex-1].title}}</router-link></div>
                <div id="embedd" v-if="songHref"><iframe width="100%" :style=songStyle scrolling="no" frameborder="no" allow="autoplay" :src=songHref></iframe></div>
                <div id="description" v-html="`${marked.parse(noteText)}`"></div>
            </div>
        </div>
        <div id="world-nav">
            <router-link v-if="parseInt(route.params.workid) > 1" class="world-nav-item" :to="`/${route.params.username}/${route.params.world}/series/${route.params.seriesid}/${parseInt(route.params.workid) - 1}`" style="text-decoration: none;"><div>이전</div></router-link>
            <router-link class="world-nav-item highlighted" :to="`/${route.params.username}/${route.params.world}/series/${route.params.seriesid}`" style="text-decoration: none;"><div>목록</div></router-link>
            <router-link v-if="parseInt(route.params.workid) < seriesJSON.contents.length" class="world-nav-item" :to="`/${route.params.username}/${route.params.world}/series/${route.params.seriesid}/${parseInt(route.params.workid) + 1}`" style="text-decoration: none;"><div>다음</div></router-link>
        </div>
        <h1>연관된 캐릭터</h1>
        <div v-if="noteJSON.relatedTo" id="info-character">
            <div v-for="character in noteJSON.relatedTo.filter(result => result.split('/')[1] == 'character')">
                <router-link :to="`/${route.params.username}/${character}`">
                    <img :src="`${worldJSON.character.list[character.split('/')[2]].avatar}`" />
                    <div class="character-name">{{worldJSON.character.list[character.split('/')[2]].name}}</div>
                    <div class="character-category">{{worldJSON.character.category[worldJSON.character.list[character.split('/')[2]].category]}}</div>
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

var bannerUrl = seriesJSON.eyeCatchingImage ? seriesJSON.eyeCatchingImage : worldsResult.eyeCatchingImage ? worldsResult.eyeCatchingImage.url : decodeURIComponent(worldsResult.user.avatarUrl.split('?url=')[1].split('&')[0])
var description = seriesJSON.description

var usernameHref = '/'+worldsResult.user.username

var noteId = seriesJSON.contents[route.params.workid - 1].link

var getNoteUrl = config.public.misskey+`/api/notes/show`
var getNoteParam = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
    },
    body: JSON.stringify({
        noteId: noteId,
    })
}
var noteResult = await $fetch(getNoteUrl, getNoteParam)
var note = noteResult.text.split('```')
var noteText = note[0]
var noteJSON = JSON.parse(note[1])

var songHref = ''
var songStyle= "height: 166px;"
var songIndex = 0

if (noteJSON.relatedTo && noteJSON.relatedTo.join('_').includes('soundtrack')) {
    songIndex = parseInt(noteJSON.relatedTo.join('_').split('soundtrack/')[1].split('_')[0])
    var songJSON = worldJSON.themeSong[songIndex-1]

    if (songJSON.embed) {
        if (`${parseInt(songJSON.embed)}`==songJSON.embed) { //sc
            songHref = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${songJSON.embed}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`
        } else { //yt
            songHref = `https://www.youtube.com/embed/${songJSON.embed}`
            songStyle = "aspect-ratio: 16 / 9;"
        }
    }
}

onMounted(async ()=> {
    document.querySelector('#url').innerText = location.href.split('//')[1]
})

</script>
<style scoped>

.link-accent {
    color: var(--accent);
    text-decoration: none;
}

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
    border-radius: 50%;
    height: 128px;
}

#character-cont, .box-cont, #world-nav {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background-color: white;
    overflow: hidden;
}

#character-cont {
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

#character-text {
    padding: 10px;
    width: 100%;
}

#title-box, #description {
    margin: 0.8em 0;
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

.world-nav-item {
    flex-grow: 1;
    display: flex;
    height:2em;
    align-items: center;
    color: inherit;
}

.world-nav-item.highlighted {
    background-color: var(--accent);
    color: white;
}

.world-nav-item > div {
    width: 100%;
    text-align: center;
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