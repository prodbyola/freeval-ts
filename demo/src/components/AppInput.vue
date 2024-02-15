<template>
  <div class="app_input__container" ref="container">
    <label>{{ label }}</label>
    <div class="app_input">
      <input
        v-model="model"
        :placeholder="placeholder"
        :autofocus="autofocus"
        @focus="onFocus"
        @blur="onBlur"
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
    color: #5d5d5d;
    transition: color $trans_duration;
  }

  .app_input {
    border: 2px vars.$line_color solid;
    border-radius: 10px;
    height: 69px;
    padding: 0 32px;
    transition: border-color $trans_duration;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    input {
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

    p {
      color: red;
    }
  }
}

.app_input__container:hover {
  label {
    color: vars.$secondary_color;
  }

  .app_input {
    border-color: vars.$secondary_color;
  }
}

.app_input__container.app_input__focused {
  label {
    color: vars.$primary_color;
  }

  .app_input {
    border-color: vars.$primary_color;
  }
}
</style>
