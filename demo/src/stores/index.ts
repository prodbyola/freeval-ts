import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { Validator } from 'freeval'

export const useState = defineStore('useState', () => {
  const modal = ref<'config' | undefined>('config')

  const data = ref({
    field1: '',
    field2: ''
  })
  const validator = reactive(
    new Validator(data.value, {
      field1: [{ rule: 'required' }],
      field2: [{ rule: 'required' }, { rule: 'password' }]
    })
  )
  
  const showModal = (m: typeof modal.value) => modal.value = m

  return { modal, data, validator, showModal }
})
