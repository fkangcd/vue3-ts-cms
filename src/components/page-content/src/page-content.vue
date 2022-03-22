<template>
  <div class="page-content">
    <fk-table
      :listData="dataLisrt"
      :listCount="dataCount"
      v-model:page="pageInfo"
      v-bind="contentTabelConfig"
    >
      <template #headerHandler>
        <div class="handle-btns">
          <el-button
            size="mini"
            type="primary"
            v-if="isCreate"
            @click="handleNewClick"
            >添加用户</el-button
          >
        </div>
      </template>

      <!-- <template #status="scope">
        <el-tag :type="scope.row.enable ? 'success' : 'danger'" size="medium">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-tag>
      </template> -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            size="mini"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </fk-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import FkTable from '@/base-ui/table'
import { usePermission } from '@/hooks/ues-permission'
import { useStore } from '@/store'

export default defineComponent({
  components: { FkTable },
  props: {
    contentTabelConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    const getPageData = (queryInfo: any = {}) => {
      console.log('777')
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    const dataLisrt = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    console.log(dataLisrt, '55')
    const otherPropSlots = props.contentTabelConfig?.propList.filter(
      (item: any) =>
        item.slotName !== 'createAt' &&
        item.slotName !== 'updateAt' &&
        item.slotName !== 'handler'
    )
    console.log(otherPropSlots)

    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    return {
      dataLisrt,
      dataCount,
      pageInfo,
      getPageData,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleNewClick,
      handleEditClick,
      handleDeleteClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
