import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface FKRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responsetInterceptor?: (config: T) => T
  responsetInterceptorCatch?: (error: any) => any
}

export interface FKRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: FKRequestInterceptors<T>
  showLoading?: boolean
}
