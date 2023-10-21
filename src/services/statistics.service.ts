import { authAxios } from '@/api/api.interceptor'

const STATISTICS = 'statistics'

export type TypeStatisticsResponse = {
  name: string
  value: number
}[]

export const StatisticService = {
  async getMain() {
    return authAxios<TypeStatisticsResponse>({
      url: `${STATISTICS}/main`,
      method: 'GET'
    })
  }
}