import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './Game'
import { useQuestionsData } from './hooks/useQuestionsData'
import { Results } from './Results'

function App () {
  const questions = useQuestionsStore(state => state.questions)
  const { unanswered } = useQuestionsData()

  return (
    <main>
      <Container maxWidth='sm'>

        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript Quiz
          </Typography>

          
        </Stack>

          <strong style={{ fontSize: '18px', marginBottom: '48px', display: 'block' }}>
            ¿Quieres aprender React ⚛️? <a style={{ color: 'yellow' }} href='https://github.com/midudev/aprendiendo-react'>¡Haz click aquí!</a>
          </strong>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && unanswered > 0 && <Game />}
        {questions.length > 0 && unanswered === 0 && <Results />}

        <strong style={{ display: 'block', fontSize: '14px', marginTop: '48px' }}>Desarrollado con TypeScript + Zustand - <a style={{ color: 'yellow' }} href='https://github.com/midudev/aprendiendo-react/tree/master/projects/13-javascript-quiz-con-zustand'>Ir al código</a></strong>

      </Container>
    </main>
  )
}

export default App
