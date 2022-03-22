import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallBackFn = (item?: any) => void

export function usePageModal(newCb?: CallBackFn, editcb?: CallBackFn) {
  const defualtInfo = ref({})
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const handleNewClick = () => {
    defualtInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditClick = (item: any) => {
    defualtInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editcb && editcb(item)
  }
  return [defualtInfo, pageModalRef, handleNewClick, handleEditClick]
}
