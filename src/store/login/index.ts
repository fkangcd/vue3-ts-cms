import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserMenusByRoleId,
  requsetUserInfoById
} from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

import type { IAccount } from '@/service/login/types'
import type { ILoginState } from './types'
import type { IRootState } from '../types'
const loginMoudle: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      console.log(userMenus)
      const routes = mapMenusToRoutes(userMenus)

      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
      console.log(permissions)
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const { data: loginRes } = await accountLoginRequest(payload)
      commit('changeToken', loginRes.token)
      localCache.setCache('token', loginRes.token)
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const { data: userRes } = await requsetUserInfoById(loginRes.id)
      commit('changeUserInfo', userRes)
      localCache.setCache('userInfo', userRes)
      console.log(userRes)

      // 3.请求用户菜单
      const { data: userMenusRes } = await requestUserMenusByRoleId(
        userRes.role.id
      )
      commit('changeUserMenus', userMenusRes)
      localCache.setCache('userMenus', userMenusRes)
      console.log(userMenusRes)

      //5.跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  modules: {}
}

export default loginMoudle
