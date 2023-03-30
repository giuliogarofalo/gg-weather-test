<script setup>
import { ref, computed, onMounted, watch} from "vue";
import LocationTools from "./components/LocationTools.vue";
import CurrentWeather from "./components/CurrentWeather.vue";

const isCelsius = ref(true)
const weather = ref(undefined)
const stateNavigator = ref(0)

// const name = computed(() => `${weather.value.name}, ${weather.value.sys.country ?? ''}`)
// const sunrise =  computed(() => new Date(weather.value.sys.sunrise * 1000).getHours())
// const sunset = computed(() => new Date(weather.value.sys.sunset * 1000).getHours());

const switchMeasurement = () => {
  isCelsius.value = !isCelsius.value
}

const urlWeather = `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;

const fetchWithRetry = async (url, opts, tries=10) => {
  const errs = [];
  for (let i = 0; i < tries; i++) {
    console.log(`trying GET '${url}' [${i + 1} of ${tries}]`);
    try {
      return await fetch(url, opts);
    }
    catch (err) {
      errs.push(err);
    }
  } 
  throw errs;
};

fetchWithRetry(urlWeather)
  .then(response => response.json())
  .then(data => weather.value = data)
  .catch(err => console.error(err));


async function weatherLocation(location) {
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
  const response = await fetch(urlWeather);
  if (response.status === 404) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  console.log(data);
  weather.value = data
}

weatherLocation().catch(error => {
  console.log(error.message); // 'An error has occurred: 404'
});

// const weatherLocation = async (location) => {
  
  
  
  
//   fetch(urlWeather)
//   .then(response => 
//     // if(response.status === 404) {
//     //   throw 'City no found'
//     // }
//       response.json()
    
//   )
//   .then(data => {
//     console.log(data)
//     weather.value = await data
//   }).catch(error => console.error(error))
  
  
// //   fetch(urlWeather)
// //   .then((response) => {
// //     if (response.status === 404) {
// //       throw 'City no found'
// //     }
// //     if(response.ok) {
// //       return response
// //     }
// //   // console.log('Looks like there was a problem. Status Code: ' + response.status);
// //         // weather.value = response.data;

// // //  return response.data
  
// //  }).then(res => console.log(res.json()) )

//   // const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?${location}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
//   //   try {
    
//   //     const resolve = await Promise.all([
//   //       fetch(urlWeather),
//   //       fetch(urlForecast)
//   //     ])
//   //     if (resolve[0].status == 404 || resolve[1].status == 404) {
//   //       throw 'City no found'
//   //     }
//   //     const data = resolve.map(response => response.json());
//   //     weather.value = await data[0];
      
//   //     //filter the list index 40/8
//   //     const forecastOrigin = await data[1]
//   //     const forecastDays = filterByIncrement(forecastOrigin.list,  8, 40)

//   //     forecast.value = forecastDays
//   //   } catch(err) {
//   //     console.error(err);
//   //   }

// }

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

</script>

<template>
  <div class="min-h-screen flex flex-col md:max-w-5xl mx-auto p-4 font-albert">
    <header class="flex justify-between pb-8">
      <LocationTools
      @get-coords="getLocation"
      @search="locationBySearch"
      @convert-to-farenheit="switchMeasurement"
      />
    </header>
    <main class="flex flex-grow md:justify-center">
      <div class="flex flex-col sm:flex-row gap-4" v-if="weather">
       <div class="w-full sm:w-6/12 md:w-6/12 grow">
          <CurrentWeather
            :name="weather.name"
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
          <h2 v-else-if="stateNavigator" class="m-auto text-2xl font-bold text-sky-800 dark:text-sky-400">Geolocation not allowed</h2>
          <div class="text-center m-auto" v-else>
            <div role="status" >
            <p class="text-white">No data yet</p>
          </div>
      </div>
    </main>

    <footer class="flex justify-between p-4 mt-2 dark:text-sky-400">
      Giu test Vue Storefront
    </footer>
  </div>
</template>

