import { FromLanguage, Language } from '../types.d'
// import { SUPPORTED_LANGUAGES } from '../constants'

export const translate = ({
  fromLanguage,
  toLanguage,
  text
} : {
      fromLanguage: FromLanguage
      toLanguage: Language
      text: string
  }) => {
  const fromCode = fromLanguage
  const toCode = toLanguage

  // if (fromCode === toCode) return Promise.resolve(text)
  console.log('FROMCODE', fromCode)
  console.log('TOCODE', toCode)

  return fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${fromCode}|${toCode}`)
    .then(response => response.json())
    .then(data => {
      return data.responseData.translatedText
    })
    .catch(error => {
      console.log(error)
    })
}
