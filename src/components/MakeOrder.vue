<script setup>
import { ref } from 'vue';
import Input from './ui/Input.vue';
import Button from './ui/Button.vue';
import axios from 'axios';
import { twMerge } from 'tailwind-merge';

const props = defineProps({
    class: String
})

const isHavePromocode = ref(false)
const showPromocodeInput = () => isHavePromocode.value = true 

const isCorrectPromocode = ref('')
</script>
<template>
    <section :class="twMerge('inner', props.class)">
        <h2 class="mb-5">В стоимость включены:</h2>

        <div class="flex flex-col gap-2 mb-5">
            <div class="include">
                <div>Товаров (3)</div><div>$1170</div>
            </div>
            <div class="include">
                <div>Скидка</div><div>$14</div>
            </div>
            <div class="include">
                <div>Доставка</div><div>$100</div>
            </div>
        </div>

        <button @click="showPromocodeInput" class="promocode mb-2">У меня есть промокод</button>
        <div :class="['promocode-input mb-5', {'opened' : isHavePromocode }]">
            <Input placeholder="Промокод" v-model="isCorrectPromocode" />
            <p v-if="isCorrectPromocode" class="text-center mt-4">Скидка 10% по промокоду </p>
        </div>

        <p class="totlal mb-5">Итого 1155.60 руб <span class="old-price">1284.00</span></p>
        <Button>К оформлению</Button>
    </section>
</template>
<style lang="sass" scoped>
@import '@/assets/style/vars'

.inner 
    border-radius: $rounded
    box-shadow: $shadow
    display: flex
    flex-direction: column
    padding: 30px 20px
    height: fit-content
.include
    display: flex
    align-items: center
    justify-content: space-between
    position: relative
    &::after 
        content: ''
        bottom: 6px
        width: 100%
        height: 2px
        position: absolute
        border-bottom: 1px dashed $main
        z-index: -2
    div 
        background: $white
        padding-bottom: 2px
h2 
    font-size: 24px
    font-family: $title
    font-weight: 700
    color: $green-main
.promocode
    color: $green-main
    text-align: left
.promocode-input 
    max-height: 0
    transition: max-height $transition
    overflow: hidden
    &.opened 
        max-height: 90px
input 
    text-transform: uppercase
    &::placeholder
        text-transform: none
    &:focus
        box-shadow: none
.totlal 
    font-family: $title
    font-weight: 700
    font-size: 24px
.old-price 
    text-decoration: line-through
    color: $gray
    font-size: 16px
    font-weight: 400
    margin-left: 10px
</style>