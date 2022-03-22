import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/index'
import system from './main/system/index'
import dashboard from './main/analysis/dashboard/index'
import { IRootState, IStoreType } from './types'
import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderwhy',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, entireDepartment: any[]) {
      state.entireDepartment = entireDepartment
    },
    changeEntireRole(state, entireRole: any[]) {
      state.entireRole = entireRole
    },
    changeEntireMenu(state, entireMenu: any[]) {
      state.entireMenu = entireMenu
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const { data: departmentRes } = await getPageListData(
        '/department/list',
        {
          offset: 0,
          size: 1000
        }
      )
      const { data: roleRes } = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { data: MenuRes } = await getPageListData('/menu/list', {
        offset: 0,
        size: 1000
      })
      commit('changeEntireDepartment', departmentRes.list)
      commit('changeEntireRole', roleRes.list)
      commit('changeEntireMenu', MenuRes.list)
    }
  },
  modules: { login, system, dashboard }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
