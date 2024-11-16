<template>
  <div id="app">
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
    font-family: 'IBMPlexSansKR';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'IBMPlexSansKR';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Bold.woff') format('woff');
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
  font-family: 'IBMPlexSansKR';
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

</style>