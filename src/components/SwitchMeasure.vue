<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: ['mode'],
  emit: ['changeMeasurement'],
  setup(props) {
    onMounted(()=> {
      const measureToggle = document.getElementById('teal-toggle')
      measureToggle.addEventListener('change', () => {
          props.mode = !props.mode
          $emit('counterEvent', props.mode)
      })
    })
  },
})
</script>

<template>
  <label  
    for="teal-toggle"
    class="flex items-center cursor-pointer"
  >
    <input
      type="checkbox"
      value=""
      id="teal-toggle"
      class="sr-only peer focus:ring-offset-0 "
      checked
    />
    <div
      class="
        relative
        w-[3.5em]
        h-[2rem]
        bg-gray-600
        rounded-2xl
        peer
        peer-focus:ring-4
        peer-checked:after:translate-x-full
        after:content-['']
        after:absolute
        after:top-0
        after:left-[-0.4rem]
        after:shadow-[-4px_0px_10px_1px_rgba(17,89,133,0.3)]
      after:bg-sky-200
        after:rounded-2xl
        after:h-[2.1rem]
        after:w-[2.1rem]
        after:transition-all

      "
    >
    <p
    class="bi bi-brightness-high-fill text-yellow-400 absolute right-[0.2rem] top-1"
    >
        F
    </p>
    <p
    class="bi bi-moon absolute top-1 left-1 text-sky-200 "
    >
        C
    </p>
    </div>
  </label>
</template>

<style scoped lang="css">
    p {
        height: 24px;
        widows: 24px;
    }
</style>