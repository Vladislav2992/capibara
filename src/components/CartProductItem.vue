<script setup>
import { twMerge } from 'tailwind-merge';

import RemoveItemBtn from './ui/RemoveItemBtn.vue';
import FavoriteBtn from './ui/FavoriteBtn.vue';
import QuantitiInput from './ui/QuantitiInput.vue';

import { useOrderStore } from '@/stores/order';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';

const isFullTitle = ref(false)

const props = defineProps({
    class: String,
    product: Object
})

const orderStore = useOrderStore()
const {fetchOrder, } = orderStore
const {orderIdsList} = storeToRefs(orderStore)

const favoritesStore = useFavoritesStore();
const {fetchFavorites} = favoritesStore;
const {favorotesList} = storeToRefs(favoritesStore)


onMounted(async () => {
    await fetchOrder();
    await fetchFavorites();
    if (favorotesList.value.some(id => id === props.product.productId)) props.product.isFavorite = true;
    if (orderIdsList.value.some(id => id === props.product.productId)) props.product.isAdded = true; 
})
</script>
<template>
    <div :class="twMerge('cart-item', props.class)">
        <RouterLink :to="`product/${product.productId}`" class="img">
            <img :src="product.image" :alt="product.title" width="150" height="150">
        </RouterLink>
        
        <h2 @click="isFullTitle = !isFullTitle" :class="['title font-bold font-nunito', {'full-title' : isFullTitle}]">{{ product.title }}</h2>
        
        <div class="price flex flex-col items-center">
            <span v-if="product.discount" class="font-bold text-accent">${{ product.price - (product.price / 100 * product.discount) }}</span>
            <span :class="{'font-bold text-accent' : !product.discount }">${{ product.price }}</span>
        </div>

        <div class="buttons flex gap-2 mt-auto">
            <FavoriteBtn :product="product"/>
            <RemoveItemBtn :product="product"/>
        </div>
        
        <QuantitiInput :product="product" />
    </div>
</template>
<style lang="sass" scoped>
@import '@/assets/style/vars'
.cart-item 
    padding: 20px
    border-radius: $rounded
    transition: box-shadow $transition
    display: grid
    grid-template-columns: 150px auto 60px 150px
    gap: 10px
    @media (hover: hover )
        &:hover 
            box-shadow: $shadow
.buttons 
    grid-row: 2/3
    grid-column: 2/3
    button
        height: fit-content
.title
    @include line-clamp(2)
    height: fit-content
    &.full-title
        -webkit-line-clamp: none
.img,
.quantiti,
.price 
    grid-row: 1/3
    margin: auto
@media(max-width: 640px)
    .cart-item
        grid-template-columns: 150px 1fr
        padding: 5px
        gap: 4px
    .quantiti
        grid-row: 3/4 
        grid-column: 2/3
        margin: 0
    .price
        grid-row: 2/3
        grid-column: 2/3 
        margin: 0
        align-items: baseline
    .buttons
        grid-column: 2/3
        grid-row: 4/5
    .title
        margin: 0
    .img 
        grid-row: 1/4 
</style>