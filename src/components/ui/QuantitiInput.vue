<script setup>
import Input from './Input.vue';
import Button from './Button.vue';
import { twMerge } from 'tailwind-merge';
import { useOrderStore } from '@/stores/order';

const props = defineProps({
    class: String,
    product: Object
})

const orderStore = useOrderStore()
const { incrementQuantiti, decrementQuantiti } = orderStore
</script>
<template>
    <div :class="twMerge('quantiti flex items-center gap-2.5', props.class)">
        <Button @click="product.orderQuantiti > 1 ? decrementQuantiti(product) : false" :disabled="product.orderQuantiti < 2 ? true : false">-</Button>
        <Input :value="product.orderQuantiti" class="w-[50px] text-center py-3 px-1"/>
        <Button @click="incrementQuantiti(product)">+</Button>
    </div>
</template>