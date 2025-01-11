<script setup>
import { storeToRefs } from 'pinia';

import { useProductItems } from '@/stores/productItems'

import Header from '@/components/Header/Header.vue';
import Banner from '@/components/Banner.vue';
import Title from '@/components/Title.vue';
import ProductItem  from '@/components/ProductItem.vue';
import Sceleton from '@/components/Sceleton.vue';
import Sort from '@/components/Sort.vue';
import Category from '@/components/Category.vue'
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';

const productStore = useProductItems()
const { fetchItems } = productStore
const { products, isLoading } = storeToRefs(productStore);

fetchItems()
</script>

<template>
  <Header />
  <main>
    <section>
      <div class="container">
        <Banner />
      </div>
    </section>

    <section>
      <div class="container">
        <Category />
      </div>
    </section>

    <section>
      <div class="container">
        <div class="flex items-baseline justify-between">
          <Title class="mb-9">Вам может понравиться</Title>
          <Sort />
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
          <Sceleton v-if="isLoading" v-for="n in 12" :key="n" />

          <ProductItem v-else v-for="product in products.slice(0, 8)" :key="product.id" :id="product.id" :title="product.title"
            :image="product.image" :description="product.description" :price="product.price"
            :discountPrice="product.discount" :stars="product.stars" />
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <Banner />
      </div>
    </section>

    <section>
      <div class="container">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
          <Sceleton v-if="isLoading" v-for="n in 12" :key="n" />

          <ProductItem v-else v-for="product in products.slice(8, 16)" :key="product.id" :id="product.id" :title="product.title"
            :image="product.image" :description="product.description" :price="product.price"
            :discountPrice="product.discount" :stars="product.stars" />
        </div>
      </div>
    </section>

    <section class="bg-gradient py-[60px] text-white">
      <div class="container grid grid-cols-2 gap-8">
        <div class="">
          <h2 class="section__title  my-auto lg:mb-0">Мы с Вами свяжемся</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.</p>
        </div>
        <form action="" class="flex flex-col gap-3 items-center">
          <Input placeholder="Имя" />
          <Input placeholder="Телефон" />
          <Input placeholder="Эл. почта" />

          <Button>Подписаться</Button>
        </form>
      </div>
    </section>

  </main>
</template>