<script setup>
import { ref, computed, onMounted } from "vue";
import LocationTools from "./components/LocationTools.vue";
import CurrentWeather from "./components/CurrentWeather.vue";
import SwitchMeasure from "./components/SwitchMeasure.vue"

const weather = ref({})
const stateNavigator = ref(0)

const name = computed(() => `${weather.value.name}, ${weather.value.sys.country ?? ''}`)
const sunrise =  computed(() => new Date(weather.value.sys.sunrise * 1000).getHours())
const sunset = computed(() => new Date(weather.value.sys.sunset * 1000).getHours())

const weatherLocation = async (location) => {
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
    try {
      const resolve = await Promise.all([
        fetch(urlWeather),
      ])
      if (resolve[0].status == 404) {
        throw 'City no found'
      }
      const data = resolve.map(response => response.json());
      weather.value = await data[0];
    } catch(err) {
      console.error(err);
    }
}

function locationBySearch(query) {
  if (query != ''){
    weatherLocation(`q=${query}`)
  }
}

async function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      const {latitude, longitude} = pos.coords
      weatherLocation(`lat=${latitude}&lon=${longitude}`)
    },
    err => {
      stateNavigator.value = err.code // code 1 User denied Geolocation
    })
  } else  {
  window.alert("Could not get location")
  }
}

onMounted(() => {
  getLocation()
})

</script>

<template>
  <div class="min-h-screen flex flex-col md:max-w-5xl mx-auto p-4">
    <header class="flex justify-between pb-8">
      <LocationTools
        @get-coords="getLocation"
        @search="locationBySearch"
      />
      <SwitchMeasure :mode="isCelsius"/>
    </header>
    <main class="flex flex-grow md:justify-center">
      <div class="flex flex-col sm:flex-row gap-4" v-if="weather">
       <div class="w-full sm:w-6/12 md:w-6/12 grow"  >
          <CurrentWeather
              :name="name"
              :icon="weather.weather[0].icon"
              :temp="temp"
              :feels_like="weather.main.feels_like"
              :main="weather.weather[0].main"
              :description="weather.weather[0].description"
              :sunrise="sunrise"
              :sunset="sunset"
              :humidity="weather.main.humidity"
              :wind_speed="weather.wind.speed"
              :is-celsius="isCelsius"
              />
        </div>
      </div>
          <h2 v-else-if="stateNavigator" class="m-auto text-2xl font-bold text-sky-400">Geolocation not allowed</h2>
          <div class="text-center m-auto" v-else>
            <div role="status" >
            <span class="sr-only">Loading...</span>
          </div>
      </div>
    </main>

    <footer class="flex justify-between p-4 mt-2 text-sky-400">
      Giulio Garofalo - Vue Storefront - Test
    </footer>
  </div>
</template>
