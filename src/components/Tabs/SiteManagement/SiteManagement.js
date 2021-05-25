import { useConfig } from 'components/Hooks'

export const SiteManagement = () => {
  const config = useConfig()
  console.log('config :>> ', config)
  return <div>hello there</div>
}
