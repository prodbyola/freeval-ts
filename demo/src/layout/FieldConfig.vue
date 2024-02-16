<template>
  <div class="app_modal">
    <div class="app_modal__content">
      <div class="config_column rules_column" v-if="rules && rules.length">
        <div class="rule_box" v-for="(rule, index) in rules" :key="index">
          <div class="rule_box__content">
            <p><span class="bold_text">Rule:</span> {{ rule.rule }}{{ rule.size ? '=' + rule.size : '' }}</p>
            <p style="color: red;" v-if="rule.error"><span class="bold_text">Error:</span> {{ rule.error }}</p>
          </div>
          <AppIcon name="close" color="#000000ac" />
        </div>
      </div>
      <div class="config_column"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useState } from '@/stores'
import AppIcon from '@/components/AppIcon.vue';

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

    .rules_column {
      padding: 24px;
      background-color: #00000031;

      .rule_box {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        color: #000000ac;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 16px 32px;
        border-radius: 8px;
        background-color: white;
        margin-bottom: 16px;
      }
    }

  }
}
</style>
