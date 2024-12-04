<template>
    <div id="container">
        <div class="box-cont">
            <form id="cabinet-create">
                <div id="title" style="margin-bottom: 10px;">새 캐비닛 생성하기</div>
                <div class="form-div">모든 정보는 추후 수정이 가능합니다.</div>
                <div class="form-div">
                    <span>캐비닛 제목</span><input id="cabinet-title" placeholder="한글/특문 OK">
                </div>
                <div class="form-div">
                    <span>캐비닛 부제목</span><input id="cabinet-subtitle" placeholder="한글/특문 OK">
                </div>
                <div class="form-div">
                    <span>공개 설정</span>
                    <select id="cabinet-vis">
                        <option value="public">메인에 공개</option>
                        <option value="private">프로필에만 공개</option>
                    </select>
                </div>
                <div class="form-div">
                    <span>배너</span><input id="cabinet-banner">
                </div>
                <div class="form-div">
                    <span>요약</span><input id="cabinet-summary" placeholder="짧은 요약. 마크다운 X">
                </div>
                <div style="margin: 10px 0;">기본 소개</div>
                <MdEditor v-model="text" style="margin-bottom: 10px;"/>
                <input type="button" value="생성하기">
            </form>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { marked } from 'marked';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const config = useRuntimeConfig()
const route = useRoute()
const text = ref('# Hello Editor');

onMounted(async ()=> {

})
</script>