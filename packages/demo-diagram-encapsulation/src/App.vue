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
    <router-view />
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
</style>
