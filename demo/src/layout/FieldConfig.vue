<template>
  <div class="app_modal">
    <div class="app_modal__content">
      <div class="config_column" v-if="rules && rules.length">
        <template v-for="(rule, index) in rules" :key="index">
          <p>{{ rule.rule }}{{ rule.size ? '=' + rule.size : '' }}</p>
          <p v-if="rule.error">{{ rule.error }}</p>
        </template>
      </div>
      <div class="config_column"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useState } from '@/stores'

const appState = useState()
const rules = appState.currentFieldRules
</script>
<style lang="scss" scoped>
.app_modal {
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100vh;
  min-width: 100vh;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: #0000002a;

  .app_modal__content {
    padding: 2rem;
    height: 100%;
    width: 100%;
    background-color: white;
    display: flex;

    .config_column {
      width: 50%;
    }
  }
}
</style>
