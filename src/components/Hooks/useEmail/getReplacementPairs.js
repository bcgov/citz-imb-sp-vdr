import { GetSite } from 'components/ApiCalls'

export const getReplacementPairs = async (
  proponent,
  contactEmail,
  additionalReplacementPairs = []
) => {
  const site = await GetSite({})

  let standardReplacementPairs = [
    { searchvalue: /\n/g, newvalue: '<br>' },
    { searchvalue: /\[Title\]/g, newvalue: site.Title },
    {
      searchvalue: /\[SiteLink\]/g,
      newvalue: `<a href='${site.Url}'>${site.Title}</a>`,
    },
    {
      searchvalue: /\[ContactEmail\]/g,
      newvalue: contactEmail,
    },
    { searchvalue: /\[Proponent\]/g, newvalue: proponent },
  ]

  return [...standardReplacementPairs, ...additionalReplacementPairs]
}
