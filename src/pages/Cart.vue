<script setup>
import Header from '@/components/Header/Header.vue';
import Title from '@/components/ui/Title.vue';
import MakeOrder from '@/components/MakeOrder.vue';
import CartProductItem from '@/components/CartProductItem.vue';
import Empty from '@/components/ui/Empty.vue';
import { useOrderStore } from '@/stores/order';
import { storeToRefs } from 'pinia';

const orderStore = useOrderStore()
const { fetchOrder, getTotalOrderInfo } = orderStore
const {order, sLoading, isError} = storeToRefs(orderStore)

fetchOrder()
getTotalOrderInfo()
</script>

<template>
<Header />
<div :class="['container', {'wrapper' : order.length > 0}]">   
   <template v-if="order.length < 1">
       <Title>Корзина</Title>            
       <Empty />
   </template>
   
   <template v-else>
    <section class="">
        <div class="flex items-end justify-between mb-[50px]">
            <Title>Корзина</Title>            
        </div>   

        <div class="order-wrapper flex flex-col gap-4">
            <CartProductItem v-for="item in order" :product="item" :key="item.productId" />
        </div>
    </section>
    <MakeOrder class="sticky top-2.5 mb-5"/>
   </template>
</div>
</template>

<style lang="sass" scoped>
.wrapper 
    display: grid
    grid-template-columns: 2fr 1fr
    gap: 20px
    @media(max-width: 1024px)
        grid-template-columns: 1fr
        .inner 
            grid-row: 1/2 
</style>