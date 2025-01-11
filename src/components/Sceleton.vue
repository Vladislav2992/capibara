<script setup></script>
<template>
    <svg width="340" height="457" viewBox="0 0 340 457" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect class="bg" width="340" height="457" rx="25" fill="#FFFDFD" />
        <rect x="15" y="15" width="310" height="240" rx="25" fill="#D9D9D9" />
        <rect x="15" y="390" width="310" height="39" rx="12" fill="#D9D9D9" />
        <rect x="15" y="272" width="195" height="18" rx="4px" fill="#D9D9D9" />
        <rect x="15" y="308" width="310" height="15" rx="4px" fill="#D9D9D9" />
        <rect x="15" y="326" width="310" height="15" rx="4px" fill="#D9D9D9" />
        <rect x="15" y="358" width="72" height="15" rx="4px" fill="#D9D9D9" />
        <rect x="215" y="353" width="110" height="20" rx="4px" fill="#D9D9D9" />
    </svg>
</template>

<style lang="sass" scoped>
@import '@/assets/style/vars'
svg 
    box-shadow: $shadow
    border-radius: 25px
rect:not(.bg) 
    animation: pulse 1s alternate-reverse  infinite
@keyframes pulse 
    0% 
        fill: #C4C4C4
    75% 
        fill: #D9D9D9

</style>