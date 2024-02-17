<template>
  <div class="freeval_layout">
    <h3 class="page__header">Welcome to Freeval Demo</h3>
    <p class="page__subtitle subtitle_text">
      Hey there! Thanks a bunch for giving the Freeval package a try! Kindly hit me up
      with your thoughts, criticisms, or wild applause. Let's see if it's as 'free' as it claims to
      be! 🚀
    </p>
    <RouterView />
  </div>
  <FieldConfig v-if="appState.modal === 'config'" />
</template>
<script setup lang="ts">
import FieldConfig from './FieldConfig.vue';

import { RouterView } from 'vue-router'
import { useState } from '@/stores';

const appState = useState()
</script>
<style lang="scss" scoped>
.freeval_layout {
  max-width: 720px;
}
</style>
