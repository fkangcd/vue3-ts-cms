<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="rules"
      :model="accountForm"
      ref="accountFormRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountForm.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()

    const accountForm = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const accountFormRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      accountFormRef.value?.validate((valid) => {
        if (valid) {
          console.log('登录')
          if (isKeepPassword) {
            localCache.setCache('name', accountForm.name)
            localCache.setCache('password', accountForm.password)
            localCache.setCache('isKeepPassword', isKeepPassword)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
            localCache.deleteCache('isKeepPassword')
          }
          store.dispatch('login/accountLoginAction', { ...accountForm })
        }
      })
    }

    return {
      accountForm,
      accountFormRef,
      rules,
      loginAction
    }
  }
})
</script>

<style scoped></style>
