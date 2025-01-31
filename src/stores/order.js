import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { URL } from "./global";
import { useSelectedStore } from "./selected"

export const useOrderStore = defineStore("order", () => {
  const order = ref([]);
  const orderIdsList = ref([])
  const isLoading = ref(true);
  const isError = ref(false);
  const totalItems = ref(0);
  const totalFullPrice = ref(0);
  const totalFullDiscount = ref(0);
  const actualPrice = ref(0);
  const delivery = ref(50);
  
  const selectedStore = useSelectedStore()
  const { fetchSelected, removeFromSelected } = selectedStore
  const { selected } = storeToRefs(selectedStore)
  
  const fetchOrder = async () => {
    isLoading.value = true;
    try {
      await fetchSelected();
      order.value = selected.value.filter(item => item.isAdded);
      orderIdsList.value = selected.value.map(item =>  item = item.productId)
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
      await fetchSelected()
      const selectedItem = selected.value.find(item => item.productId === product.productId)
      product.isAdded = true
      if (selectedItem) {
        await axios.patch(`${URL}/selected/${selectedItem.id}`, {
          isAdded: true, 
          orderQuantiti: 1
        });
      } else {
        product.orderQuantiti = 1;
        await axios.post(`${URL}/selected/`, product);
      }
      getTotalOrderInfo()
      isLoading.value = false;
    } catch (error) {
      console.log(error);
      isError.value = true
    } finally {
      isLoading.value = false;
    }
  };

  const removeFromOrder = async (product) => {
    try {
      product.isAdded = false;      
      if (!product.isAdded && !product.isFavorite) {
        await removeFromSelected(product) 
        console.log('removed')
      } else {
        await axios.patch(`${URL}/selected/${product.id}`, {
          isAdded: false,
          orderQuantiti: 0
        });
      }
      await fetchOrder();
      await getTotalOrderInfo();
    } catch (error) {
      isError.value = true
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const decrementQuantiti = async (product) => {
    await axios.patch(`${URL}/selected/${product.id}`, {
      orderQuantiti: --product.orderQuantiti
    });
    await getTotalOrderInfo()
  };
  
  const incrementQuantiti = async (product) => {
    await axios.patch(`${URL}/selected/${product.id}`, {
      orderQuantiti: ++product.orderQuantiti
    });
    await getTotalOrderInfo()
  };
  
  const getTotalOrderInfo = async () => {
    await fetchOrder();
    totalItems.value = selected.value.reduce((sum, el) => {
      let quantiti = 0
      if (el.orderQuantiti) quantiti = el.orderQuantiti;
      return sum + quantiti;
    }, 0)    
    
    totalFullPrice.value = order.value.reduce((sum, el) => sum + el.price * el.orderQuantiti, 0) ;
    
    totalFullDiscount.value = order.value.reduce((sum, el) => {
      let percent = 0
      if (el.discount) percent = (el.price / 100 * el.discount * el.orderQuantiti);      
      return sum + percent     
    }, 0).toFixed(2);

    (totalFullDiscount.value )
    ? actualPrice.value = computed(()=> (totalFullPrice.value - totalFullDiscount.value + delivery.value).toFixed(2))
    : actualPrice.value = (totalFullPrice.value + delivery.value).toFixed(2)
  }  
  return {
    order,
    isLoading,
    isError,
    orderIdsList,
    totalItems,
    totalFullPrice,
    totalFullDiscount,
    actualPrice,
    delivery,
    fetchOrder,
    addToOrder,
    removeFromOrder,
    decrementQuantiti,
    incrementQuantiti,
    getTotalOrderInfo
  };
});