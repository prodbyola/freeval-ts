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
    field2: [{ rule: 'required' }, { rule: 'password' }]
  })

  const validator = new Validator(data, dataRules)
  const currentConfigField = ref<keyof typeof data>('field1')

  const rules = computed(() => validator.getFieldRules(currentConfigField.value))
  const showModal = (m: typeof modal.value) => modal.value = m

  const addRule = (rule: ValidatorRule) => {
    const dr = dataRules[currentConfigField.value]
    if (typeof dr !== 'undefined') {
      dr.push(rule)
    }
  }

  const removeRule = (rule: ValidatorRule) => {
    const dr = dataRules[currentConfigField.value]

    if (typeof dr !== 'undefined') {
      dr.forEach(r => {
        if(r.rule === rule.rule) {
          const index = dr.indexOf(r)
          dr.splice(index, 1)
        }
      })
      
    }
  }

  return { modal, data, rules, validator, currentField: currentConfigField, showModal, addRule, removeRule }
})
