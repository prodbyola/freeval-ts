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
    field1: [{ rule: 'required' }],
    field2: [{ rule: 'required' }, { rule: 'len', error: 'This field needs to be exactly 6 character long!', size: 6 }]
  })

  const validator = reactive(new Validator(data, dataRules))
  const currentConfigField = ref<keyof typeof data>('field1')

  const rules = computed(() => validator.getFieldRules(currentConfigField.value))
  const showModal = (m: typeof modal.value) => modal.value = m

  const addRule = (rule: ValidatorRule) => {
    validator.insertFieldRule(currentConfigField.value, rule)
  }

  const removeRule = (rule: ValidatorRule) => {
    validator.removeFieldRule(currentConfigField.value, rule)
  }

  return { modal, data, rules, validator, currentField: currentConfigField, showModal, addRule, removeRule }
})
