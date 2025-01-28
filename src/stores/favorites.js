import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { URL } from "./global";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref([]);
  const favorotesIdsList = ref([])
  const isLoading = ref(true);
  const isError = ref(false)
  const allSelectedItems = ref([])
  
  const fetchSelectedItems = async () => {
    const { data } = await axios(`${URL}/selected`)
    allSelectedItems.value = data
  }

  const fetchFavorites = async () => {
    isLoading.value = true;
    try {
      const { data } = await axios(`${URL}/selected?isFavorite=true`);
      favorites.value = data;
      favorotesIdsList.value = favorites.value.map(item => item = item.productId)
      isLoading.value = false;
    } catch (error) {
      console.log(error);
      isError.value = true
    } finally {
      isLoading.value = false;
    }
  };
  const addToFavorite = async (product) => {
    try {
      await fetchSelectedItems();

      const selectedItem = allSelectedItems.value.find(item => item.productId === product.productId)

      if (selectedItem) {
        await axios.patch(`${URL}/selected/${selectedItem.id}`, {isFavorite: true});
      } else {
        product.isFavorite = true;
        await axios.post(`${URL}/selected/`, product);
      }  
      await fetchFavorites();    
      isLoading.value = false;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
  const removeFromFavorites = async (product) => {
    try {
      product.isFavorite = false;
      await axios.patch(`${URL}/selected/${product.id}`, {isFavorite: false});
      await fetchFavorites();
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
  return {
    favorites,
    isLoading,
    isError,
    favorotesIdsList,
    fetchFavorites,
    addToFavorite,
    removeFromFavorites,
  };
});
