## Crear un TodoMVC con TypeScript

- [ ] Inicializar proyecto con Vite
- [ ] Añadir linter para TypeScript + React
- [ ] Añadir estilos del TodoMVC
- [ ] Listar todos los TODOs
- [ ] Poder borrar un TODO
- [ ] Marcar TODO como completado
- [ ] Añadir forma de filtrar TODOs (Footer)
- [ ] Mostrar número de TODOs pendientes (Footer)
- [ ] Añadir forma de borrar todos los TODOs completados
- [ ] Crear Header con input (Header)
- [ ] Crear un TODO (Header)
- [ ] Poder editar el texto de un TODO (Doble click)
- [ ] Añadir animaciones con AutoAnimate
- [ ] Pasar a Reducer
- [ ] Sincronizar con el backend


## Inicializar proyecto

`$ npm create vite@latest`
TypeScript + SWC

## Añadir linter para TypeScript + React

```
$ npx eslint --init
You can also run this command directly using 'npm init @eslint/config'.
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard-with-typescript
✔ What format do you want your config file to be in? · JSON
```

## Añadir estilos del TodoMVC

```sh
npm install todomvc-app-css
```

En el main.tsx:

```tsx
import 'todomvc-app-css/index.css'
```

```css
html {
  filter: invert(1);
}
```

## Listar todos los TODOs

```tsx
import { useState } from 'react'

const mockTodos = [
  { id: '1', text: 'Aprender React', completed: false },
  { id: '2', text: 'Aprender TypeScript', completed: true },
  { id: '3', text: 'Aprender Vite', completed: false },
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos)

  return <Todos todos={todos} />
}
```

`Todos.tsx`:

```tsx
import { Todo } from './Todo'
import type { Todo as TodoType } from '../types'
import { useState } from 'react'

interface Props {
  todos: TodoType[]
  // setCompleted: (id: string, completed: boolean) => void
  // setTitle: (params: { id: string, title: string }) => void
  // removeTodo: (id: string) => void
}

export const Todos: React.FC<Props> = ({
  todos,
  // setCompleted,
  // setTitle,
  // removeTodo
}) => {
  // const [isEditing, setIsEditing] = useState('')

  return (
    <ul className='todo-list'>
      {todos?.map((todo) => (
        <li
          key={todo.id}
          // onDoubleClick={() => { setIsEditing(todo.id) }}
          className={`
            ${todo.completed ? 'completed' : ''}
            ${isEditing === todo.id ? 'editing' : ''}
          `}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            // setCompleted={setCompleted}
            // setTitle={setTitle}
            // removeTodo={removeTodo}
            // isEditing={isEditing}
            // setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  )
}
```

Ahora el `Todo.tsx`: 

```tsx
import { useEffect, useRef, useState } from 'react'

interface Props {
  id: string
  title: string
  completed: boolean
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed
}) => {

  return (
    <>
      <div className='view'>
        <input
          className='toggle'
          checked={completed}
          type='checkbox'
          onChange={(e) => { setCompleted(id, e.target.checked) }}
        />
        <label>{title}</label>
        <button className='destroy' onClick={() => { removeTodo(id) }}></button>
      </div>
    </>
  )
}
```

## Poder borrar un TODO

```tsx
  const handleRemove = (id: string): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }
```

## Marcar TODO como completado

En el `App.tsx`:

```tsx
  const handleCompleted = (id: string, completed: boolean): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  }
```

## Añadir forma de filtrar TODOs (Footer)

1. Añadir componente Footer

```tsx
import { type FilterValue } from '../types'
import { Filters } from './Filters'

interface Props {
  handleFilterChange: (filter: FilterValue) => void
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
  filterSelected: FilterValue
}

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  onClearCompleted,
  filterSelected,
  handleFilterChange
}) => {
  const singleActiveCount = activeCount === 1
  const activeTodoWord = singleActiveCount ? 'tarea' : 'tareas'

  return (
    <footer className="footer">

      <span className="todo-count">
        <strong>{activeCount}</strong> {activeTodoWord} pendiente{!singleActiveCount && 's'}
      </span>

      <Filters filterSelected={filterSelected} handleFilterChange={handleFilterChange} />
    </footer>
  )
}
```

2. Añadir componente Filters

```tsx
import { TODO_FILTERS } from '../consts.js'
import { type FilterValue } from '../types.js'

const FILTERS_BUTTONS = {
  [TODO_FILTERS.ALL]: { literal: 'All', href: `/?filter=${TODO_FILTERS.ALL}` },
  [TODO_FILTERS.ACTIVE]: { literal: 'Active', href: `/?filter=${TODO_FILTERS.ACTIVE}` },
  [TODO_FILTERS.COMPLETED]: { literal: 'Completed', href: `/?filter=${TODO_FILTERS.COMPLETED}` }
} as const

interface Props {
  handleFilterChange: (filter: FilterValue) => void
  filterSelected: typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
}

export const Filters: React.FC<Props> = ({ filterSelected, handleFilterChange }) => {
  const handleClick = (filter: FilterValue) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    handleFilterChange(filter)
  }

  return (
  <ul className="filters">
    {
      Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
        const isSelected = key === filterSelected
        const className = isSelected ? 'selected' : ''

        return (
          <li key={key}>
            <a href={href}
              className={className}
              onClick={handleClick(key as FilterValue)}>{literal}
            </a>
          </li>
        )
      })
    }
  </ul>
  )
}
```

3. Crear estado en `App.tsx`:

```tsx
  const [filterSelected, setFilterSelected] = useState<FilterValue>(() => {
    // read from url query params using URLSearchParams
    const params = new URLSearchParams(window.location.search)
    const filter = params.get('filter') as FilterValue | null
    if (filter === null) return TODO_FILTERS.ALL
    // check filter is valid, if not return ALL
    return Object
      .values(TODO_FILTERS)
      .includes(filter)
      ? filter
      : TODO_FILTERS.ALL
  })
```

4. Evitar el refresh de la página al cambiar el filtro

En el `App.tsx`

```tsx
  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
    const params = new URLSearchParams(window.location.search)
    params.set('filter', filter)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
  }
```

Vamos pasando esta función hacia abajo.

## Mostrar número de TODOs pendientes (Footer)

```tsx
  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount
  // y se lo pasamos al Footer
```

## Añadir forma de borrar todos los TODOs completados

En el `App.tsx`:

```tsx
  const handleClearCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }
```

En el `Footer.tsx`: 

```tsx
  {
    completedCount > 0 && (
      <button
        className="clear-completed"
        onClick={onClearCompleted}>
          Borrar completados
      </button>
    )
  }
```

## Crear Header con el input

```tsx
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
```

Creamos el formulario para añadir Todos:

```tsx
import { useState } from 'react'

interface Props {
  saveTodo: (title: string) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && inputValue !== '') {
      saveTodo(inputValue)
      setInputValue('')
    }
  }

  return (
    <input
      className='new-todo'
      value={inputValue}
      onChange={(e) => { setInputValue(e.target.value) }}
      onKeyDown={handleKeyDown}
      placeholder='¿Qué quieres hacer?'
      autoFocus
    />
  )
}
```

Crear en el `App.tsx` la función `saveTodo`:

```tsx
  const handleSave = (title: string): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    setTodos([...todos, newTodo])
  }
```

## Poder editar un TODO

En el `App.tsx`:

```tsx
  const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }

      return todo
    })

    setTodos(newTodos)
  }
```

Pasar función hacia abajo. Ojo con el contrato.
```tsx
  setTitle: (params: { id: string, title: string }) => void
```

En el `Todos.tsx`:

```tsx
const [isEditing, setIsEditing] = useState('')

<li
    key={todo.id}
    onDoubleClick={() => { setIsEditing(todo.id) }} // <------
    className={`
      ${todo.completed ? 'completed' : ''}
      ${isEditing === todo.id ? 'editing' : ''} // <----------
    `}
  >
```

En el `Todo.tsx`:

```tsx
const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle })
      }

      if (editedTitle === '') removeTodo(id)
      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])


  return (
    ...

      <input
        className='edit'
        value={editedTitle}
        onChange={(e) => { setEditedTitle(e.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') }}
        ref={inputEditTitle}
      />
  )
```

## Añadir animaciones con AutoAnimate

```
npm install @formkit/auto-animate -E
```

En el `Todos.tsx`:

```tsx
import { useAutoAnimate } from '@formkit/auto-animate/react'

const [parent] = useAutoAnimate(/* optional config */)

<ul className='todo-list' ref={parent}>
```

## Refactor hook

```tsx
const useTodos = (): {
  activeCount: number
  completedCount: number
  todos: TodoList
  filterSelected: FilterValue
  handleClearCompleted: () => void
  handleCompleted: (id: string, completed: boolean) => void
  handleFilterChange: (filter: FilterValue) => void
  handleRemove: (id: string) => void
  handleSave: (title: string) => void
  handleUpdateTitle: (id: string, title: string) => void
} => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(() => {
    // read from url query params using URLSearchParams
    const params = new URLSearchParams(window.location.search)
    const filter = params.get('filter') as FilterValue | null
    if (filter === null) return TODO_FILTERS.ALL
    // check filter is valid, if not return ALL
    return Object
      .values(TODO_FILTERS)
      .includes(filter)
      ? filter
      : TODO_FILTERS.ALL
  })

  const handleCompleted = (id: string, completed: boolean): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  const handleRemove = (id: string): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleUpdateTitle = (id: string, title: string): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  const handleSave = (title: string): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }

    setTodos([...todos, newTodo])
  }

  const handleClearCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) {
      return !todo.completed
    }

    if (filterSelected === TODO_FILTERS.COMPLETED) {
      return todo.completed
    }

    return true
  })

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
    const params = new URLSearchParams(window.location.search)
    params.set('filter', filter)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = todos.length - completedCount

  return {
    activeCount,
    completedCount,
    filterSelected,
    handleClearCompleted,
    handleCompleted,
    handleFilterChange,
    handleRemove,
    handleSave,
    handleUpdateTitle,
    todos: filteredTodos
  }
}
```

## Leer del ENV

```tsx
interface ImportMetaEnv {
  readonly VITE_API_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## Sincronizar con el backend

Leer todos del backend al inicializar:

```tsx
  useEffect(() => {
    // fetch todos from server
    fetch('https://api.jsonbin.io/v3/b/63ff3a52ebd26539d087639c')
      .then(async res => {
        if (res.ok) return await res.json()
        throw new Error('Error fetching todos')
      })
      .then((data: { record: TodoList }) => {
        const { record } = data
        dispatch({ type: 'INIT_TODOS', payload: { todos: record } })
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
```

```ts
type Action =
  | { type: 'INIT_TODOS', payload: { todos: TodoList } }

const reducer = (state: State, action: Action): State => {
  if (action.type === 'INIT_TODOS') {
    const { todos } = action.payload
    return {
      ...state,
      todos
    }
  }
```
