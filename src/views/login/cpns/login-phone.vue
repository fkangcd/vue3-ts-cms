<template>
  <div class="login-phone">
    <el-form label-width="60px" :model="phoneAccount">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phoneAccount.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <div class="login-code">
          <el-input v-model="phoneAccount.verifyCode"></el-input>
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phoneAccount = reactive({
      phone: '',
      verifyCode: ''
    })

    return {
      phoneAccount
    }
  }
})
</script>

<style scoped lang="less">
.login-code {
  display: flex;
  button {
    margin-left: 8px;
  }
}
</style>
