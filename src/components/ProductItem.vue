<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import Button from './ui/Button.vue';
import FavoriteBtn from './ui/FavoriteBtn.vue';
const props = defineProps({
    product: Object
})

const priceWithDiscount = computed(()=> (props.product.price - props.product.price * props.product.discount / 100 ).toFixed(2))
</script>

<template>
    <div class="card">
        <div class="img-wrapper">
            <FavoriteBtn :product="product" class="absolute top-0 right-0" />
            <span class="discont" v-if="product.discount">-{{ product.discount }}%</span>
            <RouterLink :to="`/product/${product.productId}`"><img :src=product.image :alt="product.title" height="240"></RouterLink>
        </div>

        <h3><RouterLink :to="`/product/${product.productId}`">{{ product.title }}</RouterLink></h3>

        <p class="description">{{ product.description }}</p>
        <div class="flex sm:items-center sm:gap-3 mt-auto flex-col sm:flex-row">
            <span class="price" >${{ product.discount ? priceWithDiscount : product.price }}</span>
            <span class="text-xs text-gray-400 line-through" v-if="product.discount">${{ product.price }}</span>

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
    @media (hover: hover )
        &:hover 
            scale: 1.03  
    @media (max-width: 540px)
        gap: 8px

.img-wrapper 
    width: 100%
    height: 240px
    overflow: hidden
    position: relative
    img 
        width: 100%
        height: 100%
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
    padding: 5px 10px
    display: flex
    justify-content: center
    align-items: center
    border-radius: 8px
    background: $accent
    color: $white
</style>