import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('My App works as expected', async () => {
  const user = userEvent.setup()
  const app = render(<App />)

  const textareaFrom = app.getByPlaceholderText('Introducir texto')

  await user.type(textareaFrom, 'Hola mundo')
  const result = await app.findByDisplayValue(/Hello world/i, {}, { timeout: 2000 })

  expect(result).toBeTruthy()
})
