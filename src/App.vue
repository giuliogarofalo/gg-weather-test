<script setup>
import { ref, computed, onMounted} from "vue";
import Header from "./components/Header.vue";
import CurrentWeather from "./components/CurrentWeather.vue";

const isCelsius = ref(true)
const weather = ref(undefined)
const stateNavigator = ref(0)

const name = computed(() => `${weather.value.name}, ${weather.value.sys.country ?? ''}`)
const sunrise =  computed(() => new Date(weather.value.sys.sunrise * 1000).getHours())
const sunset = computed(() => new Date(weather.value.sys.sunset * 1000).getHours());

const switchMeasurement = () => {
  isCelsius.value = !isCelsius.value
}

async function weatherLocation(location) {
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
  if (location){
    const response = await fetch(urlWeather)
    .catch(error => {
      console.log(error.message);
    });
  
    if (response.status === 404) {
      const message = `An error has occured: ${response.status}`;
      console.warn(message);
    }
  
    if (response.status === 200) { 
      const data = await response.json();
      localStorage.setItem(`weatherData`, JSON.stringify(data)) 
      weather.value = data
    } 
  }
} 

weatherLocation().catch(error => {
  console.log(error.message); // 'An error has occurred: 404'
});

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

const deleteCache = ()=> {
  localStorage.setItem("weatherData", null)
}

onMounted(()=> {
  const inMemory = localStorage.getItem("weatherData");
if (inMemory !== undefined && inMemory !== null && inMemory !== 'null') {
    const loadPrevData = confirm("Previous data were found, to you want to use them?");
    if (loadPrevData) {
      const parsed = localStorage.getItem("weatherData")
      const cachedLocation = JSON.parse(parsed)
      weather.value = cachedLocation
    } else {
      weather.value = undefined
    }
  } 
})
</script>

<template>
  <div class="min-h-screen flex flex-col md:max-w-5xl mx-auto p-4 font-albert">
    <header class="flex justify-between pb-8">
      <Header
        @get-coords="getLocation"
        @search="locationBySearch"
        @convert-to-farenheit="switchMeasurement"
        @trash-cache="deleteCache"
      />
    </header>
    <main class="flex flex-grow md:justify-center">
      <div class="flex flex-col sm:flex-row gap-4" v-if="weather">
       <div class="w-full sm:w-6/12 md:w-6/12 grow">
          <CurrentWeather
            :name="name"
            :temp="weather.main.temp"
            :feels_like="weather.main.feels_like"
            :main=" weather.weather[0].main"
            :description="weather.weather[0].description"
            :sunrise="sunrise"
            :sunset="sunset"
            :humidity="weather.main.humidity"
            :wind_speed="weather.wind.speed"
            :isCelsius="isCelsius"/>
        </div>
      </div>
        <h2 v-else-if="stateNavigator" class="m-auto text-2xl font-bold text-sky-400">Geolocation not allowed</h2>
        <div class="text-center m-auto" v-else>
          <div role="status" >
          <p class="text-white">No data yet</p>
        </div>
      </div>
    </main>

    <footer class="flex justify-between p-4 mt-2 text-sky-400">
      Giulio Garofalo - Vue Storefront - Test
    </footer>
  </div>
</template>