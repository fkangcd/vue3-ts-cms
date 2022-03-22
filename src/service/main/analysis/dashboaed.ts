import fkRequest from '@/service'
import { IDataType } from '@/service/types'

enum DashboardAPI {
  CategoryGoodsCount = '/goods/category/count',
  CategoryGoodsSale = '/goods/category/sale',
  CategoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return fkRequest.get<IDataType>({
    url: DashboardAPI.CategoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return fkRequest.get<IDataType>({
    url: DashboardAPI.CategoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return fkRequest.get<IDataType>({
    url: DashboardAPI.CategoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return fkRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale
  })
}
