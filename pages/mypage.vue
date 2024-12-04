<template>
    <div id="container">
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
const config = useRuntimeConfig()

onMounted(async ()=> {
    if (localStorage.getItem('token') && localStorage.getItem('username')) {
        location.href = '/' + localStorage.getItem('username')
    }
})

</script>
<style>
#profile-cont, #worlds-cont {
    width: 100%;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
  overflow: hidden;
}

#worlds-cont {
    display: flex;
    flex-direction: column;
    min-height: 100px;
    justify-content: center;
    align-items: center;
}

.world-content {
    width: 100%;
    color: inherit;
    text-decoration: none;
}

#banner, .world-banner {
    width: 100%;
    height: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

#banner > img, .world-banner > img {
    width: 100%;
    aspect-ratio: 1 / 1;
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

#profile-text, .world-text {
    padding: 10px;
    width: 100%;
}

</style>