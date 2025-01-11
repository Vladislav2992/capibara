<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

import { useCategoryStore } from '@/stores/category';
import FiltersCheckboxes from './FiltersCheckboxes.vue';
import Range from './Range.vue';

defineProps({
    isFiltersOpen: Boolean
})

const emit = defineEmits(["openFilters"])

const closeFilters = () => {
    emit('closeFilters')
}

const store = useCategoryStore()
const {fetchCategories} = store 
const {categories} = storeToRefs(store)

const isCategoryOpen = ref(true)
const activeCategoryIndex = ref(0)

const setActiveIndex = (e) => {
    activeCategoryIndex.value = e.target.dataset.activeIndex
}

const materials = [
    {
        id: "metall",
        title: "Металл",
        value: "metall",
        name: "metall"
    },
    {
        id: "wood",
        title: "Дерево",
        value: "wood",
        name: "wood"
    },
    {
        id: "bamboo",
        title: "Бамбук",
        value: "bamboo",
        name: "bamboo"
    },
    {
        id: "papper",
        title: "Бумага",
        value: "papper",
        name: "papper"
    },
    {
        id: "coton",
        title: "Хлопок",
        value: "coton",
        name: "coton"
    },
    {
        id: "wool",
        title: "Шерсть",
        value: "wool",
        name: "wool"
    },
]
const priceRange = ref({ min: 0, max: 2000 })
onMounted(()=> {
    fetchCategories();
})
</script>

<template>
    <form @submit.prevent="onSubmit" :class="['filters-wrapper', {'opened' : isFiltersOpen}]">
        <button @click="closeFilters" class="close-filters">Отмена</button>
        <div class="filters-header flex items-center justify-between">
            <h2 class="font-bold">Фильтры</h2>
            <button type="reset" class="text-accent">Очистить</button>
        </div>
        <div class="categories">
            <button :class="{'active' : isCategoryOpen}" @click="isCategoryOpen = !isCategoryOpen">Категории </button>
            <ul :class="{'open' : isCategoryOpen}">
                <li v-for="category in categories" :key="category.id">
                    <button 
                        :class="{ 'active': activeCategoryIndex == category.id }"
                        :data-active-index="category.id" 
                        @click="setActiveIndex">
                       {{ category.title }}
                    </button>
                </li>
            </ul>
        </div>

        <div class="price flex flex-col gap-2.5">
            <h3 class="font-bold">Цена</h3>              
            <Range  :minPrice="0"
                    :maxPrice="2000"
                    v-model="priceRange" />         
        </div>
        <FiltersCheckboxes title="Материал" :arr="materials" />
        
    </form>
</template>

<style lang="sass" scoped>
@import '@/assets/style/vars'    
.filters-wrapper
    padding:30px 20px
    display: flex
    flex-direction: column
    gap: 20px
    border-radius: 30px    
    box-shadow: $shadow
    height: fit-content
    transition: height $transition
    @media(max-width: 1024px)
        position: fixed 
        top: 0
        left: 0
        width: 100%
        height: 100vh
        background: $white
        border-radius: 0
        z-index: 10
        transition: transform $transition, opacity $transition, visibility $transition
        transform: translateY(-100%)
        opacity: 0
        visibility: hidden
        overflow: auto
    &.opened 
        transform: translateY(0)
        opacity: 1
        visibility: visible
.close-filters
    display: none
    @media(max-width:1024px)
        display: block
        margin-left: auto

.categories 
    button 
        position: relative
        padding-right: 18px
        text-align: left
        width: fit-content
        &::after 
            content: ''
            position: absolute
            top: 50%
            top: 5px
            right: 0
            width: 12px
            height: 12px
            background: url('@/assets/img/arrow.svg') no-repeat center 
            transition: transform .3s
        &.active 
            &::after 
                transform: rotate(90deg)
    ul 
        padding-left: 10px
        max-height: 0
        overflow: hidden
        transition: max-height .3s
        display: flex
        flex-direction: column
        gap: 10px
        margin-top: 10px
        &.open 
            max-height: 300px
</style>