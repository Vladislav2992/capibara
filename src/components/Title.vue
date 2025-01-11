<script setup></script>

<template>
    <h2 class=""><slot></slot></h2>
</template>

<style lang="sass" scoped>
@import '@/assets/style/vars'
h2 
    font-size: clamp(20px, 4vw, 36px)
    font-weight: 700
    font-family: 'Nunito', sans-serif
    position: relative
    width: fit-content
    &::before 
        content: ''
        position: absolute
        bottom: 5px
        left: 0
        width: 100%
        height: 3px
        background: $accent
</style>