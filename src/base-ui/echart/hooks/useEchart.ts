import * as echarts from 'echarts'

function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  return { echartInstance, setOptions }
}

export default useEchart
