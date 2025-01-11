<script setup>
import { ref } from 'vue';
import Checkbox from './Checkbox.vue';
const props = defineProps({
    title: String,
    arr: Array
})

const isAllShowed = ref(false)

let items = ref([]);

(props.arr.length > 4) ? items.value = props.arr.slice(0,4) : items.value = props.arr;

const showAll = () => {
    isAllShowed.value = !isAllShowed.value
    isAllShowed.value ? items.value = props.arr : items.value = props.arr.slice(0,4) 
};
</script>

<template>
   <div class="flex flex-col gap-2.5">
    <h3 class="font-bold">{{ title }}</h3>
    <Checkbox
        v-for="item in items"
        :key="item.id"  
        :title="item.title" 
        :value="item.value" 
        :id="item.id" 
        :name="item.name" />
    <button v-if="arr.length > 4" @click="showAll" class="text-green-main text-left">{{ isAllShowed ?  'Скрыть' : '+ Показать ещё' }}</button>
   </div>
</template>