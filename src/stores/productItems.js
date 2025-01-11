import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue';
import { URL } from './global'

export const useProductItems = defineStore('products', () => {
    const products = ref([])
    const isLoading = ref(true)

    const fetchItems = async () => {
        isLoading.value = true
        try {
            const { data } = await axios(`${URL}/products`)
            products.value = data;         
            isLoading.value = false
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    };
    return {products, isLoading, fetchItems}
})

