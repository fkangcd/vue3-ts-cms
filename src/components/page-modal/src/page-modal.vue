<template>
  <div class="page-modal">
    <el-dialog title="新建用户" v-model="dialogVisible" width="30%" center>
      <fk-form v-bind="modalFormConfig" v-model="formData"></fk-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import FkForm from '@/base-ui/form'
import { useStore } from '@/store'

export default defineComponent({
  components: { FkForm },
  props: {
    modalFormConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    defualtInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    let dialogVisible = ref(false)
    const formData = ref<any>({})

    watch(
      () => props.defualtInfo,
      (newValue) => {
        for (const item of props.modalFormConfig.formItems) {
          formData.value[item.field] = newValue[item.field]
        }
      }
    )

    const store = useStore()

    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defualtInfo).length) {
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defualtInfo.id
        })
      } else {
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return { dialogVisible, formData, handleConfirmClick }
  }
})
</script>

<style scoped></style>
