<script setup>
import { ref } from 'vue';

const isSearchOpen = ref(false)

const openSearch = () => {
    isSearchOpen.value = !isSearchOpen.value
    document.querySelector('body').classList.toggle('overflow-hidden')
}
</script>

<template>
    <div @keydown.esc="isSearchOpen = false" :class="['search relative ml-auto', { 'active': isSearchOpen }]">
        <input class="search-input" id="header-search" type="text" placeholder="Поиск..." @click="openSearch()">
        <label for="header-search" class="search-label">
            <svg class="" width="36" height="36" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.2999 19C9.64513 19 8.02752 18.5093 6.65163 17.59C5.27574 16.6706 4.20336 15.3639 3.57011 13.8351C2.93685 12.3063 2.77116 10.6241 3.09399 9.00108C3.41682 7.3781 4.21367 5.88731 5.38377 4.71721C6.55387 3.54711 8.04467 2.75026 9.66764 2.42743C11.2906 2.1046 12.9729 2.27029 14.5017 2.90354C16.0305 3.53679 17.3372 4.60917 18.2565 5.98506C19.1759 7.36095 19.6666 8.97856 19.6666 10.6333C19.6666 11.7321 19.4502 12.82 19.0297 13.8351C18.6092 14.8502 17.9929 15.7725 17.216 16.5495C16.4391 17.3264 15.5168 17.9427 14.5017 18.3631C13.4866 18.7836 12.3986 19 11.2999 19ZM11.2999 3.94444C9.98136 3.94444 8.69242 4.33544 7.5961 5.06798C6.49977 5.80052 5.64528 6.84171 5.1407 8.05989C4.63612 9.27806 4.50409 10.6185 4.76133 11.9117C5.01856 13.2049 5.6535 14.3928 6.58585 15.3252C7.5182 16.2575 8.70609 16.8924 9.99929 17.1497C11.2925 17.4069 12.6329 17.2749 13.8511 16.7703C15.0693 16.2657 16.1105 15.4112 16.843 14.3149C17.5756 13.2186 17.9666 11.9297 17.9666 10.6111C17.9666 8.843 17.2642 7.14731 16.0139 5.89707C14.7637 4.64682 13.068 3.94444 11.2999 3.94444Z"
                    fill="#363635" />
                <path
                    d="M21.5555 21.7222C21.446 21.7227 21.3375 21.7014 21.2364 21.6594C21.1353 21.6174 21.0435 21.5557 20.9666 21.4778L16.3777 16.8889C16.2305 16.7309 16.1504 16.522 16.1542 16.3061C16.158 16.0902 16.2454 15.8842 16.3981 15.7315C16.5508 15.5788 16.7568 15.4914 16.9727 15.4876C17.1886 15.4838 17.3975 15.5639 17.5555 15.7111L22.1444 20.3C22.3004 20.4562 22.3881 20.6681 22.3881 20.8889C22.3881 21.1097 22.3004 21.3215 22.1444 21.4778C22.0674 21.5557 21.9757 21.6174 21.8746 21.6594C21.7735 21.7014 21.665 21.7227 21.5555 21.7222Z"
                    fill="#363635" />
            </svg>
        </label>
        <div :class="['overlay', { 'active': isSearchOpen }]" @click="openSearch()"></div>
        <div :class="['search-result', { 'active': isSearchOpen }]">

        </div>
    </div>
</template>

<style lang="sass" scoped>
@import '@/assets/style/vars'
.search
    position: relative
    overflow: hidden
    &.active 
        z-index: 10
        overflow: visible
        .search-input
            right: 0
            top: 50%
            transform: translateY(-50%)
            border: 1px solid #f3f3f3
            padding: 12px 40px 12px 16px
            width: 900px
            background: $white
            &::placeholder
                opacity: .5
    &-input 
        border-radius: 12px
        color: $main   
        background: transparent
        width: 0 
        position: absolute
        transition: width $transition
        &::placeholder
            opacity: 0        
        &:focus 
            outline: none 
            box-shadow: $shadow
    &-label
        width: 40px
        height: 40px
        cursor: pointer 
        svg 
            width: 100% 
    &-result 
        height: 0
        position: absolute
        top: 100%
        transition: height $transition, top $transition
        border-radius: 15px
        background: $white
        &.active 
            height: 150px
            right: 0            
            top: calc(100% + 8px)
            width: 900px
.overlay 
    &.active
        position: fixed
        top: 0
        left: 0
        width: 100% 
        height: 100%
        background: rgba(0,0,0, .5)
        z-index: -1
@media(max-width: 1200px)
    .search
        &.active 
            .search-input
                width: calc(100vw - 350px)
        &-result.active 
            width: calc(100vw - 350px)
@media(max-width: 770px)
    .search
        margin-left: auto       
        &.active 
            .search-input
                position: fixed
                top: 0
                left: 0
                border-radius: 0
                width: 100vw    
                transform: translate(0,0)
        &-result
            position: fixed
            left: 0                
            top: 50px
            border-radius: 0
            &.active
                top: 50px
                height: 70vw
                width: 100vw
@media(max-width: 370px)
    .search-label 
        width: 28px
        height: 28px      
</style>