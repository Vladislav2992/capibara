<script setup>
import { onMounted, ref } from 'vue';
import Input from './ui/Input.vue';
import Button from './ui/Button.vue';
import { twMerge } from 'tailwind-merge';
import { useOrderStore } from '@/stores/order';
import { storeToRefs } from 'pinia';

const props = defineProps({
    class: String
})

const orderStore = useOrderStore();
const {totalItems, totalFullPrice, totalFullDiscount, actualPrice, delivery} = storeToRefs(orderStore)

const isHavePromocode = ref(false)
const showPromocodeInput = () => isHavePromocode.value = true 
const isCorrectPromocode = ref('')
const isDetailsOpen = ref(false)
const showDetails = () => isDetailsOpen.value = !isDetailsOpen.value

</script>
<template>
    <section :class="twMerge('inner', props.class)">
        <button @click="showDetails" class="include-btn">{{!isDetailsOpen ? 'Подробнее' : 'Скрыть'}}</button>
        <div :class="['order-include overflow-hidden', {'opened' : isDetailsOpen}]">
            <h2 class="mb-5">В стоимость включены:</h2>
            
            <dl class="flex flex-col gap-2 mb-5">
                <div class="include">
                    <dt>Товаров ({{ totalItems }})</dt><dd>${{ totalFullPrice }}</dd>
                </div>
                <div class="include">
                    <dt>Скидка</dt><dd>${{ totalFullDiscount }}</dd>
                </div>
                <div class="include">
                    <dt>Доставка</dt><dd>${{ delivery }}</dd>
                </div>
            </dl>

            <button @click="showPromocodeInput" class="promocode mb-2">У меня есть промокод</button>
            <div :class="['promocode-input mb-5', { 'opened': isHavePromocode }]">
                <Input placeholder="Промокод" v-model="isCorrectPromocode" />
                <p v-if="isCorrectPromocode" class="text-center mt-4">Скидка 10% по промокоду </p>
            </div>
        </div>

        <p class="totlal mb-5">Итого ${{ actualPrice }} <span class="old-price">${{ totalFullPrice }}</span></p>
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
    background: $white
    position: relative
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
        z-index: 1
    dt, dd 
        background: $white
        padding: 0 4px
        position: relative
        z-index: 2
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
    font-size: clamp(18px, 4vw, 24px)
.old-price 
    text-decoration: line-through
    color: $gray
    font-size: 16px
    font-weight: 400
    margin-left: 10px
.include-btn
    position: absolute
    top: 20px
    right: 20px
    color: $green-main
    display: none
@media(max-width: 1024px)
    .include-btn
        display: block
    .order-include 
        max-height: 0
        transition: max-height $transition
        &.opened
            max-height: 550px 
    .totlal
        margin-top: 10px
</style>