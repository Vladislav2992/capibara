<script setup>
import { computed, ref, watch } from 'vue';
import Input from './Input.vue';
// Props
const props = defineProps({
  minPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  maxPrice: {
    type: Number,
    required: true,
    default: 1000,
  },
  step: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: Object,
    required: true,
    default: () => ({ min: 0, max: 1000 }),
  },
});
const priceRange = defineModel()

// Emits
const emit = defineEmits(['update:modelValue']);

const priceGap = 10;
const currentMin = ref(props.modelValue.min);
const currentMax = ref(props.modelValue.max);

if (computed(currentMax - currentMin) < priceGap) {
  currentMin.value = currentMax.value -  priceGap
  console.log(currentMin.value)
}

const leftPosition = computed(() => (Number(currentMin.value) / props.maxPrice * 100))
const rightPosition = computed(() => (100 - Number(currentMax.value) / props.maxPrice * 100))
</script>

<template>
    <div class="price-range-filter">
      <div class="inputs">
        <Input 
            :min="minPrice"
            :max="currentMax"
            v-model="currentMin"
            placeholder="От" />         
            
            <Input
            type="number"
            :min="currentMin"
            :max="maxPrice"
            v-model="currentMax"
            placeholder="До" />
      </div>
      <div class="range-inputs">
        <div class="progress" :style="{left: leftPosition + '%', right: rightPosition + '%'}"></div>
        <input
          type="range"
          :min="minPrice"
          :max="maxPrice"
          :step="step"
          v-model="currentMin"
        />
        <input
          type="range"
          :min="minPrice"
          :max="maxPrice"
          :step="step"
          v-model="currentMax"
        />
      </div>
    </div>
  </template>

<style lang="sass" scoped>
 @import '@/assets/style/vars'
.price-range-filter 
    display: flex
    flex-direction: column
    gap: 10px  
  
.inputs 
    display: flex
    gap: 10px  
  
.range-inputs 
    display: flex
    gap: 10px
    position: relative
    width: 100%
    height: 4px
    border-radius: 3px
    background: #d9d9d9
    input 
        position: absolute
        height: 5px 
        width: 100%
        -webkit-appearance: none
        background: none
        pointer-events: none
        &::-webkit-slider-thumb
          width: 20px
          height: 20px  
          -webkit-appearance: none
          border: 4px solid $green-main
          border-radius: 50%
          background: $white
          pointer-events: auto
.progress 
    position: absolute
    height: 4px
    background: $green-main
    left: 5px 
    right: 5px
    border-radius: 3px
  </style>
  