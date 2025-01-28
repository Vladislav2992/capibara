<script setup>
import { onMounted, ref } from 'vue';
import HeaderSearch from './HeaderSearch.vue';

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
onMounted(() => {
    document.addEventListener('click', (e) => {
        if (!e.composedPath().includes(menu.value) && !e.composedPath().includes(document.querySelector('.burger'))) {
            isMenuOpen.value = false
        }
    })
})
</script>

<template>
    <header class="header mt-8">
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

            <ul class="icons flex gap-4 items-center">
                <!-- add routing -->
                <li>
                    <RouterLink to="/favorites">
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width="32" height="32"><path d="M17.75,1c-2.504,0-4.777,1.851-5.75,4.354-.973-2.504-3.246-4.354-5.75-4.354C2.804,1,0,3.804,0,7.25c0,6.76,9.754,14.07,11.709,15.466l.291,.208,.291-.208c1.956-1.396,11.709-8.707,11.709-15.466,0-3.446-2.804-6.25-6.25-6.25Zm-5.75,20.693C6.859,17.958,1,12.022,1,7.25,1,4.355,3.355,2,6.25,2c2.748,0,5.25,2.86,5.25,6h1c0-3.14,2.502-6,5.25-6,2.895,0,5.25,2.355,5.25,5.25,0,4.772-5.859,10.708-11,14.443Z"/></svg>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width="32" height="32"><path d="M16,4.5c0-.28,.22-.5,.5-.5h6c.28,0,.5,.22,.5,.5s-.22,.5-.5,.5h-6c-.28,0-.5-.22-.5-.5Zm7.56,1.9c-.26-.05-.53,.12-.59,.39l-.88,4.39c-.33,1.63-1.77,2.81-3.43,2.81H5.88l-1.25-9H13.5c.28,0,.5-.22,.5-.5s-.22-.5-.5-.5H4.49l-.26-1.84C4.06,.93,3,0,1.76,0H.5C.22,0,0,.22,0,.5s.22,.5,.5,.5H1.76c.75,0,1.38,.56,1.49,1.29l1.78,12.83c.31,2.21,2.22,3.88,4.46,3.88h10.02c.28,0,.5-.22,.5-.5s-.22-.5-.5-.5H9.48c-1.73,0-3.22-1.29-3.46-3h12.64c2.14,0,3.99-1.52,4.41-3.62l.88-4.39c.05-.27-.12-.53-.39-.59Zm-14.56,15.6c0,1.1-.9,2-2,2s-2-.9-2-2,.9-2,2-2,2,.9,2,2Zm-1,0c0-.55-.45-1-1-1s-1,.45-1,1,.45,1,1,1,1-.45,1-1Zm11,0c0,1.1-.9,2-2,2s-2-.9-2-2,.9-2,2-2,2,.9,2,2Zm-1,0c0-.55-.45-1-1-1s-1,.45-1,1,.45,1,1,1,1-.45,1-1Z"/></svg>
                    </RouterLink>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width="32" height="32"><path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm-5,21.797v-.797c0-2.757,2.243-5,5-5s5,2.243,5,5v.797c-1.501.769-3.201,1.203-5,1.203s-3.499-.434-5-1.203Zm11-.582v-.215c0-3.309-2.691-6-6-6s-6,2.691-6,6v.215c-3.008-1.965-5-5.362-5-9.215C1,5.935,5.935,1,12,1s11,4.935,11,11c0,3.853-1.992,7.25-5,9.215ZM12,5c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4Zm0,7c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Z"/></svg>
                </li>
                <li>
                    <button :class="['burger ml-6', {'opened' : isMenuOpen}]" @click="openMenu()" >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </li>
            </ul>
        </div>
    </header>
</template>

<style lang="sass" scoped>
@import '@/assets/style/vars'
.header 
    margin-bottom: clamp(30px, 10vw, 30px)
.logo 
    font-size: clamp(24px, 5vw, 52px)
.menu
    li a
        transition: color .2s
        &:hover 
            color: $green-main
.burger 
    display: none

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


@media(max-width: 430px)
    // .icons 
    //     li 
    //         &:nth-child(1)
    //             svg 
    //                 width: 24px
    //         &:nth-child(2)
    //             svg 
    //                 width: 36px
    //         &:nth-child(3)
    //             svg 
    //                 width: 30px
    .burger 
        margin-left: 0
    
</style>