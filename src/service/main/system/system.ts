import fkRequest from '../../index'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return fkRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return fkRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return fkRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return fkRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
