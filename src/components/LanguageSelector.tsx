import React from 'react'
import Form from 'react-bootstrap/Form'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
// import { type FC } from 'react'
import { FromLanguage, Language, SectionType } from '../types'

// Tipamos las props, pasando como valores type y value para que el
// select tome valores del estado
type Props =
  | {type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void}
  | {type: SectionType.To, value: Language, onChange: (language: Language) => void}

export const LanguageSelector = ({ onChange, type, value } : Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select onChange={handleChange} aria-label="Selecciona el idioma" value={value}>
      {type === 'from' && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}

      {
        Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
            <option key={key} value={key}>
                {literal}
            </option>
        ))
      }
    </Form.Select>
  )
}
