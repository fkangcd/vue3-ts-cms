import fkRequest from '../index'
import { IAccount, ILoginResult } from './types'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return fkRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requsetUserInfoById(id: number) {
  return fkRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return fkRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
