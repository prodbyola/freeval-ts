import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useState = defineStore('useState', () => {
  const modal = ref<'config' | undefined>()
  const showModal = (m: typeof modal.value) => modal.value = m
  
  return { modal, showModal }
})
