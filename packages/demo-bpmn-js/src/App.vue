<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const routes = router.getRoutes()

  const goToPage = (route) => {
    router.push(route)
  }
</script>

<template>
  <el-container class="container">
    <el-header class="header">
      <el-space wrap>
        <el-button v-for="r in routes" :key="r.path" type="primary" text @click="goToPage(r)">{{ r.name || r.path.replace('/', '') }}</el-button>
      </el-space>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
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
