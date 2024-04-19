import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants'
import { ArrowIcon, ClipBoardIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { SectionType } from './types.d'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App () {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debouncedFromText === '') return
    translate({ text: debouncedFromText, fromLanguage, toLanguage })
      .then((result) => {
        if (result == null) return
        setResult(result)
      })
      .catch((error) => {
        setResult(error.message)
      })
  }, [debouncedFromText, fromLanguage, toLanguage, setResult])

  // Funcion que copia texto
  const handleClipBoard = () => {
    navigator.clipboard.writeText(result)
  }

  return (
    <Container fluid>
      <h2 style={{ marginBottom: '20px' }}>Google Translate Clone</h2>

    <Row>
      <Col>
        <Stack gap={2}>
          <LanguageSelector
          type= {SectionType.From}
          value= {fromLanguage}
          onChange={setFromLanguage}
          />
          <TextArea
          type= {SectionType.From}
          onChange={setFromText}
          value={fromText}
          />
        </Stack>
      </Col>

      <Col xs='auto'>
        <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
          <ArrowIcon />
        </Button>
      </Col>

      <Col>
        <Stack gap={2}>
          <LanguageSelector
          type={SectionType.To}
          value={toLanguage}
          onChange={setToLanguage}
          />
          <div style={{ position: 'relative' }}>
        <TextArea
          type={SectionType.To}
          onChange={setResult}
          value={result}
          loading={loading}
          />
          <Button
          variant='link'
          style={{ position: 'absolute', left: 0, bottom: 0 }}
          onClick={handleClipBoard}
          >
            <ClipBoardIcon />
          </Button>

          </div>
        </Stack>
      </Col>

    </Row>

    </Container>

  )
}

export default App
