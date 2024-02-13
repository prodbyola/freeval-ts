<template>
    <div class="app_input">
        <input />
    </div>
</template>
<style lang="scss" scoped>
@use '../assets/variables' as vars;
.app_input {
    border: 1px vars.$line_color solid;
    border-radius: 10px;
    height: 69px;
    padding: 0 32px;

    input {
        border: none;
        outline: none;
        height: 100%;
        width: 100%;
    }
}
</style>