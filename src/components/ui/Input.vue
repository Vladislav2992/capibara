<script setup>
import { twMerge } from 'tailwind-merge';

const props = defineProps({
    placeholder: String,
    value: String | Number,
    class: String
})

</script>

<template>
    <input type="text" :class="twMerge('w-full border border-[#f3f3f3] rounded-[12px] text-main focus:outline-none focus:shadow-base py-2.5 px-4', props.class)" :placeholder="placeholder" v-model="props.value">
</template>
<style lang="sass" scoped>
@import '@/assets/style/vars'    
// input 
//     width: 100%
//     padding: 10px 15px
//     border: 1px solid #f3f3f3
//     border-radius: 12px 
//     color: $main
//     &:focus 
//         outline: none 
//         box-shadow: $shadow

</style>