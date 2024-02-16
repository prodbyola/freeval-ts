<template>
  <div class="app_modal">
    <div class="app_modal__content">
      <div class="config_column rules_column" v-if="rules && rules.length">
        <div class="rule_box" v-for="(rule, index) in rules" :key="index">
          <div class="rule_box__content">
            <p>
              <span class="bold_text">Rule:</span> {{ rule.rule
              }}{{ rule.size ? '=' + rule.size : '' }}
            </p>
            <p style="color: red" v-if="rule.error">
              <span class="bold_text">Error:</span> {{ rule.error }}
            </p>
          </div>
          <AppIcon name="close" color="#000000ac" />
        </div>
      </div>
      <div class="config_column config_form">
        <AppInput label="Rule" :options="rulekeys" v-model="newRule.rule" type="select" />
        <AppInput label="Error" v-model="newRule.error" />
        <AppInput
          v-if="lengthTypes.includes(newRule.rule as string)"
          label="Rule Size"
          v-model="newRule.size"
          type="number"
        />
        <AppButton label="Add Rule" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'

import { useState } from '@/stores'
import { reactive } from 'vue'
import { type ValidatorRule } from 'freeval/common'

const appState = useState()
const validator = appState.validator

const rules = validator.getFieldRules(appState.currentField)

const lengthTypes = ['len', 'min', 'max']
const rulekeys = ['required', 'email', 'password', 'number', ...lengthTypes]

const newRule = reactive<ValidatorRule>({
  rule: 'required'
})
</script>
<style lang="scss" scoped>
@use '../assets/variables' as vars;

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
    background-color: vars.$bg_color;
    display: flex;

    .config_column {
      width: 50%;
      padding: 24px;
    }

    .rules_column {
      background-color: #ffffff3d;
      backdrop-filter: blur(33px);
      background-blend-mode: overlay;
      border-radius: 4px;

      .rule_box {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        box-shadow: 0 10px 15px rgb(0 0 0 / 20%);
        padding: 16px 32px;
        border-radius: 8px;
        background-color: #ffffffb6;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
