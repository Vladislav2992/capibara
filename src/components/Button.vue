<script setup>
import { ref } from 'vue';

defineProps({
    color: String,
    size: String,
})

const isActive  = ref(true)
</script>
<template>
    <button :class="{'long' : size === 'lg', 'accent' : color === 'accent'}" >
        <slot></slot>
    </button>
</template>

<style lang="sass" scoped>
@import '@/assets/style/vars'
button
    border-radius: 12px
    padding: 10px 15px
    font-family: "Nunito", sans-serif
    font-size: clamp(14px, 3vw, 16px)
    background: $green-main
    color: $white
    font-weight: 700
    transition: background $transition
    height: fit-content
    &:hover 
        background: $green-light
    &:active
        transform: translateY(1px)
    &.long 
        padding: 15px 20px
        font-size: clamp(18px, 4vw, 24px)
    &.accent 
        background: $accent 
</style>