<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>

    <div class="login-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-button" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
import localCache from '@/utils/cache'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const currentTab = ref<string>('account')
    const isKeepPassword = ref(localCache.getCache('isKeepPassword' ?? false))
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const handleLoginClick = () => {
      console.log('立即登录')
      accountRef.value?.loginAction(isKeepPassword.value)
    }

    return {
      isKeepPassword,
      accountRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
  .login-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
