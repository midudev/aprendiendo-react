import type { TODO_FILTERS } from './consts'

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export type TodoId = Pick<Todo, 'id'>
export type TodoTitle = Pick<Todo, 'title'>

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]

export type TodoList = Todo[]
