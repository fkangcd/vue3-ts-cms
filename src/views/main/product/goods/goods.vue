<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTabelConfig="contentTabelConfig"
      pageName="goods"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :initial-index="1"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">{{ '￥' + scope.row.oldPrice }}</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { contentTabelConfig } from './config/content.search'
import { searchFormConfig } from './config/search.config'
import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
  name: 'goods',
  components: { PageSearch, PageContent },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    return {
      contentTabelConfig,
      searchFormConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped></style>
