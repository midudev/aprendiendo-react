import { Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'

const LIMIT_QUESTIONS = 10

export const Start = () => {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }

  return (
    <Button onClick={handleClick} variant='contained'>
      ¡Empezar!
    </Button>
  )
}
