<script setup>
import { onMounted, ref } from 'vue';

import { useProductItems } from '@/stores/productItems';
import { storeToRefs } from 'pinia';

import Header from '@/components/Header/Header.vue';
import Filters from '@/components/Filters.vue';
import Sort from '@/components/ui/Sort.vue';
import CatalogView from '@/components/ui/CatalogView.vue';
import CatalogProductItem from '@/components/CatalogProductItem.vue';
import Error from '@/components/ui/Error.vue';
import { useSelectedStore } from '@/stores/selected';

const items = ref([])

const isFiltersOpen = ref(false)
const closeFilters = () => {
    isFiltersOpen.value = false
    document.body.classList.remove('disabled')
}
const openFilters = () => {
    isFiltersOpen.value = true
    document.body.classList.add('disabled')
}
const isGallery = ref(true)
const changeView = () => {
    isGallery.value = !isGallery.value
}

const productStore = useProductItems()
const { fetchItems } = productStore
const { products, isLoading, isError } = storeToRefs(productStore)

const selectedStore = useSelectedStore();
const { fetchSelected } = selectedStore;
const { selected } = storeToRefs(selectedStore);

onMounted( async ()=> {
    await fetchItems()
    await fetchSelected() 
    items.value = products.value.map(product => {
    const selectedProduct = selected.value.find(sel => sel.productId === product.productId);
    return selectedProduct ? selectedProduct : product;
});
})
</script>

<template>
    <Header />
    <div class="catalog-page container">
        <Filters :isFiltersOpen="isFiltersOpen" @closeFilters="closeFilters" />
        <div class="">
            <div class="flex items-center justify-between h-fit mb-10">
                <Sort />
                <button @click="openFilters" class="show-filters flex items-center gap-2 ml-auto mr-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.33333 3.33398C4.96514 3.33398 4.66667 3.63246 4.66667 4.00065V4.66732H2.66667C2.29848 4.66732 2 4.96579 2 5.33398C2 5.70217 2.29848 6.00065 2.66667 6.00065H4.66667V6.66732C4.66667 7.03551 4.96514 7.33398 5.33333 7.33398H6C6.36819 7.33398 6.66667 7.03551 6.66667 6.66732V6.00065H13.3333C13.7015 6.00065 14 5.70217 14 5.33398C14 4.96579 13.7015 4.66732 13.3333 4.66732H6.66667V4.00065C6.66667 3.63246 6.36819 3.33398 6 3.33398H5.33333Z" fill="black"></path><path d="M2 10.666C2 10.2978 2.29848 9.99935 2.66667 9.99935H9.33333V9.33268C9.33333 8.96449 9.63181 8.66602 10 8.66602H10.6667C11.0349 8.66602 11.3333 8.96449 11.3333 9.33268V9.99935H13.3333C13.7015 9.99935 14 10.2978 14 10.666C14 11.0342 13.7015 11.3327 13.3333 11.3327H11.3333V11.9993C11.3333 12.3675 11.0349 12.666 10.6667 12.666H10C9.63181 12.666 9.33333 12.3675 9.33333 11.9993V11.3327H2.66667C2.29848 11.3327 2 11.0342 2 10.666Z" fill="black"></path></svg>
                    Фильтры
                </button>
                <CatalogView @changeView="changeView" :isGallery="isGallery" />
            </div>
            <div v-if="isError">
                <Error />
            </div>
            <div v-else :class="['items-wrapper', {'gallery' : isGallery}]">
                <CatalogProductItem v-for="item in items"
                    :key="item.productId"
                    :product="item"
                    :isGallery="isGallery" />
            </div>
        </div>
    </div>
</template>
<style lang="sass" scoped>
.catalog-page 
    display: grid
    grid-template-columns: 1fr 3fr
    gap: 20px
    @media(max-width: 1024px)
        grid-template-columns: 1fr
.show-filters
    display: none
    @media(max-width: 1024px)
        display: flex
.items-wrapper
    &.gallery
        display: grid
        grid-template-columns: repeat(4, 1fr)
        gap: 20px
        @media(max-width: 1250px) 
            grid-template-columns: repeat(3, 1fr)
        @media(max-width: 750px) 
            grid-template-columns: repeat(2, 1fr)
            gap: 10px
</style>