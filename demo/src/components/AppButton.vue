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
  transparent?: boolean
  border?: boolean
}>()
</script>
<style lang="scss" scoped>
@use '../assets/variables' as vars;

.app_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 62px;
  background: v-bind('transparent ? "none" : "linear-gradient(#3D83FF, #236DDF)"');
  width: 100%;
  cursor: pointer;
  border-radius: 8px;
  border: v-bind('border ? "1px solid white" : "none"');

  p {
    color: white;
    text-transform: uppercase;
  }
}
</style>
