<template>
  <div class="page-search">
    <fk-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #foot>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </fk-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FkForm from '@/base-ui/form'

export default defineComponent({
  components: { FkForm },
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    //const fkFormRef = ref<InstanceType<typeof FkForm>>()

    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    console.log(formData, '2')

    const handleResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    /* const resetForm = () => {
      console.log('14541')
      fkFormRef.value?.resetForm()
    } */

    return { formData, handleResetClick, handleQueryClick }
  }
})
</script>

<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
