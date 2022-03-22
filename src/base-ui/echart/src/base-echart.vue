<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<EChartsOption>,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '360px'
    }
  },
  setup(props) {
    const echartDivRef = ref<HTMLElement>()
    onMounted(() => {
      const { setOptions } = useEchart(echartDivRef.value!)
      setOptions(props.options)
    })

    return { echartDivRef }
  }
})
</script>

<style scoped></style>
