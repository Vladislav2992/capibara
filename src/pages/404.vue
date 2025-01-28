<script setup>
import Header from '@/components/Header/Header.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
<Header />
<div class="container">
    <h1>404</h1>
    <h2 class="section__title">Ой, тут ничего нет</h2>
    <img src="../assets/img/capybara-eating-pizza.png" width="300" height="300" alt="capibara-eating-pizza">
    <p>Вернитесь, пожалуйста, <RouterLink to="/">на главную</RouterLink></p>
</div>


</template>

<style lang="sass" scoped>
@import '@/assets/style/vars'
.container 
    font-family: $title
    display: flex
    align-items: center
    justify-content: center
    gap: 10px
    flex-direction: column
h1 
    color: $green-main
    font-size: clamp(50px, 25vw, 200px)
    font-weight: 900
    line-height: 1

a 
    text-decoration: underline
    color: $green-main
</style>