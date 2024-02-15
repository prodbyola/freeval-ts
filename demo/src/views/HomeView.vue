<template>
  <main>
    <div class="freeval_page">
      <div class="freeval__form">
        <AppInput placeholder="Enter Field Value" label="Field One" autofocus />
        <AppInput placeholder="Enter Field Value" label="Field Two" />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import AppInput from '@/components/AppInput.vue';
</script>
<style lang="scss" scoped>
.freeval__form {
  max-width: 400px;
  margin: auto;
  padding-top: 44px;
}
</style>