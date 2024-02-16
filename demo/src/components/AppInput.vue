<template>
  <div class="app_input__container" ref="container">
    <label>{{ label }}</label>
    <div class="app_input">
      <select v-if="type === 'select'" v-model="model">
        <template v-if="options && options.length">
          <option v-for="(opt, index) in options" :key="index">
            <p>{{ opt }}</p>
          </option>
        </template>
      </select>
      <input
        v-else
        v-model="model"
        :placeholder="placeholder"
        :autofocus="autofocus"
        @focus="onFocus"
        @blur="onBlur"
        :type="type"
      />
      <slot name="append"></slot>
    </div>
    <div v-if="errors && errors.length" class="app_input__errors">
      <ul>
        <li v-for="(err, index) in errors" :key="index">
          <p v-html="err"></p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  placeholder?: string
  label: string
  autofocus?: boolean
  errors?: string[]
  options?: string[]
  type?: string
}>()

const emit = defineEmits(['focus', 'blur'])
const model = defineModel()

const focusedClass = 'app_input__focused'
const container = ref<HTMLElement | undefined>()

const onFocus = () => {
  ;(container.value as HTMLElement).classList.add(focusedClass)
  emit('focus')
}

const onBlur = () => {
  ;(container.value as HTMLElement).classList.remove(focusedClass)
  emit('blur')
}
</script>
<style lang="scss" scoped>
@use '../assets/variables' as vars;

$trans_duration: 0.4s;

.app_input__container {
  margin-bottom: 18px;

  label {
    font-weight: bold;
    transition: color $trans_duration;
    color: white;
  }

  .app_input {
    border-radius: 10px;
    height: 69px;
    padding: 0 32px;
    transition: border-color $trans_duration;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: white;
    border: 2px white solid;

    input,
    select {
      border: none;
      outline: none;
      height: 100%;
      width: 100%;
      font-weight: bold;
    }

    input::placeholder {
      font-weight: normal;
    }
  }

  .app_input__errors {
    background-color: rgba(255, 0, 0, 0.282);
    border-left: 2px solid red;
    border-radius: 4px;
    margin-top: 8px;
    padding: 12px 8px;

    ul {
      padding-left: 24px;
    }

    li::marker {
      color: white;
    }

    p {
      color: red;
    }
  }
}

.app_input__container:hover {
  .app_input {
    border: 2px vars.$primary_color solid;
  }

  input::placeholder {
    color: vars.$primary_color;
  }
}

.app_input__container.app_input__focused {
  .app_input {
    border: 2px vars.$primary_color solid;
  }
}
</style>
