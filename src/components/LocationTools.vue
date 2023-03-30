<script setup>
  import { ref, defineEmits } from 'vue'
  const citySearch = ref('')

  const emit = defineEmits(['getCoords', 'search', 'locateMe', 'convertToFarenheit'])

  const handleSearch = () => {
    emit('search', citySearch.value.trim())
    citySearch.value = '';
  }

  const locateMe = () => {
    emit('getCoords')
  }

  const convertTo = () => {
    emit('convertToFarenheit')
  }
  
</script>
<template>
  <div class="w-full sm:w-6/12 md:w-12/12 h-[48px] px-4 relative">
    <button
      @click.prevent="handleClick"
      type="button"
      aria-label="focus"
      class="h-[48px] w-1/12 float-right absolute right-6"
    >
    </button>
    <input
      v-model="citySearch"
      @keydown.enter="handleSearch"
      type="text"
      placeholder="Search City"
      class="p-3
          w-full
          border-none
        bg-[#37444A]
        rounded-full
        px-3
        text-[18px]
      text-sky-800
      dark:text-lime-50
      placeholder:text-lime-50
       border
      border-gray-300
      focus:ring-blue-300
        pl-6"
    />
    
  </div>
  <button 
    @click="locateMe"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
    Locate Me
  </button>
  <button 
    @click="convertTo"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
    Convert
  </button>

</template>
