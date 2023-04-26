export const getAllQuestions = async () => {
  const res = await fetch('http://localhost:5173/data.json')
  const json = await res.json()
  return json
}
