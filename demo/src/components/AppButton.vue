<template>
  <div class="app_btn">
    <p class="subtitle_text">
      {{ label }}
    </p>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
<style lang="scss" scoped>
@use '../assets/variables' as vars;

.app_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 62px;
  background-color: vars.$primary_color;
  width: 100%;
  cursor: pointer;
  border-radius: 8px;

  p {
    color: white;
    text-transform: uppercase;
  }
}
</style>
