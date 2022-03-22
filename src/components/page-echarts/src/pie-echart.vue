<template>
  <div class="pie-echart">
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import BaseEchart from '@/base-ui/echart'
import type { IDataType } from '../types'

export default defineComponent({
  components: { BaseEchart },
  props: {
    pieData: {
      type: [] as PropType<IDataType>,
      default: () => []
    }
  },
  setup(props) {
    const option = {
      title: {},
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal'
      },
      series: [
        {
          name: '分类数据',
          type: 'pie',
          radius: '50%',
          data: props.pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return { option }
  }
})
</script>

<style scoped></style>
