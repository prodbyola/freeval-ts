<template>
  <main>
    <div class="freeval_page">
      <div class="freeval__form">
        <AppInput placeholder="Enter Field Value" label="Field One" autofocus>
          <template v-slot:append>
            <AppIcon name="settings" color="grey" />
          </template>
        </AppInput>
        <AppInput placeholder="Enter Field Value" label="Field Two">
          <template v-slot:append>
            <AppIcon name="settings" color="grey" />
          </template>
        </AppInput>
        <AppButton label="Validate Now" />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
</script>
<style lang="scss" scoped>
.freeval__form {
  max-width: 400px;
  margin: auto;
  padding-top: 44px;
}
</style>
