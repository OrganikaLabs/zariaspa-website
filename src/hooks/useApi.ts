// src/hooks/useApi.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export const useGet = <T>(key: string[], url: string) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await api.get<T>(url)
      return data
    },
  })
}
