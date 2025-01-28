<script setup>
import { useFavoritesStore } from '@/stores/favorites';

const props = defineProps({
    product: Object,
})

const productStore = useFavoritesStore()
const {addToFavorite, removeFromFavorites,} = productStore

const clickOnFavorite = async () => {
    if (!props.product.isFavorite) {
        await addToFavorite(props.product)
    } else {
        await removeFromFavorites(props.product)
    }
}

</script>
<template>
    <button @click.prevent="clickOnFavorite" class="favorite-btn">
        <svg :class="{ 'active': product.isFavorite }" width="24" height="21" viewBox="0 0 24 21" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M22.6965 7.1879C22.6965 8.8203 22.0654 10.3882 20.9385 11.5481C18.3444 14.2187 15.8283 17.0036 13.1373 19.5775C12.5205 20.1589 11.542 20.1377 10.9518 19.53L3.19894 11.5481C0.855561 9.13538 0.855561 5.24041 3.19894 2.82777C5.56535 0.391419 9.42049 0.391419 11.7869 2.82777L12.0687 3.11789L12.3504 2.82794C13.4849 1.65919 15.0302 1 16.6444 1C18.2586 1 19.8038 1.65913 20.9385 2.82777C22.0655 3.9877 22.6965 5.55554 22.6965 7.1879Z"
                stroke="#363635" stroke-width="1.5" stroke-linejoin="round" />
        </svg>
    </button>
</template>
<style lang="sass" scoped>
@import '@/assets/style/vars'
.favorite-btn 
    background: rgba(217,217,217, .5)
    padding: 6px 7px
    border-radius: 10px
    &:active
        svg
            animation: scale .3s 
            
svg.active 
    path 
        fill: $accent
        stroke: $accent
@keyframes scale 
    0% 
        transform: scale(0)
    100%
        transform: scale(1)
</style>