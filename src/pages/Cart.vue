<script setup>
import Header from '@/components/Header/Header.vue';
import Title from '@/components/ui/Title.vue';
import MakeOrder from '@/components/MakeOrder.vue';
import CartProductItem from '@/components/CartProductItem.vue';
import { useOrderStore } from '@/stores/order';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const orderStore = useOrderStore()
const {fetchOrder, clearCart} = orderStore
const {order, sLoading, isError} = storeToRefs(orderStore)

onMounted(()=> {
    fetchOrder()
})
</script>

<template>
<Header />
<div class="container wrapper">
   <section class="">
        <div class="flex items-end justify-between mb-[50px]">
            <Title>Корзина</Title>
            <button @click="clearCart">очистить корзину</button>
        </div>
   
        <div class="order-wrapper flex flex-col gap-4">
            <CartProductItem v-for="item in order" :product="item" :key="item.productId" />
        </div>
    </section>
    <MakeOrder class="sticky top-2.5"/>

</div>
</template>

<style lang="sass" scoped>
.wrapper 
    display: grid
    grid-template-columns: 2fr 1fr
    gap: 20px
</style>