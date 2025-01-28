import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { URL } from "./global";

export const useOrderStore = defineStore("order", () => {
  const order = ref([]);
  const orderIdsList = ref([])
  const isLoading = ref(true);
  const isError = ref(false);
  const allSelectedItems = ref([]);

  const fetchSelectedItems = async () => {
    const { data } = await axios(`${URL}/selected`)
    allSelectedItems.value = data
  }

  const fetchOrder = async () => {
    isLoading.value = true;
    try {
      const { data } = await axios(`${URL}/selected?isAdded=true`);
      order.value = data;
      orderIdsList.value = order.value.map(item => item = item.productId)
      isLoading.value = false;
    } catch (error) {
      console.log(error);
      isError.value = true
    } finally {
      isLoading.value = false;
    }
  };
  const addToOrder = async (product) => {
    try {
      await fetchSelectedItems();
      const selectedItem = allSelectedItems.value.find(item => item.productId === product.productId)

      if (selectedItem) {
        await axios.patch(`${URL}/selected/${selectedItem.id}`, {
          isAdded: true, 
          orderQuantiti: 1
        });
      } else {
        product.isAdded = true;
        product.orderQuantiti = 1;
        await axios.post(`${URL}/selected/`, product);
      }
      isLoading.value = false;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
  const removeFromOrder = async (product) => {
    try {
      product.isAdded = false;
      await axios.patch(`${URL}/selected/${product.id}`, {
        isAdded: false,
        orderQuantiti: 0
      });
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const decrementQuantiti = async (product) => {
    await axios.patch(`${URL}/selected/${product.id}`, {
      orderQuantiti: --product.orderQuantiti
    });
  };
  
  const incrementQuantiti = async (product) => {
    await axios.patch(`${URL}/selected/${product.id}`, {
      orderQuantiti: ++product.orderQuantiti
    });
  };
  
  return {
    order,
    isLoading,
    isError,
    orderIdsList,
    fetchOrder,
    addToOrder,
    removeFromOrder,
    decrementQuantiti,
    incrementQuantiti
  };
});