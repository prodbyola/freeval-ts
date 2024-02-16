import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { Validator, type ValidatorRules } from 'freeval'

export const useState = defineStore('useState', () => {
  const modal = ref<'config' | undefined>('config')

  const data = reactive({
    field1: '',
    field2: ''
  })

  const rules = reactive<ValidatorRules<typeof data>>({
    field1: [{ rule: 'required' }],
    field2: [{ rule: 'required' }, { rule: 'password' }]
  })

  const validator = reactive(
    new Validator(data, rules)
  )
  
  const currentField = ref<keyof typeof data>('field1')
  const currentFieldRules = computed(() => validator.getFieldRules(currentField.value))
  const showModal = (m: typeof modal.value) => modal.value = m

  return { modal, data, validator, currentField, currentFieldRules, showModal }
})
