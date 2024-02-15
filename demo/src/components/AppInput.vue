<template>
    <div class="app_input__container" ref="container">
        <label>{{ label }}</label>
        <div class="app_input">
            <input v-model="model" :placeholder="placeholder" :autofocus="autofocus" @focus="onFocus" @blur="onBlur" />
            <slot name="append"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    placeholder?: string
    label: string
    autofocus?: boolean
}>()

const emit = defineEmits(['focus', 'blur'])
const model = defineModel()

const focusedClass = 'app_input__focused'
const container = ref<HTMLElement | undefined>()

const onFocus = () => {
    (container.value as HTMLElement).classList.add(focusedClass)
    emit('focus')
}

const onBlur = () => {
    (container.value as HTMLElement).classList.remove(focusedClass)
    emit('blur')
}
</script>
<style lang="scss" scoped>
@use '../assets/variables' as vars;

$trans_duration: .4s;

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
    margin-bottom: 18px;
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