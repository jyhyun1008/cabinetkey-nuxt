<template>
    <div id="container">
        <div id="world-cont">
            <div id="banner"><img :src=bannerUrl></div>
            <div id="world-text">
                <div>
                    <span id="title">{{worldsResult.title}}</span>
                    <span>{{worldJSON.info.subTitle}}</span>
                </div>
                <div id="url"></div>
                <div id="username"><a style="text-decoration: none; color: inherit;" :href=usernameHref>by @{{worldsResult.user.username}}</a></div>
                <div id="description">{{ description }}</div>
            </div>
        </div>
        <div id="world-nav">
            <div class="world-nav-item highlighted" id="information"><div>정보</div></div>
            <div class="world-nav-item" id="works"><div>작품</div></div>
            <div class="world-nav-item" id="reference"><div>자료실</div></div>
        </div>
        <div id="information-content" style="display: flex;">
            <h1>기본정보</h1>
            <div class="box-cont" id="info-description"><div v-html=markedDescription></div></div>
            <h1>캐릭터</h1>
            <div class="box-cont" v-if="!worldJSON.character.list">등록된 캐릭터가 없습니다!</div>
            <div v-for="(category, j) of worldJSON.character.category">
                <div style="border-radius: 15px; background-color: var(--accent); color: white; width: 100%; padding: 5px; text-align: center; margin-bottom: 12px;">{{category}}</div>
                <div class="info-character">
                        <div v-for="(character, i) of worldJSON.character.list">
                            <router-link :to="`/${route.params.username}/${route.params.world}/character/${i}`" v-if="character.category == j">
                                <img :src=character.avatar />
                                <div class="character-name">{{character.name}}</div>
                            </router-link>
                        </div>
                </div>
            </div>
            <h1>장소</h1>
            <div class="box-cont" v-if="!Object.keys(worldJSON.location)">등록된 장소가 없습니다!</div>
            <div v-else>
                <div class="box-cont" id="maplabel" style="border-radius: 15px; background-color: var(--accent); color: white; width: 100%; padding: 5px; text-align: center; margin-bottom: 12px; justify-content: center;">마우스를 올려주세요</div>
                <div class="box-cont" style="gap:5px; display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; font-size: 0.7em; width: 100%;">
                    <div v-for="i in 11" class="worldrow" style="display: grid; grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; gap:5px; padding: 0; flex-grow: 1;">
                    <div v-if="i==1" v-for="j in 11" class="worldrowhead">
                        <div v-if="j==1" style="display: flex; flex-grow: 1; aspect-ratio: 1 / 1; align-items: center; justify-content: center; border-radius: 5px; background-color: var(--accent);"></div>
                        <div v-else style="display: flex; flex-grow: 1; aspect-ratio: 1 / 1; align-items: center; justify-content: center; border-radius: 5px; background-color: var(--accent);">{{ j-1 }}</div>
                    </div>
                    <div v-else v-for="j in 11" class="worldcol">
                        <div v-if="j==1" class="worldcolhead"  style="display: flex; flex-grow: 1; aspect-ratio: 1 / 1; align-items: center; justify-content: center; border-radius: 5px; background-color: var(--accent);">{{ i }}</div>
                        <a v-else-if="worldJSON.location[(i-2)+','+(j-2)]" :href="`/${route.params.username}/${route.params.world}/location/${i-2}-${j-2}`"><div :style="`background-image:url(${worldJSON.info.map})`" :id="`map-${i-2}-${j-2}`" style="display: flex; flex-grow: 1; aspect-ratio: 1 / 1; align-items: center; justify-content: center; border-radius: 5px; background-color: var(--accent);">{{ i-2 }}, {{ j-2 }}</div></a>
                        <div v-else :style="`background-image:url(${worldJSON.info.map})`" :id="`map-${i-2}-${j-2}`" style="display: flex; flex-grow: 1; aspect-ratio: 1 / 1; align-items: center; justify-content: center; border-radius: 5px; background-color: var(--accent);">{{ i-2 }}, {{ j-2 }}</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div id="works-content" style="display: none;">
            <h1>최신 작품</h1>
            <div class="box-cont" v-for="(note, j) of notesResult" style="margin-bottom: 20px;">
                <div style="background-color: var(--accent); color: white; width: 50px; text-align: center;">{{j+1}}</div>
                <router-link style="flex-grow: 1; max-width: calc(100% - 60px);" :to="`/${route.params.username}/${JSON.parse(note.text.split('```')[1]).url}`">
                    <div style="width: max-content;">[{{ worldJSON.works[parseInt(JSON.parse(note.text.split('```')[1]).url.split('/')[2])].title }}] {{note.cw.split('#')[0]}} <span class="vis" :class=note.visibility>{{note.visibility}}</span></div>
                </router-link>
            </div>
            <h1>시리즈 목록</h1>
            <div v-for="(workId, i) of worldJSON.works">
                <router-link style="flex-grow: 1;" :to="`/${route.params.username}/${route.params.world}/series/${i}`">
                    <div class="world-cont" style="margin-bottom: 20px;">
                        <div class="banner"><img :src=workId.bannerUrl?workId.bannerUrl:workId.avatar?workId.avatar:bannerUrl></div>
                        <div class="avatar"><img :src=workId.avatar?workId.avatar:bannerUrl></div>
                        <div class="world-text">
                            <div class="title">{{ workId.title }}</div>
                            <div class="description">{{ workId.description }}</div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div id="reference-content" style="display: none;">
            <h1 v-if="worldJSON.themeSong">테마송</h1>
            <div v-for="(songId, i) of worldJSON.themeSong" class="box-cont" style="margin-bottom: 20px;">
                    <div style="background-color: var(--accent); color: white; width: 50px; text-align: center;">{{i+1}}</div>
                <router-link style="flex-grow: 1; max-width: calc(100% - 60px);" :to="`/${route.params.username}/${route.params.world}/soundtrack/${i+1}`">
                    <div style="width: max-content;">{{songId.title}} <span class="vis themesong">{{songId.artist}}</span></div>
                </router-link>
            </div>
            <h1 v-if="worldJSON.references">관련 문헌</h1>
            <div v-for="(refId, i) of worldJSON.references">
                <router-link style="flex-grow: 1;" :to="`/${route.params.username}/${route.params.world}/library/${i}`">
                    <div class="world-cont" style="margin-bottom: 20px;">
                        <div class="banner"><img :src=refId.bannerUrl?refId.bannerUrl:refId.avatar?refId.avatar:bannerUrl></div>
                        <div class="avatar"><img :src=refId.avatar?refId.avatar:bannerUrl></div>
                        <div class="world-text">
                            <div class="title">{{ refId.title }}</div>
                            <div class="description">{{ refId.description }}</div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { marked } from 'marked';
const route = useRoute()

const config = useRuntimeConfig()
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
var worldJSON = JSON.parse(worldsResult.content[0].text.split('```')[1])
var markedDescription = marked.parse(worldJSON.info.description)

var usernameHref = '/'+worldsResult.user.username

var getNotesUrl = config.public.misskey+`/api/notes/search-by-tag`
var getNotesParam = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
    },
    body: JSON.stringify({
            limit: 10,
            tag: route.params.world,
        })
    }
var notesResult = await $fetch(getNotesUrl, getNotesParam)
        
onMounted(async ()=> {
    var currentYear

    document.querySelector('#url').innerHTML = '<span>'+location.href.split('//')[1]+'</span> <i class="hgi-stroke hgi-copy-01"></i>'

    document.querySelector('i.hgi-stroke').addEventListener('click', ()=>{
        copyToClipboard()
    })

    function copyToClipboard() {
        navigator.clipboard.writeText('https://'+document.querySelector('#url span').innerText).then(() => {
            alert("복사되었습니다.");
        })
    };

    document.querySelector('#information').addEventListener('click', ()=>{
        document.querySelector('#information').classList.add('highlighted')
        document.querySelector('#works').classList.remove('highlighted')
        document.querySelector('#reference').classList.remove('highlighted')
        document.querySelector('#information-content').setAttribute('style', 'display: flex;')
        document.querySelector('#works-content').setAttribute('style', 'display: none;')
        document.querySelector('#reference-content').setAttribute('style', 'display: none;')
    })

    document.querySelector('#works').addEventListener('click', ()=>{
        document.querySelector('#information').classList.remove('highlighted')
        document.querySelector('#works').classList.add('highlighted')
        document.querySelector('#reference').classList.remove('highlighted')
        document.querySelector('#information-content').setAttribute('style', 'display: none;')
        document.querySelector('#works-content').setAttribute('style', 'display: flex;')
        document.querySelector('#reference-content').setAttribute('style', 'display: none;')
    })

    document.querySelector('#reference').addEventListener('click', ()=>{
        document.querySelector('#information').classList.remove('highlighted')
        document.querySelector('#works').classList.remove('highlighted')
        document.querySelector('#reference').classList.add('highlighted')
        document.querySelector('#information-content').setAttribute('style', 'display: none;')
        document.querySelector('#works-content').setAttribute('style', 'display: none;')
        document.querySelector('#reference-content').setAttribute('style', 'display: flex;')
    })

    for (let i=0; i<10; i++) {
        for (let j=0; j<10; j++){
            document.querySelector(`#map-${i}-${j}`).addEventListener('mouseover', ()=> {
                document.querySelector('#maplabel').innerText = `[${i}, ${j}]`
                if (worldJSON.location[i+','+j]) {
                    if (currentYear) {
                        for (var key of Object.keys(worldJSON.location[i+','+j])) {
                            if (currentYear >= parseInt(key.split(',')[0]) && currentYear < parseInt(key.split(',')[1])) {
                                document.querySelector('#maplabel').innerText += ' '+worldJSON.location[i+','+j][key].name
                            }
                        }
                    } else {
                        document.querySelector('#maplabel').innerText += ' '+worldJSON.location[i+','+j][Object.keys(worldJSON.location[i+','+j])[Object.keys(worldJSON.location[i+','+j]).length - 1]].name
                    }
                }
            })
        }
    }

})

</script>
<style>

.box-cont img {
    border-radius: 10px;
}

.worldrow:nth-child(2) {
    --rowindex: 0;
}
.worldrow:nth-child(3) {
    --rowindex: 1;
}
.worldrow:nth-child(4) {
    --rowindex: 2;
}
.worldrow:nth-child(5) {
    --rowindex: 3;
}
.worldrow:nth-child(6) {
    --rowindex: 4;
}
.worldrow:nth-child(7) {
    --rowindex: 5;
}
.worldrow:nth-child(8) {
    --rowindex: 6;
}
.worldrow:nth-child(9) {
    --rowindex: 7;
}
.worldrow:nth-child(10) {
    --rowindex: 8;
}
.worldrow:nth-child(11) {
    --rowindex: 9;
}
.worldcol:nth-child(2) {
    --colindex: 0;
}
.worldcol:nth-child(3) {
    --colindex: 1;
}
.worldcol:nth-child(4) {
    --colindex: 2;
}
.worldcol:nth-child(5) {
    --colindex: 3;
}
.worldcol:nth-child(6) {
    --colindex: 4;
}
.worldcol:nth-child(7) {
    --colindex: 5;
}
.worldcol:nth-child(8) {
    --colindex: 6;
}
.worldcol:nth-child(9) {
    --colindex: 7;
}
.worldcol:nth-child(10) {
    --colindex: 8;
}
.worldcol:nth-child(11) {
    --colindex: 9;
}

.worldcol div {
    /*background-image: url('../assets/map.png');*/
    background-size: min(61vw, 61dvh) min(61vw, 61dvh);
    background-position-y: calc(calc(10 - var(--colindex)) * min(6vw, 6dvh));
    background-position-x: calc(calc(10 - var(--rowindex)) * min(6vw, 6dvh));
}

.worldcol:not(:first-child):hover {
    opacity: 0.5;
}

</style>