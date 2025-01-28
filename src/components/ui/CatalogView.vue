<script setup>
defineProps({
    isGallery: Boolean
})
const emit = defineEmits(["changeView"])

const changeView = () => {
    emit('changeView')
}
</script>
<template>
    <div class="flex gap-2.5">
            <button :class="{'active' : isGallery}" @click="changeView">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="7" height="7" rx="0.5" fill="white" stroke="#B4B4B4"/>
                    <rect x="10.5" y="0.5" width="7" height="7" rx="0.5" fill="white" stroke="#B4B4B4"/>
                    <rect x="0.5" y="10.5" width="7" height="7" rx="0.5" fill="white" stroke="#B4B4B4"/>
                    <rect x="10.5" y="10.5" width="7" height="7" rx="0.5" fill="white" stroke="#B4B4B4"/>
                </svg>
            </button>
            <button :class="{'active' : !isGallery}" @click="changeView">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="7" height="7" rx="0.5" fill="white" stroke="#B4B4B4"/>
                    <rect x="0.5" y="10.5" width="7" height="7" rx="0.5" fill="white" stroke="#B4B4B4"/>
                    <line x1="10" y1="0.5" x2="18" y2="0.5" stroke="#B4B4B4"/>
                    <line x1="10" y1="10.5" x2="18" y2="10.5" stroke="#B4B4B4"/>
                    <line x1="10" y1="3.5" x2="17" y2="3.5" stroke="#B4B4B4"/>
                    <line x1="10" y1="13.5" x2="17" y2="13.5" stroke="#B4B4B4"/>
                    <line x1="10" y1="6.5" x2="15" y2="6.5" stroke="#B4B4B4"/>
                    <line x1="10" y1="16.5" x2="15" y2="16.5" stroke="#B4B4B4"/>
                </svg>
            </button>
       </div> 
</template>
<style lang="sass" scoped>
@import '@/assets/style/vars'
button
    padding: 5px
    &.active 
        svg line, 
        svg rect 
            stroke: $green-main
</style>