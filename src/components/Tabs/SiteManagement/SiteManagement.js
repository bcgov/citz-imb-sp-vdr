import { useConfig } from 'components'

export const SiteManagement = () => {
  const config = useConfig()

  return config.render
}
