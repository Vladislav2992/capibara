<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { URL } from '@/stores/global';
import axios from 'axios';
import { computed, ref } from 'vue';

import Header from '@/components/Header/Header.vue';
import Button from '@/components/Button.vue';
import FavoriteBtn from '@/components/FavoriteBtn.vue';
import Title from '@/components/Title.vue';

import { useCategoryStore } from '@/stores/category';

const categoriesList = useCategoryStore()
const { categories, fetchCategories } = categoriesList

const params = useRoute()
const productId = params.params.id
const item = ref([])
const price = ref(null)

const fetchItem = async () => {
    try {
        const {data} = await axios(`${URL}/products?id=${productId}`)
        return data[0]
    } catch (error) {
        console.log(error)
    }
}
const setItemValue = async () => {
    item.value = await fetchItem()    
    fetchCategories()

    if (item.value.discount) {
        price.value = computed(()=> item.value.price - (item.value.price * item.value.discount / 100))       
    } else {
        price.value = item.value.price
    }   
}
setItemValue()


</script>

<template>
    <Header />
    <div class="container">
        <div class="breadcrumbs">
            <RouterLink to="/">Главная </RouterLink>
            <RouterLink to="/">{{ categories }}</RouterLink>
            <span>{{ item.title }}</span>
        </div>
    </div>

    <div class="container product">
        <div class="">
            <!-- slider -->
            <img loading="lazy" :src="item.image" :alt="item.title">
        </div>
        <div class="flex">
            <div class="">
                <h1 class="font-bold mb-5">{{ item.title }}</h1>

                <ul class="characteristics mb-10">
                    <li class="">
                        <span>Бренд</span>
                        <div>{{ item.brand }}</div>
                    </li>
                    <li class="">
                        <span>Модель</span>
                        <div>{{ item.model }}</div>
                    </li>
                    <li class="">
                        <span>Категория</span>
                        <div>{{ item.category }}</div>
                    </li>
                    <li class="">
                        <span>Цвет</span>
                        <div>{{ item.color }}</div>
                    </li>
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
                <div class="flex gap-4">
                    <Button class="w-full">В корзину</Button>
                    <FavoriteBtn />
                </div>
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
    display: flex
    gap: 5px
    @include line-clamp(1)
    a 
        position: relative
        padding-right: 20px
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
</style>