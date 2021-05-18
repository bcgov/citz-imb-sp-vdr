import { LinearProgress } from '@material-ui/core'
import { getCurrentUser } from 'components/Reusable'
import { useCallback, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'
import { Test } from './Test'
import { Logon } from './Logon'

const isTest = true

export const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  const queryClient = useQueryClient()

  const prefetch = useCallback(async () => {
    await queryClient.prefetchQuery('CurrentUser', () => getCurrentUser(), {
      staleTime: 'Infinity',
      cacheTime: 'Infinity',
    })

    setIsLoading(false)
  }, [queryClient])

  useEffect(() => {
    prefetch()
    return () => {}
  }, [prefetch])

  if (isLoading) return <LinearProgress />

  if (isTest)
    return (
      <>
        <Test />
        <ReactQueryDevtoolsPanel />
      </>
    )

  return <Logon />
}
