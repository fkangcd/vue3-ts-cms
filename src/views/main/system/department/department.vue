<template>
  <div class="department">
    <input type="text" :value="res" />
    <h2>{{ res }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'department',
  setup() {
    /* let a: any = []
    let num = ref(a)
    const fn = () => {
      return num.value
    }

    setTimeout(() => {
      num.value = ['a', 'b']
      console.log(num.value, 'time')
    }, 3000)
    console.log(fn())
    const res = computed(() => fn())
 */
    let res = ref(0)
    setTimeout(() => {
      res.value++
      console.log(res.value, 'time')
    }, 3000)

    //const res = computed(() => num.value)
    console.log(res)

    return { res }
  }
})
</script>

<style scoped></style>
