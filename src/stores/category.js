import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { URL } from "./global";

export const useCategoryStore = defineStore('category', () => {
    const categories = ref([])
    const isLoading = ref(true)

    const fetchCategories = async () => {
        isLoading.value = true
        try {
            const resp = await axios(`${URL}/category`)
            categories.value = resp.data
            isLoading.value = false
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false
        }
    }
    return {categories, isLoading, fetchCategories}
})