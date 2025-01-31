<script setup>
import { onMounted, ref } from 'vue';

const sortBy = [
    'По возрастанию цены',
    'По убыванию цены',
    'По рейтингу',
    'По размеру скидки',
]

const isSortOpen = ref(false)
const sortValue = ref(sortBy[0])
const activeSortValue = ref(0)
const sort = ref()
const openSort = () => {
    isSortOpen.value = !isSortOpen.value
}
const setSortValue = (e) => {
    sortValue.value = e.target.textContent;
    isSortOpen.value = false
    activeSortValue.value = e.target.dataset.index
}

onMounted(() => {
    document.addEventListener('click', (e)=> {
        if(!e.composedPath().includes(sort.value)) {
            isSortOpen.value = false
        }
    })
});
</script>
<template>
    <div class="sort" ref="sort" @keydown.esc="isSortOpen = false">
        <button class="sort-btn flex items-center gap-1.5" @click="openSort">
            <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_9_245)">
                    <path
                        d="M3.75001 0.500009C3.9432 0.499067 4.1377 0.572287 4.2851 0.719687L7.29341 3.728C7.5863 4.02089 7.5863 4.49577 7.29341 4.78866C7.00052 5.08155 6.52564 5.08155 6.23275 4.78866L4.50001 3.05592V11.75C4.50001 12.1642 4.16422 12.5 3.75001 12.5C3.3358 12.5 3.00001 12.1642 3.00001 11.75V3.06642L1.28228 4.78414C0.989388 5.07704 0.514518 5.07704 0.221628 4.78414C-0.0712719 4.49125 -0.0712719 4.01638 0.221628 3.72348L3.16733 0.777767C3.30484 0.608317 3.51478 0.500009 3.75001 0.500009ZM12.2519 0.500017C12.6662 0.500017 13.0019 0.835807 13.0019 1.25002V9.93363L14.7197 8.21593C15.0126 7.92303 15.4874 7.92303 15.7803 8.21593C16.0732 8.50883 16.0732 8.98363 15.7803 9.27653L12.8346 12.2222C12.6971 12.3917 12.4872 12.5 12.2519 12.5C12.0588 12.501 11.8643 12.4277 11.7169 12.2803L8.70851 9.27203C8.41571 8.97913 8.41571 8.50433 8.70851 8.21143C9.00141 7.91853 9.47631 7.91853 9.76921 8.21143L11.5019 9.94413V1.25002C11.5019 0.835807 11.8377 0.500017 12.2519 0.500017Z"
                        fill="#FA824C" />
                </g>
                <defs>
                    <clipPath id="clip0_9_245">
                        <rect width="16" height="12.0001" fill="white" transform="translate(0 0.5)" />
                    </clipPath>
                </defs>
            </svg>
            <!-- <span class="text-accent">Сначала: </span>  -->
            <span>{{ sortValue }}</span>
        </button>
        <ul :class="['inner', {'opened' : isSortOpen}]">
            <li 
                v-for="item, index in sortBy" 
                :key="index" 
                :class="[{ 'active': activeSortValue === index }]">
                <button @click="setSortValue" :data-index="index" class="w-full h-full p-0">{{ item }}</button>
            </li>
        </ul>

    </div>
</template>
<style lang="sass" scoped>
@import '@/assets/style/vars'
.sort
    position: relative
.inner 
    position: absolute
    width: 100%
    background: $white
    box-shadow: $shadow
    border-radius: 15px
    top: calc(100% + 10px)
    left: 0
    max-height: 0
    transition: max-height $transition, padding $transition
    overflow: hidden
    width: max-content
    z-index: 5
    &.opened 
        padding: 10px 0
        max-height: 300px 
button:not(.sort-btn)
    width: 100%
    height: 100%
    text-align-last: left
    padding: 8px 15px
    cursor: pointer
    transition: background $transition
    @media (hover: hover )
        &:hover 
            background: #d5d5d5   
    &.active 
        background: #d5d5d5
</style>