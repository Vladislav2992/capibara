<script setup>
import { onMounted, ref } from 'vue';
import HeaderSearch from './HeaderSearch.vue';
import { useOrderStore } from '@/stores/order';
import { storeToRefs } from 'pinia';
import { useFavoritesStore } from '@/stores/favorites';
import { twMerge } from 'tailwind-merge';
const props = defineProps({
    class: String
})

const isMenuOpen = ref(false)
const menu = ref()

const openMenu = () => isMenuOpen.value = !isMenuOpen.value
const menuLinks = [
    {
        name: 'Каталог',
        linkTo: '/catalog',
    },
    {
        name: 'О нас',
        linkTo: '/',
        // linkTo: '/about',
    },
    {
        name: 'Новости',
        linkTo: '/',
        // linkTo: '/news',
    },
    {
        name: 'Доставка и оплата',
        linkTo: '/',
        // linkTo: '/delivery',
    },
    {
        name: 'Контакты',
        linkTo: '/',
        // linkTo: '/contacts',
    },
]

const favoritesStore = useFavoritesStore();
const { fetchFavorites } = favoritesStore;
const { favorotesList } = storeToRefs(favoritesStore);

const orderStore = useOrderStore();
const { getTotalOrderInfo } = orderStore;
const { totalItems } = storeToRefs(orderStore);

onMounted(async () => {
    await fetchFavorites();
    await getTotalOrderInfo();  
    
    document.addEventListener('click', (e) => {
        if (!e.composedPath().includes(menu.value) && !e.composedPath().includes(document.querySelector('.burger'))) {
            isMenuOpen.value = false
        }
    })
})
</script>

<template>
    <header :class="twMerge('header py-3', props.class )">
        <div class="container flex items-center justify-between gap-4">
            <RouterLink to="/" class="logo font-black font-nunito">
                <span class="text-green-light">capy</span>
                <span class="text-accent">bara</span>
            </RouterLink>
            <nav ref="menu" :class="['w-full menu max-w-[600px]', {'active' : isMenuOpen}]">
                <ul class="flex items-center justify-between w-full">
                    <li class="menu__item" v-for="link, item in menuLinks" :key="item">
                        <RouterLink :to="link.linkTo">{{ link.name }}</RouterLink>
                    </li>
                </ul>
            </nav>

            <HeaderSearch />
            <div class="flex gap-4 items-center">
                <div class="icons flex gap-4 items-center">
                    <div class="home-link">
                        <RouterLink to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                <path
                                    d="M23.045,8.035l-2.045-1.607V2h-1v3.641L13.545,.567c-.91-.715-2.182-.715-3.09,0L.955,8.035c-.607,.477-.955,1.193-.955,1.965v14H8V14.5c0-.827,.673-1.5,1.5-1.5h5c.827,0,1.5,.673,1.5,1.5v9.5h8V10c0-.772-.348-1.489-.955-1.965Zm-.045,14.965h-6V14.5c0-1.378-1.121-2.5-2.5-2.5h-5c-1.379,0-2.5,1.122-2.5,2.5v8.5H1V10c0-.463,.209-.893,.572-1.179L11.072,1.353c.547-.429,1.309-.429,1.855,0l9.5,7.468c.363,.286,.572,.716,.572,1.179v13Z" />
                            </svg>
                        </RouterLink>
                    </div>
                    <div class="favorits-link">
                        <span v-if="favorotesList.length > 0" :class="['selected', {'active': favorotesList.length > 0}]">{{ favorotesList.length }}</span>
                        <RouterLink to="/favorites">
                            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width="32"
                            height="32">
                            <path
                            d="M17.75,1c-2.504,0-4.777,1.851-5.75,4.354-.973-2.504-3.246-4.354-5.75-4.354C2.804,1,0,3.804,0,7.25c0,6.76,9.754,14.07,11.709,15.466l.291,.208,.291-.208c1.956-1.396,11.709-8.707,11.709-15.466,0-3.446-2.804-6.25-6.25-6.25Zm-5.75,20.693C6.859,17.958,1,12.022,1,7.25,1,4.355,3.355,2,6.25,2c2.748,0,5.25,2.86,5.25,6h1c0-3.14,2.502-6,5.25-6,2.895,0,5.25,2.355,5.25,5.25,0,4.772-5.859,10.708-11,14.443Z" />
                        </svg>
                    </RouterLink>
                </div>
                <div class=" cart-link">
                        <span v-if="totalItems > 0"  :class="['selected', {'active': totalItems > 0}]">{{ totalItems }}</span>
                        <RouterLink to="/cart">
                            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width="32"
                                height="32">
                                <path
                                    d="M16,4.5c0-.28,.22-.5,.5-.5h6c.28,0,.5,.22,.5,.5s-.22,.5-.5,.5h-6c-.28,0-.5-.22-.5-.5Zm7.56,1.9c-.26-.05-.53,.12-.59,.39l-.88,4.39c-.33,1.63-1.77,2.81-3.43,2.81H5.88l-1.25-9H13.5c.28,0,.5-.22,.5-.5s-.22-.5-.5-.5H4.49l-.26-1.84C4.06,.93,3,0,1.76,0H.5C.22,0,0,.22,0,.5s.22,.5,.5,.5H1.76c.75,0,1.38,.56,1.49,1.29l1.78,12.83c.31,2.21,2.22,3.88,4.46,3.88h10.02c.28,0,.5-.22,.5-.5s-.22-.5-.5-.5H9.48c-1.73,0-3.22-1.29-3.46-3h12.64c2.14,0,3.99-1.52,4.41-3.62l.88-4.39c.05-.27-.12-.53-.39-.59Zm-14.56,15.6c0,1.1-.9,2-2,2s-2-.9-2-2,.9-2,2-2,2,.9,2,2Zm-1,0c0-.55-.45-1-1-1s-1,.45-1,1,.45,1,1,1,1-.45,1-1Zm11,0c0,1.1-.9,2-2,2s-2-.9-2-2,.9-2,2-2,2,.9,2,2Zm-1,0c0-.55-.45-1-1-1s-1,.45-1,1,.45,1,1,1,1-.45,1-1Z" />
                            </svg>
                        </RouterLink>
                    </div>
                    <div class="user-link">
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width="32"
                            height="32">
                            <path
                                d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm-5,21.797v-.797c0-2.757,2.243-5,5-5s5,2.243,5,5v.797c-1.501.769-3.201,1.203-5,1.203s-3.499-.434-5-1.203Zm11-.582v-.215c0-3.309-2.691-6-6-6s-6,2.691-6,6v.215c-3.008-1.965-5-5.362-5-9.215C1,5.935,5.935,1,12,1s11,4.935,11,11c0,3.853-1.992,7.25-5,9.215ZM12,5c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4Zm0,7c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Z" />
                        </svg>
                    </div>
                </div>
                
                <button :class="['burger ml-6', { 'opened': isMenuOpen }]" @click="openMenu()">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                
            </div>
        </div>
    </header>
</template>

<style lang="sass" scoped>
@import '@/assets/style/vars'
.header 
    margin-bottom: clamp(30px, 10vw, 30px)
    position: sticky
    top: 0
    background: $white
    box-shadow: $shadow
    z-index: 20
.logo 
    font-size: clamp(24px, 5vw, 52px)
.menu
    li a
        transition: color .2s
        @media (hover: hover )
            &:hover 
                color: $green-main
.burger 
    display: none
.home-link
    display: none
.icons > div 
    position: relative
.selected
    display: none
    width: 10px
    height: 10px
    border-radius: 50%
    background: $accent
    position: absolute
    bottom: 30px
    right: -10px  
    &.active  
        animation: added .5s linear
        display: block
@keyframes added 
    0% 
        transform: scale(0)
    10% 
        transform: scale(1)
    35% 
        height: 3px
    50% 
        transform: translateY(12px)
        height: 12px
    60% 
        transform: translateY(-7px)
        height: 3px
    80% 
        transform: translateY(0px)
        height: 12px
    100%
        height: 10px
@media (max-width: 1200px)
    .burger 
        display: flex
        flex-direction: column
        gap: 10px
        width: 30px
        cursor: pointer
        z-index: 5
        position: relative
        transition: transform .3s cubic-bezier(0.52, -0.8, 0.52, 0.52)
        span 
            height: 2px
            background: $main 
            transition: transform .3s cubic-bezier(0.52, -0.8, 0.52, 0.52)
            border-radius: 2px
            &:nth-child(1)
                width: 50%
            &:nth-child(2)
                width: 100%
            &:nth-child(3)
                width: 50%
                margin-left: auto
        &.opened
            transform: rotate(45deg)
            span:nth-child(1)
                transform: rotate(270deg) translate(-4px, 7px)
            span:nth-child(3)
                transform: rotate(270deg) translate(4px, -8px)
    .menu 
        position: fixed
        right: 0
        top: 0
        max-width: 300px
        background: $white
        padding: 20px
        padding-top: clamp(47px, 7vw, 55px)
        height: 100vh
        z-index: 4
        box-shadow: $shadow
        transform: translateX(120%)
        opacity: 0
        visibility: hidden
        transition: transform $transition, opacity $transition, visibility $transition
        &.active 
            opacity: 1 
            visibility: visible
            transform: translateX(0)
        ul 
            flex-direction: column
            align-items: baseline
            gap: 30px


@media(max-width: 770px)
    .icons 
        position: fixed
        bottom: 0
        left: 0
        width: 100vw
        background: $white
        padding: 20px
        z-index: 10
        box-shadow: $shadow 
        justify-content: space-between
    .burger 
        margin-left: 0
    .home-link
        display: block
    
</style>