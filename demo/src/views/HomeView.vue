<template>
  <main>
    <div class="freeval_page">
      <div class="freeval__form">
        <AppInput
          v-model="data.field1"
          placeholder="Enter Field Value"
          label="Field One"
          :errors="validator.getErrors('field1')"
          @focus="validator.clearFieldErrors('field1')"
          autofocus
        >
          <template v-slot:append>
            <AppIcon name="settings" color="grey" @click="showConfig('field1')" />
          </template>
        </AppInput>
        <AppInput
          v-model="data.field2"
          placeholder="Enter Field Value"
          label="Field Two"
          :errors="validator.getErrors('field2')"
          @focus="validator.clearFieldErrors('field2')"
        >
          <template v-slot:append>
            <AppIcon name="settings" color="grey" @click="showConfig('field2')" />
          </template>
        </AppInput>
        <AppButton @click="validate" label="Validate Now" />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'

import { useState } from '@/stores'

const appState = useState()

const data = appState.data
const validator = appState.validator

type DataKey = keyof typeof data

const validate = () => {
  validator.validate()
  if(validator.valid){
    console.log('Validation successful!')
  }
}

const showConfig = (field: DataKey) => {
  appState.currentField = field
  appState.showModal('config')
}

</script>
<style lang="scss" scoped>
.freeval__form {
  max-width: 400px;
  margin: auto;
  padding-top: 44px;
}
</style>
