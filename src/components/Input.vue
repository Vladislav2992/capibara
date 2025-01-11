<script setup>
defineProps({
    placeholder: String,
})
const model = defineModel()
</script>

<template>
    <input type="text" class="" :placeholder="placeholder" v-model="model">
</template>
<style lang="sass" scoped>
@import '@/assets/style/vars'    
input 
    width: 100%
    padding: 10px 15px
    border: 1px solid #f3f3f3
    border-radius: 12px 
    color: $main
    &:focus 
        outline: none 
        box-shadow: $shadow

</style>