<script setup>
import {onMounted, ref, watch} from 'vue'
import Header from '@/components/Header/Header.vue';
import Title from '@/components/ui/Title.vue';
import CatalogProductItem from '@/components/CatalogProductItem.vue';
import CatalogView from '@/components/ui/CatalogView.vue';
import Error from '@/components/ui/Error.vue';
import { useFavoritesStore } from '@/stores/favorites';
import { useOrderStore } from '@/stores/order';
import { storeToRefs } from 'pinia';

const isGallery = ref(true)
const changeView = () => {
    isGallery.value = !isGallery.value
}

const productsStore = useFavoritesStore()
const {fetchFavorites} = productsStore
const {favorites, isLoading, isError} = storeToRefs(productsStore)

onMounted(async ()=> {
    await fetchFavorites();
})

</script>

<template>
    <Header />
    <section class="container">
        <div class="flex justify-between items-center">
            <Title>Избранное</Title>
            <CatalogView @changeView="changeView" :is-gallery="isGallery"/>
        </div>
        <template v-if="isError">
            <Error />
        </template>
        
        <template v-else>
            <div  v-if="favorites.length< 1" class="flex flex-col gap-2.5 items-center">
                <p class="section__title font-nunito font-bold text-center">Здесь пока ничего нет</p>
                <img src="../assets/img/capybara-sleepy-in-bed.png" width="300" height="300" alt="capybara-on-fire">
                <p class="font-nunito font-bold text-center">добавьте что-нибудь из <RouterLink to="/catalog" class="text-green-main text-underline">каталога</RouterLink> </p>
            </div>
            <div v-else :class="['grid md:grid-cols-2', {'xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2' : isGallery}]">
                <CatalogProductItem v-for="product in favorites" :product="product" :is-gallery="isGallery"/>  
            </div>
        </template>
    </section>
</template>