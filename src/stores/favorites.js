import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { URL } from "./global";
import { useSelectedStore } from "./selected"

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref([]);
  const favorotesList = ref([])
  const isLoading = ref(true);
  const isError = ref(false)
  
   const selectedStore = useSelectedStore()
   const { fetchSelected, removeFromSelected } = selectedStore
   const { selected } = storeToRefs(selectedStore)

  const fetchFavorites = async () => {
    isLoading.value = true;
    try {
      await fetchSelected();
      favorites.value = selected.value.filter(item => item.isFavorite); 
      updateFavoritesList();     
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
      await fetchSelected();
      const selectedItem = selected.value.find(item => item.productId === product.productId)     
      product.isFavorite = true
      if (selectedItem) {
        await axios.patch(`${URL}/selected/${selectedItem.id}`, {isFavorite: true});
      } else {
        await axios.post(`${URL}/selected/`, product);
      }
      await updateFavoritesList()
      isLoading.value = false;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const updateFavoritesList = async () => {
    await fetchSelected()
    favorotesList.value = selected.value.filter(item => item.isFavorite)
  }

  const removeFromFavorites = async (product) => {
    try {
      await fetchSelected();
      const selectedItem = selected.value.find(el => el.productId === product.productId)
      if (selectedItem) product = selectedItem;      
           
      if (!product.isAdded && !product.isFavorite) {
        await removeFromSelected(product) 
      } else {
        await axios.patch(`${URL}/selected/${product.id}`, {isFavorite: false});
      }
      product.isFavorite = false 
      await fetchFavorites()
      console.log(product.isFavorite)
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
    favorotesList,
    fetchFavorites,
    addToFavorite,
    removeFromFavorites,
  };
});