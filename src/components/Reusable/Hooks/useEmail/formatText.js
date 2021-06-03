import { getReplacementPairs } from './getReplacementPairs'
import { replaceText } from './replaceText'

export const formatText = async (
  text,
  { proponent, contactEmail, additionalReplacementPairs = [] }
) => {
  const replacementValues = await getReplacementPairs(
    proponent,
    contactEmail,
    additionalReplacementPairs
  )

  const replacedText = replaceText(text, replacementValues)

  return replacedText
}
