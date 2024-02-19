import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { Validator, type ValidatorRule, type ValidatorRules } from 'freeval'

export const useState = defineStore('useState', () => {
  const modal = ref<'config' | undefined>()

  const data = reactive({
    field1: '',
    field2: ''
  })

  const dataRules = reactive<ValidatorRules<typeof data>>({
    field1: [
      {
        condition: 'min',
        error: 'This field must have minimum of 8 characters!',
        size: 8
      },
      { condition: 'required' }
    ],
    field2: [{ condition: 'required' }]
  })

  const validator = reactive(new Validator(data, dataRules))
  const currentConfigField = ref<keyof typeof data>('field1')

  const rules = computed(() => {
    console.log(validator.getFieldRules(currentConfigField.value))
    return validator.getFieldRules(currentConfigField.value)
  })
  const showModal = (m: typeof modal.value) => modal.value = m

  const addRule = (rule: ValidatorRule) => {
    validator.insertFieldRule(currentConfigField.value, rule)
  }

  const removeRule = (rule: ValidatorRule) => {
    validator.removeFieldRule(currentConfigField.value, rule)
  }

  return { 
    modal, 
    data, 
    rules, 
    validator, 
    currentConfigField, 
    showModal, 
    addRule, 
    removeRule 
  }
})
