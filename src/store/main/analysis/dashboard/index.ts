import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IDashboardState } from './types'
import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '@/service/main/analysis/dashboaed'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changecategoryGoodsCount(state, categoryGoodsCount: any[]) {
      state.categoryGoodsCount = categoryGoodsCount
    },
    changecategoryGoodsSale(state, categoryGoodsSale: any[]) {
      state.categoryGoodsSale = categoryGoodsSale
    },
    changecategoryGoodsFavor(state, categoryGoodsFavor: any[]) {
      state.categoryGoodsFavor = categoryGoodsFavor
    },
    changeaddressGoodsSale(state, addressGoodsSale: any[]) {
      state.addressGoodsSale = addressGoodsSale
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const { data: categoryCountResult } = await getCategoryGoodsCount()
      commit('changecategoryGoodsCount', categoryCountResult)
      const { data: categorySaleResult } = await getCategoryGoodsSale()
      commit('changecategoryGoodsSale', categorySaleResult)
      const { data: categoryFavorResult } = await getCategoryGoodsFavor()
      commit('changecategoryGoodsFavor', categoryFavorResult)
      const { data: addressSaleResult } = await getAddressGoodsSale()
      commit('changeaddressGoodsSale', addressSaleResult)
    }
  }
}

export default dashboardModule
