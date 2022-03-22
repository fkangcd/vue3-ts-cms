<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <fk-card title="分类商品数量(饼图)">
          <pie-echart :pieData="goodsCount"></pie-echart>
        </fk-card>
      </el-col>
      <el-col :span="10">
        <fk-card title="不同城市商品销量">
          <base-echart :options="option"></base-echart>
        </fk-card>
      </el-col>
      <el-col :span="7">
        <fk-card title="分类商品数量(玫瑰图)">
          <base-echart :options="option"></base-echart>
        </fk-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="12">
        <fk-card title="分类商品的销量">
          <base-echart :options="option"></base-echart>
        </fk-card>
      </el-col>
      <el-col :span="12">
        <fk-card title="分类商品的收藏">
          <base-echart :options="option"></base-echart>
        </fk-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import FkCard from '@/base-ui/card'
import BaseEchart from '@/base-ui/echart'
import { PieEchart } from '@/components/page-echarts'
import { useStore } from '@/store'

export default defineComponent({
  name: 'dashboard',
  components: { FkCard, BaseEchart, PieEchart },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    const goodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const option = {
      title: {},
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
    return { option, goodsCount }
  }
})
</script>

<style scoped></style>
