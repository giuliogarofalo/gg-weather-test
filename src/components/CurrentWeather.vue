<script setup>
import {rounded} from '../utils'

defineProps({
  name: String,
  main: String,
  icon: String,
  description: String,
  temp: Number,
  feels_like: Number,
  sunrise: Number,
  sunset: Number,
  humidity: Number,
  wind_speed:Number,
  isCelsius: Boolean,
})
</script>

<template>
  <div class="px-2 text-sky-400 font-semibold text-md flex-wrap">
    <div
      class="flex flex-col p-4 rounded-md sm:ml-4 relative bg-[rgba(55,68,74,.8)] shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)]"
    >
      <h1 class="font-black text-3xl  pl-8 text-ellipsis overflow-hidden break-world font-roboto">
        {{name}} - {{ isCelsius }}
      </h1>
      <h2 class="text-lime-50 font-bold pl-8 mb-3">
        Current Weather
      </h2>
      <div class="text-center my-6 flex flex-wrap">
        <div
          class="w-full mx-auto text-xl font-normal flex justify-center align-middle"
        >
        <button type="button" class=" bg-transparent hover:bg-white-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded" @click="changetoUnit">Change Unit Of Measurement</button>
        </div>
        <div class="text-7xl  mt-8 w-2/3 text-right font-roboto">{{rounded(temp)}}&deg;</div>
          
        <div class="text-center w-full text-xl font-normal ">
          <h4>{{main}}, {{description}}</h4>
        </div>
      </div>
      <div class="flex text-center justify-center gap-4 my-4">
        <div
          class="mx-auto flex flex-col items-center"
        >
          sunrise

          {{sunrise}}AM
        </div>

        <div
          class="mx-auto flex flex-col items-center"
        >
          sunset
          {{sunset}}PM
        </div>
        <div class="mx-auto flex flex-col items-center">
        humidity
        {{humidity}}%
        </div>
        <div class="mx-auto flex flex-col items-center ">
        wind
          {{rounded(wind_speed)}}km/h
        </div>
      </div>
    </div>
  </div>
</template>