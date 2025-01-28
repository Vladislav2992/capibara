<script setup>
import Button from '@/components/ui/Button.vue'
</script>

<template>
    <swiper-container loop="true" autoplay-delay="5000" speed="1000" pagination="true" space-between="10" >
        <swiper-slide class="slide-gradient grid grid-cols-2 py-[clamp(12px,_5vw,_48px)] px-4 gap-5 rounded-30">
            <div class="flex items-center justify-center lg:row-[1_/_3]">
                <img src="@/assets/img/main-banner.png" alt="" class="">
            </div>
            <h2 class="section__title text-white my-auto lg:mb-0">Какой-то важный главный заголовок</h2>
            <Button color="green" size="lg" class="lg:max-w-[300px] col-span-full lg:col-[2_/_3]">Нажми че ты</Button>
        </swiper-slide>

        <swiper-slide class="slide-gradient grid grid-cols-2 py-[clamp(12px,_5vw,_48px)] px-4 gap-5 rounded-30">
            <div class="flex items-center justify-center lg:row-[1_/_3]">
                <img src="@/assets/img/main-banner.png" alt="" class="">
            </div>
            <h2 class="section__title text-white my-auto lg:mb-0">Какой-то важный главный заголовок</h2>
            <Button color="green" size="lg" class="lg:max-w-[300px] col-span-full lg:col-[2_/_3]">Нажми че ты</Button>
        </swiper-slide>

        <swiper-slide class="slide-gradient grid grid-cols-2 py-[clamp(12px,_5vw,_48px)] px-4 gap-5 rounded-30">
            <div class="flex items-center justify-center lg:row-[1_/_3]">
                <img src="@/assets/img/main-banner.png" alt="" class="">
            </div>
            <h2 class="section__title text-white my-auto lg:mb-0">Какой-то важный главный заголовок</h2>
            <Button color="green" size="lg" class="lg:max-w-[300px] col-span-full lg:col-[2_/_3]">Нажми че ты</Button>
        </swiper-slide>
    </swiper-container>
</template>

<style lang="sass" scoped>
@import '../assets/style/vars'
.slide-gradient 
    background: $gradient    
</style>