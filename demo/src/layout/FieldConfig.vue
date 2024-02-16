<template>
    <div class="app_modal">
        <div class="app_modal__content"></div>
    </div>
</template>
<style lang="scss" scoped>
.app_modal {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100vh;
    min-width: 100vh;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: #0000002a;

    .app_modal__content {
        height: 100%;
        width: 100%;
        background-color: white;
        display: flex;
    }
}
</style>