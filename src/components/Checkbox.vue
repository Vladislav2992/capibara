<script setup>
defineProps({
    id: String,
    title: String,
    value: String,
    name: String
})
</script>

<template>
    <input type="checkbox" :value="value" :id="id" :name="name">
    <label :for="id">{{ title }}</label>
</template>

<style lang="sass" scoped>
@import '@/assets/style/vars'

input
    display: none
    &:checked + label::after 
        transform: scale(1)
label 
    padding-left: 28px
    position: relative
    cursor: pointer
    &::before, 
    &::after 
        content: ''
        position: absolute
        top: 0
        left: 0
        width: 18px
        height: 18px
        border: 1px solid #b4b4b4
        border-radius: 4px
    &::after
        transition: transform .15s
        border-color: $green-main
        background: $green-main url('@/assets/img/checked.svg') no-repeat center
        transform: scale(0)

</style>