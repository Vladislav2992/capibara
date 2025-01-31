import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { URL } from "./global";

export const useSelectedStore = defineStore("selected", () => {
  const selected = ref([]);
  const isLoading = ref(true);
  
  const fetchSelected = async () => {
    isLoading.value = true;
    try {
      const { data } = await axios(`${URL}/selected`);
      selected.value = data;
      isLoading.value = false;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const removeFromSelected = async (item) => {
    await axios.delete(`${URL}/selected/${item.id}`)
  }
  return { selected, isLoading, fetchSelected, removeFromSelected };
});
