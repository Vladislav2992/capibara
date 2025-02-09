import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue';
import { URL } from './global'

export const useProductItems = defineStore('products', () => {
    const products = ref([])
    const isLoading = ref(true)
    const isError = ref(false)

    const fetchItems = async (queryParams = '') => {
        isLoading.value = true
        try {
            const { data } = await axios(`${URL}/products/${queryParams ? queryParams : ''}`)
            products.value = data.map(obj => ({
                ...obj,
                productId: obj.id,
                isFavorite:false
            }));                 
            isLoading.value = false
        } catch (error) {
            console.log(error)
            isError.value = true
        } finally {
            isLoading.value = false
        }
    };
    return {products, isLoading, isError, fetchItems}
})

