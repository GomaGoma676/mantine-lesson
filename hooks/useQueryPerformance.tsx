import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import { showNotification } from '@mantine/notifications'
import { DatabaseExport } from 'tabler-icons-react'
import { supabase } from '../utils/supabase'
import { Performance } from '../types'

export const useQueryPerformance = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const subsc = supabase
      .from('performances')
      .on('UPDATE', (payload: SupabaseRealtimePayload<Performance>) => {
        queryClient.setQueryData(['performance'], {
          id: payload.new.id,
          created_at: payload.new.created_at,
          efficiency: payload.new.efficiency,
          comfort: payload.new.comfort,
          durability: payload.new.durability,
          luck: payload.new.luck,
          user_id: payload.new.user_id,
          level: payload.new.level,
        })
        showNotification({
          title: 'Someone updated the performances table',
          message: payload.new.user_id,
          icon: <DatabaseExport />,
          color: 'teal',
          autoClose: 3000,
        })
      })
      .on('DELETE', (payload: SupabaseRealtimePayload<Performance>) => {
        queryClient.setQueryData(['performance'], null)
      })
      .subscribe()

    const removeSubscription = async () => {
      await supabase.removeSubscription(subsc)
    }
    return () => {
      removeSubscription()
    }
  }, [queryClient])
  const getPerformance = async () => {
    const { data, error } = await supabase
      .from('performances')
      .select('*')
      .eq('user_id', supabase.auth.user()?.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  return useQuery<Performance, Error>({
    queryKey: ['performance'],
    queryFn: getPerformance,
  })
}
