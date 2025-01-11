import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { URL } from "./global";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);
  const isLoading = ref(true);
  const categoryTitle = ref("");
  const fetchCategories = async (categoryId) => {
    isLoading.value = true;
    try {
      const { data } = await axios(`${URL}/category`);
      categories.value = data;
      isLoading.value = false;
      if (categoryId) {
        const categoryItem = categories.value.find((el) => el.id === categoryId);
        categoryTitle.value = categoryItem.title;
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
  return { categories, isLoading, categoryTitle, fetchCategories };
});
