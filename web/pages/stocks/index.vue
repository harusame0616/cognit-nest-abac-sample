<script setup lang="ts">
const { list, pending } = useStocks();
</script>

<template>
  <div>
    <h1>在庫一覧</h1>
    <menu
      ><li><NuxtLink to="/">Index </NuxtLink></li></menu
    >
    <div v-if="!pending">
      <ul>
        <li v-for="stock of list">{{ stock }}</li>
      </ul>
    </div>
  </div>
</template>
