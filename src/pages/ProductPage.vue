<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';

import Header from '@/components/Header/Header.vue';
import Button from '@/components/ui/Button.vue';
import FavoriteBtn from '@/components/ui/FavoriteBtn.vue';
import Title from '@/components/ui/Title.vue';
import Error from '@/components/ui/Error.vue';
import { useProductItems } from '@/stores/productItems';
import { useFavoritesStore } from '@/stores/favorites';
import { useOrderStore } from '@/stores/order';


const categoriesList = useCategoryStore()
const { categoryTitle } = storeToRefs(categoriesList)
const { fetchCategories } = categoriesList

const params = useRoute()
const productId = params.params.id
const item = ref([])
const price = ref(null)

const productStore = useProductItems()
const {products, isError} = storeToRefs(productStore)
const { fetchItems } = productStore

const favoritesStore = useFavoritesStore()
const { fetchFavorites } = favoritesStore
const { favorotesList } = storeToRefs(favoritesStore)

const orderStore = useOrderStore()
const { addToOrder } = orderStore;
const { orderIdsList } = storeToRefs(orderStore)

onMounted(async ()=> {
    await fetchItems(`?id=${productId}`)
    item.value = products.value[0]
    item.value.discount
    ? price.value = computed(()=> item.value.price - (item.value.price * item.value.discount / 100))       
    : price.value = item.value.price
    await fetchCategories(item.value.category) 
    await fetchFavorites() 
    favorotesList.value.find(el => {
        el.productId === item.value.productId 
        ? item.value.isFavorite = true 
        : false
    })    
    orderIdsList.value.find(el => {
        el === item.value.productId 
        ? item.value.isAdded = true 
        : false
    })    
})

</script>

<template>
    <Header />
    <div class="container">
        <div class="breadcrumbs ">
            <RouterLink to="/">Главная </RouterLink>
            <RouterLink to="/">{{ categoryTitle }}</RouterLink>
            <span>{{ item.brand }} {{ item.model }}</span>
        </div>
    </div>

    <div class="" v-if="isError">
        <Error />
    </div>

    <div v-else class="container product">
        <div class="">
            <!-- slider -->
            <img loading="lazy" :src="item.image" :alt="item.title">
        </div>
        <div class="flex">
            <div class="">
                <h1 class="font-bold mb-5">{{ item.title }}</h1>

                <ul class="characteristics mb-10">
                    <li class=""><span>Бренд</span><div>{{ item.brand }}</div></li>
                    <li class=""><span>Модель</span><div>{{ item.model }}</div></li>
                    <li class=""><span>Категория</span><div>{{ categoryTitle }}</div></li>
                    <li class=""><span>Цвет</span><div>{{ item.color }}</div></li>
                </ul>

                <div class="">{{ item.description }}</div>
            </div>
        </div>
        <div class="col-[-2_/_-1] row-[1_/_3]">
            <div class="buy ">
                <div class="price">${{ price }}</div>
                <div class="old-price" v-if="item.discount">${{ item.price }}</div>
                <div class="star flex items-center gap-2">
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
                            fill="#FA824C" />
                    </svg>
                    4.8
                </div>
                <div class="flex gap-2">
                    <Button @click="addToOrder(item)" :class="['w-full', {'added' : item.isAdded}]" :disabled="item.isAdded">{{item.isAdded ? 'Добавлено' : 'В корзину'}}</Button>
                    <FavoriteBtn :product="item"/>
                </div>
                <Button class="w-full" color="accent">Купить в 1 клик</Button>
            </div>
        </div>
        <section class="col-[1_/_3]">
            <Title class="mb-5">С этим товаром смотрят</Title>
            <!-- slider -->
             <div class="grid grid-cols-4 gap-5 ">
                <div class="w-full h-60 bg-slate-300"></div>
                <div class="w-full h-60 bg-slate-300"></div>
                <div class="w-full h-60 bg-slate-300"></div>
                <div class="w-full h-60 bg-slate-300"></div>
             </div>
        </section>
        <section class="col-[1_/_3]">
            <Title class="mb-5">Отзывы</Title>
            
        </section>
    </div>
</template>

<style lang="sass" scoped>
@import '@/assets/style/vars'
.breadcrumbs 
    @include line-clamp(1)
    a 
        position: relative
        padding-right: 20px
        margin-right: 10px
        &::after 
            content: ''
            position: absolute
            right: 0
            top: 50%
            transform: translateY(-50%)
            background: url('../assets/img/breadcrumbs-arrow.svg') no-repeat center 
            width: 12px
            height: 7px
.product 
    display: grid
    grid-template-columns: 1fr .6fr .4fr 
    gap: 20px
.characteristics 
    display: flex
    flex-direction: column
    gap: 10px
    li 
        display: grid 
        grid-template-columns: .4fr .6fr
        position: relative
        &::after 
            content: ''
            position: absolute
            bottom: 6px
            width: 100%
            height: 3px
            border-bottom: 1px dashed $main
            z-index: -1
        div
            background: $white
        span 
            background: $white
            padding-right: 3px
            width: fit-content

.buy 
    padding: 20px
    border-radius: $rounded
    box-shadow: $shadow
    display: flex
    flex-direction: column
    gap: 10px
    font-family: "Nunito", sans-serif
    position: sticky
    top: 10px
.price 
    font-size: clamp(18px, 4vw, 24px)
    font-weight: 700
.old-price 
    text-decoration: line-through
    font-size: 16px
    color: $gray
.added
    background: $gray
</style>