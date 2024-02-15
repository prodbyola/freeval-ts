<template>
  <div class="freeval_layout">
    <h3 class="page__header">Welcome to Freeval Demo</h3>
    <p class="page__subtitle">
      Hey there! Thanks a bunch for giving the Freeval package a try! Kindly hit me up
      with your thoughts, criticisms, or wild applause. Let's see if it's as 'free' as it claims to
      be! 🚀
    </p>
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<style lang="scss" scoped>
.freeval_layout {
  max-width: 720px;
  
  .page__header {
    font-size: 1.875rem;
    text-align: center;
  }
  
  .page__subtitle {
    font-family: 'IBM Plex Serif', serif;
    font-size: 1.125rem;
  }
}
</style>
