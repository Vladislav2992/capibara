<script setup>
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import { RouterLink } from 'vue-router';

const categoriesStore = useCategoryStore()
const { fetchCategories } = categoriesStore
const { categories, isLoading } = storeToRefs(categoriesStore) 

onMounted(async () => {
    await fetchCategories()
    const swiperElement = document.querySelector('.wrapper');
    if (swiperElement) {
        const shadowRoot = swiperElement.shadowRoot;
        if (shadowRoot) {
            const style = document.createElement('style');
            style.textContent = `.swiper {
                overflow-y: visible !important;
                overflow-x: clip !important;
                padding: 0 10px !important;
                transform: translateX(-15px)
                }`;
            shadowRoot.appendChild(style);
        }
    }
})
</script>

<template>
    <swiper-container v-if="isLoading" class="wrapper loading" :slides-per-view="1.5" :space-between="20" :breakpoints="{
        1200: {
            slidesPerView: 4,
            spacebetween: 20
        },
        990: {
            slidesPerView: 3.1,
            spacebetween: 20
        },
        630: {
            slidesPerView: 2.1,
            spacebetween: 20
        },
    }">
        <swiper-slide v-for="index in 4" :key=index class="category"></swiper-slide>
    </swiper-container>

    <swiper-container v-else class="wrapper" :slides-per-view="1.5" :space-between="20" :breakpoints="{
        1200: {
            slidesPerView: 4,
            spacebetween: 20
        },
        990: {
            slidesPerView: 3.1,
            spacebetween: 20
        },
        630: {
            slidesPerView: 2.1,
            spacebetween: 20
        },
    }">
        <swiper-slide class="category relative " v-for="category in categories" :key="category.id">
            <RouterLink :to="`/category/${category.id}`">
                <span class="uppercase font-bold relative z-[2]">{{ category.name }}</span>
                <img :src="category.imageUrl" :alt="category.name" class="absolute right-0 bottom-0 max-w-[200px]">
            </RouterLink>
        </swiper-slide>
    </swiper-container>
</template>

<style lang="sass" scoped>
@import '@/assets/style/vars'
.wrapper.loading 
    .category
        animation: pulse 1.5s alternate-reverse  infinite 
// .swiper::part(container)
//     overflow-y: visible
//     overflow-x: clip
//     padding: 0 10px
.category
    border-radius: 30px
    padding: 30px
    height: 230px
    background: #FFFFFF
    box-shadow: $shadow
    overflow: hidden
    transition: scale $transition
    &:hover 
        scale: 1.03
    @media(max-width: 990px) 
        &:hover 
            scale: 1
@keyframes pulse 
    0% 
        background: #EEEEEE
    75% 
        background: #D9D9D9    
</style>