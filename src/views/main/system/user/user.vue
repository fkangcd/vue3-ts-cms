<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTabelConfig="contentTabelConfig"
      pageName="users"
      @newBtnClick="handleNewClick"
      @editBtnClick="handleEditClick"
    >
      <template #status="scope">
        <el-tag :type="scope.row.enable ? 'success' : 'danger'" size="medium">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-tag>
      </template>
    </page-content>
    <page-modal
      :defualtInfo="defualtInfo"
      ref="pageModalRef"
      :modalFormConfig="modalFormConfigRef"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTabelConfig } from './config/content.search'
import { modalFormConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStore } from '@/store'

export default defineComponent({
  name: 'user',
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    const store = useStore()
    const modalFormConfigRef = computed(() => {
      const departmentItem = modalFormConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalFormConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalFormConfig
    })

    const newCallBack = () => {
      const passwordItem = modalFormConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallBack = () => {
      const passwordItem = modalFormConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    const [defualtInfo, pageModalRef, handleNewClick, handleEditClick] =
      usePageModal(newCallBack, editCallBack)

    return {
      searchFormConfig,
      contentTabelConfig,
      modalFormConfigRef,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      handleNewClick,
      handleEditClick,
      defualtInfo
    }
  }
})
</script>

<style scoped lang="less"></style>
