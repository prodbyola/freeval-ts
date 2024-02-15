<template>
  <main>
    <div class="freeval_page">
      <div class="freeval__form">
        <AppInput v-model="data.field1" placeholder="Enter Field Value" label="Field One" autofocus>
          <template v-slot:append>
            <AppIcon name="settings" color="grey" />
          </template>
        </AppInput>
        <AppInput v-model="data.field2" placeholder="Enter Field Value" label="Field Two">
          <template v-slot:append>
            <AppIcon name="settings" color="grey" />
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

import { reactive } from 'vue'
import { Validator } from 'freeval'

const data = {
  field1: '',
  field2: ''
}

const validator = reactive(
  new Validator(data, {
    field1: [{ rule: 'required' }],
    field2: [{ rule: 'required' }, { rule: 'password' }]
  })
)

const validate = () => {
  validator.validate()
  console.log(validator.errors)
}
</script>
<style lang="scss" scoped>
.freeval__form {
  max-width: 400px;
  margin: auto;
  padding-top: 44px;
}
</style>
