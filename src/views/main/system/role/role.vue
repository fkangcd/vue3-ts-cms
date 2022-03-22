<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      :contentTabelConfig="contentTabelConfig"
      pageName="role"
      @newBtnClick="handleNewClick"
      @editBtnClick="handleEditClick"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalFormConfig="modalFormConfig"
      :defualtInfo="defualtInfo"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      />
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTabelConfig } from './config/content.search'
import { modalFormConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/use-page-modal'
import { menuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallBack = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [defualtInfo, pageModalRef, handleNewClick, handleEditClick] =
      usePageModal(undefined, editCallBack)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfcheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfcheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTabelConfig,
      modalFormConfig,
      defualtInfo,
      pageModalRef,
      handleNewClick,
      handleEditClick,
      otherInfo,
      handleCheckChange,
      menus,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
