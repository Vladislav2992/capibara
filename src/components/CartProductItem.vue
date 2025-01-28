<script setup>
import { twMerge } from 'tailwind-merge';

import RemoveItemBtn from './ui/RemoveItemBtn.vue';
import FavoriteBtn from './ui/FavoriteBtn.vue';
import QuantitiInput from './ui/QuantitiInput.vue';

import { useOrderStore } from '@/stores/order';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';

const props = defineProps({
    class: String,
    product: Object
})

const orderStore = useOrderStore()
const {fetchOrder, } = orderStore
const {orderIdsList} = storeToRefs(orderStore)

const favoritesStore = useFavoritesStore();
const {fetchFavorites} = favoritesStore;
const {favorotesIdsList} = storeToRefs(favoritesStore)


onMounted(async () => {
    await fetchOrder();
    await fetchFavorites();
    if (favorotesIdsList.value.some(id => id === props.product.productId)) props.product.isFavorite = true;
    if (orderIdsList.value.some(id => id === props.product.productId)) props.product.isAdded = true; 
})
</script>
<template>
    <div :class="twMerge('cart-item flex justify-between', props.class)">
        <img :src="product.image" :alt="product.title" width="150" height="150">
        <div class="flex flex-col">
            <h2 class="font-bold font-nunito mb-4">{{ product.title }}</h2>
            <p class="mb-3">category</p>
            <div class="flex gap-2">
                <FavoriteBtn :product="product"/>
                <RemoveItemBtn :product="product"/>
            </div>
        </div>
        <QuantitiInput :product="product"/>
    </div>
</template>
<style lang="sass" scoped>
@import '@/assets/style/vars'
.cart-item 
    padding: 20px
    border-radius: $rounded
    transition: box-shadow $transition
    &:hover 
        box-shadow: $shadow
</style>