<script setup>
import {computed, ref} from 'vue'
import Input from '@/components/ui/Input.vue'
const props = defineProps({
    value: Array,
    minVlue: {
        type: Number,
        default:0
    },
    maxVlue: {
        type: Number,
        default:100
    }
})

const leftPosition = computed(()=> props.value[0] / props.maxVlue * 100)
const rightPosition = computed(()=> props.maxVlue - props.value[1] / props.maxVlue * 100)

</script>
<template>
    <div class="price-range-filter">
      <div class="inputs">
        <Input 
            :min="0"
            :max="100"
            placeholder="От"/>         
            
            <Input
            type="number"
            :min="0"
            :max="100"
            placeholder="До"/>
      </div>
      <div class="range-inputs">
        <div class="progress" :style="{left: leftPosition + '%', right: rightPosition + '%'}"></div>
        <input
          type="range"
          :min="0"
          :max="100"
          :step="1"
          v-model="props.value[0]"
        />
        <input
          type="range"
          :min="0"
          :max="100"
          :step="1"
          v-model="props.value[1]"
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