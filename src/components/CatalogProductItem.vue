<script setup>
import FavoriteBtn from './ui/FavoriteBtn.vue';
import Button from './ui/Button.vue';
import { RouterLink } from 'vue-router';
import { useOrderStore } from '@/stores/order';
import { watch } from 'vue';

const props = defineProps({
    product: Object,
    isGallery: Boolean
})

const orderStore = useOrderStore()
const { addToOrder, fetchSelectedItems } = orderStore

// watch(()=> addToOrder, ()=>fetchSelectedItems())

</script>
<template>
    <div :class="['card relative', {'full-width': !isGallery}]">
        <RouterLink :to="`/product/${product.productId}`" class="flex flex-col gap-3">
            <FavoriteBtn :product="product" class="absolute top-4 right-4 z-[2]" />
            <div class="img">
                <img loading="lazy" :src="product.image" :alt="product.title" width="215" height="215">
            </div>
           <div class="card-info">
            <p class="price font-bold">${{ product.price }}</p>
            <p class="title">{{ product.title }}</p>
            <div v-if="!isGallery" class="description">{{ product.description }}</div>
           </div>
            <div class="card-bottom flex justify-between mt-auto gap-4">
                <div class="star flex items-center gap-2">
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
                            fill="#FA824C" />
                    </svg>
                    4.8
                </div>
                <Button @click.prevent="addToOrder(product)" class="flex gap-1" :disabled="product.isAdded">
                    <template v-if="!product.isAdded">
                        <span class="hidden sm:block">+</span> Добавить
                    </template>
                    <template v-else>
                        Добавлено
                    </template>
                </Button>                
            </div>
        </RouterLink>
    </div>
</template>
<style lang="sass" scoped>
@import '@/assets/style/vars'
img
    min-height: 180px
    @media(max-width: 750px) 
        min-height: auto

.card 
    padding: 10px 15px 25px
    border-radius: $rounded
    transition: box-shadow $transition
    &:hover 
        box-shadow: $shadow 
    @media(max-width: 540px)
        padding: 0 
    &.full-width
        margin-bottom: 20px 
        a 
            display: grid
            grid-template-columns: 200px 1fr
            gap: 10px
            @media(max-width: 540px) 
                grid-template-columns: 1fr
                .favorite-btn
                    bottom: 4px
                    left: 0px
                    top: auto
                    right: auto
        .img 
            max-height: 250px 
            grid-row: 1/3
            @media(max-width: 540px) 
                grid-row: auto
                img 
                    height: 100%
                    width: auto
                    margin: 0 auto  
        .card-info 
            display: flex
            flex-direction: column
            gap: 10px
            @media(max-width: 540px) 
                gap: 5px
        .title 
            @include line-clamp(2)
            color: $green-main
            margin-top: 10px
            @media(max-width: 540px) 
                margin-top: 0
        .description 
            @include line-clamp(4)
        .card-bottom
            margin-left: auto
.title 
    font-weight: 700
    @include line-clamp(1)

</style>