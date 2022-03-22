<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <fk-breadcrumb :breadcrumbs="breadcrumbs" />
      <div class="user-info">
        <user-info />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfo from './user-info.vue'
import FkBreadcrumb from '@/base-ui/breadcrumb'
import { patchMapToMenu } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  components: { userInfo, FkBreadcrumb },
  emits: ['changeFold'],
  setup(props, ctx) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      ctx.emit('changeFold', isFold.value)
    }

    const store = useStore()
    const route = useRoute()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const currentPath = route.path
      return patchMapToMenu(userMenus, currentPath)
    })

    return { isFold, handleFoldClick, breadcrumbs }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex: 1;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
