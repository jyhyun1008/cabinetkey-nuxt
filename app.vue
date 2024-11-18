<template>
  <div id="app">
    <Head>
      <Title>CabinetKey 캐비닛키</Title>
      <Meta name="description" content="작품 설정 정리 사이트"/>
    </Head>
    <NuxtLayout>
      <div id="nav">
          <div id="logo"><a href="/">CabinetKey</a></div>
          <div id="nav-list">
            <div class="nav-item">About</div>
            <div class="nav-item" id="signin"></div>
          </div>
      </div>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>

export default {
    mounted() {
        if (localStorage.getItem('account')) {
            document.querySelector('#signin').innerHTML = `<strong><a href="/signout">Sign Out</a></strong> from ${localStorage.getItem('signinId')}`
        } else {
          document.querySelector('#signin').innerHTML = '<strong><a href="/signin">Sign In</a></strong>'
        }
    }
  }
</script>
<style>

@font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
}

:root {
  --accent: #3aebc1;
  --accent-light: #b6f2e6;
  --fg: #60606d;
  --border: #d7d7de;
  --bg: #f8f8fb;
}

div {
  box-sizing: border-box;
}

body {
  font-family: 'Pretendard';
  margin: 0;
  background-color: var(--bg);
  color: var(--fg);
  overscroll-behavior-x: none;
}

h1 {
  padding-left: 12px;
  border-left: 5px var(--accent) solid;
}

#nav {
  position:fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

#nav-list {
  display: flex;
  align-items: center;
}

#logo {
  font-weight: 700;
  padding: 0 20px;
  font-size: 1.2em;
  color: var(--accent);
}

#nav a {
  color: inherit;
  text-decoration: none;
}

.nav-item {
  padding: 0 20px;
}

#container {
  width: calc(100vw - 20px);
  max-width: 640px;
  margin: 100px auto 100px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.back {
  height: 2em;
}

#nuxt-devtools-container {
  display:none;
}

img {
    width: 100%;
}

#world-cont, .world-cont, #worlds-cont, #world-nav, .box-cont {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background-color: white;
    overflow: hidden;
}

.box-cont {
    display: flex;
    align-items: center;
    gap: 10px;
}

.avatar {
    position: relative;
    top: -64px;
    left: 10px;
    width: 96px;
    height: 64px;
}

.avatar > img {
    width: 96px;
    border-radius: 10px;
    height: 128px;
    object-fit: cover;
}

#character-cont, .box-cont, #info-character, .info-character {
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

.box-cont > div, #info-character > div, .info-character > div {
    padding: 10px;
}

#info-character, .info-character {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

#works-content a, .box-cont a, #info-character a, .info-character a, #worlds-cont a{
  color: inherit;
  text-decoration: none;
}

.box-cont img, #info-character img, .info-character img {
    border-radius: 10px;
}

#world-cont, .world-cont {
    display: flex;
    flex-direction: column;
    min-height: 100px;
    justify-content: center;
    align-items: flex-start;
}

.box-cont > div {
    padding: 10px;
}

.character-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 5px;
    max-width: 300px;
}

.character-list > div {
    text-align: center;
}

.character-list a {
    color: inherit;
    text-decoration: none;
}

.character-name {
    width: 100%;
    text-align: center;
}

.character-category {
    width: 100%;
    background-color: var(--accent);
    text-align: center;
    border-radius: 15px;
    padding: 5px;
    color: white;
}

#banner, .banner,.world-banner {
    width: 100%;
    height: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

#banner > img, .banner > img, .world-banner > img {
    width: 100%;
    aspect-ratio: 1 / 1;
}

#world-text, .world-text {
    padding: 10px;
    width: 100%;
}

#title {
    font-weight: 700;
    font-size: 2em;
}

.title, .world-title, #name {
    font-weight: 700;
    font-size: 1.5em;
}

#url {
    font-size: 0.7em;
    color: rgb(173, 173, 173);
    margin-top: 5px;
    margin-bottom: 5px;
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
}

.world-nav-item.highlighted {
    background-color: var(--accent);
    color: white;
}

.world-nav-item > div {
    width: 100%;
    text-align: center;
}

#information-content, #works-content, #reference-content {
    flex-direction: column;
}
#works-content a, #reference-content a, .box-cont a {
  color: inherit;
  text-decoration: none;
}

span.vis {
    padding: 4px;
    border-radius: 10px;
}

span.themesong {
    background-color: var(--accent);
    color: white;
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

#username, .world-name {
    margin-bottom: 10px;
}

</style>