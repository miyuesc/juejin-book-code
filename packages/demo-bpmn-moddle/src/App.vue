<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const routes = router.getRoutes()

  const goToPage = (route) => {
    router.push(route)
  }
</script>

<template>
  <div class="container">
    <div class="header h-[40px] p2">
      <n-button v-for="r in routes" :key="r.path" type="primary" @click="goToPage(r)">{{ r.name || r.path.replace('/', '') }}</n-button>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<style>
  html,
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    align-items: center;
  }
</style>
