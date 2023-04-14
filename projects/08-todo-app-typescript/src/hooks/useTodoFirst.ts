import { useState } from 'react'
import { TODO_FILTERS } from '../consts'
import { mockTodos } from '../mocks/todos'
import { type TodoList, type FilterValue } from '../types'

export const useTodos = (): {
  activeCount: number
  completedCount: number
  todos: TodoList
  filterSelected: FilterValue | undefined
  handleClearCompleted: () => void
  handleCompleted: (id: string, completed: boolean) => void
  handleFilterChange: (filter: FilterValue) => void
  handleRemove: (id: string) => void
  handleSave: (title: string) => void
  handleUpdateTitle: (params: { id: string, title: string }) => void
} => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>()

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
