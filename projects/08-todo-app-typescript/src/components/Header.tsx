import { CreateTodo } from './CreateTodo'

interface Props {
  saveTodo: (title: string) => void
}

export const Header: React.FC<Props> = ({ saveTodo }) => {
  return (
    <header className='header'>
      <h1>todo
        <img
          style={{ width: '60px', height: 'auto' }}
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png'></img>
      </h1>

      <CreateTodo saveTodo={saveTodo} />
    </header>
  )
}
