<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import Button from './Button.vue';
import FavoriteBtn from './FavoriteBtn.vue';
const props = defineProps({
    id: Number,
    title:String,
    image: String,
    description: String,
    price: Number,
    discountPrice: Number,
    stars: Number,
})

const priceWithDiscount = computed(()=> (props.price - props.price * props.discountPrice / 100 ).toFixed(2))
</script>

<template>
    <div class="card">
        <div class="img-wrapper">
            <FavoriteBtn class="absolute top-0 right-0" />
            <span class="discont" v-if="discountPrice">-{{ discountPrice }}%</span>
            <RouterLink :to="`/product/${id}`"><img :src=image :alt="title"></RouterLink>
        </div>

        <h3><RouterLink :to="`/product/${id}`">{{ title }}</RouterLink></h3>

        <p class="description">{{ description }}</p>
        <div class="flex sm:items-center sm:gap-3 mt-auto flex-col sm:flex-row">
            <span class="price" >${{ discountPrice ? priceWithDiscount : price }}</span>
            <span class="text-xs text-gray-400 line-through" v-if="discountPrice">${{ price }}</span>

            <!-- stars -->
            <div class="ml-auto flex items-center gap-2 leading-1">
                5.0
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#FA824C"/>
                </svg>               
            </div>
        </div>
        <Button class="w-full">+ Добавить</Button>
    </div>
</template>

<style lang="sass" scoped>
@import '@/assets/style/vars'
.card 
    padding: 15px 15px 30px 15px
    border-radius: 20px 
    box-shadow: $shadow
    display: flex
    flex-direction: column
    gap: 15px
    transition: scale $transition
    &:hover 
        scale: 1.03
    @media (max-width: 990px)
        &:hover 
            scale: 1
    @media (max-width: 540px)
        gap: 8px

.img-wrapper 
    width: 100%
    height: 240px
    border-radius: 15px 
    overflow: hidden
    position: relative
    img 
        width: 100%
        height: auto
        object-fit: contain 
        object-position: center
    @media (max-width: 540px)
        height: fit-content
h3,
.price 
    font-weight: 700
    font-family: 'Nunito', sans-serif 
    font-size: 16px
    @include line-clamp(2)
.description 
    @include line-clamp(2)
    
.discont 
    position: absolute
    padding: 20px
    display: flex
    justify-content: center
    align-items: center
    border-radius: 50%
    background: $accent
    color: $white
</style>