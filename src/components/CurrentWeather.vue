<script setup>
import {rounded} from '../utils'

defineProps({
  name: String,
  main: String,
  description: String,
  temp: Number,
  feels_like: Number,
  sunrise: Number,
  sunset: Number,
  humidity: Number,
  wind_speed:Number,
  isCelsius: Boolean,
})

const convertToF = (celsius) => {
  let fahrenheit = ((celsius * 9) / 5) + 32;
  return fahrenheit;
}
</script>

<template>
  <div class="px-2 text-sky-800 dark:text-sky-400 font-semibold text-md flex-wrap">
    <div
      class="flex flex-col p-4 rounded-md sm:ml-4 relative bg-[rgba(251,252,251,.8)] dark:bg-[rgba(55,68,74,.8)] shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)]"
    >
      <h2 class=" dark:text-lime-50 font-bold pl-8 mb-3">
        Current Weather
      </h2>
      <h1 class="font-black text-3xl  pl-8 text-ellipsis overflow-hidden break-world font-roboto">
        {{name}}
      </h1>
      <div class="text-center my-6 flex flex-wrap">
        <div
          class="w-full mx-auto text-xl font-normal flex justify-center align-middle"
        >
        </div>
        <div class="text-5xl  mt-8 w-2/3 text-right">{{ isCelsius ? rounded(temp) : convertToF(rounded(temp))}} &deg; <p class="text-xs">{{isCelsius ? "Celsius" : "Farenheit"}}</p></div>
          
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