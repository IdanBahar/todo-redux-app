import { todoService } from '../../services/todo.service.js'
import { store } from '../store.js'

export function loadTodos(filterBy) {
  return todoService
    .query(filterBy)
    .then((todos) => store.dispatch({ type: 'SET_TODOS', todos }))
    .catch((err) => console.log('couldnt load todos'))
}

export function removeTodo(todoId) {
  return todoService
    .remove(todoId)
    .then(() => {
      store.dispatch({ type: 'REMOVE_TODO', todoId })
    })
    .catch((err) => {
      console.log('Cannot remove todo', err)
      throw err
    })
}

export function addTodo(todo) {
  return todoService
    .save(todo)
    .then((savedTodo) => {
      store.dispatch({ type: 'ADD_TODO', todo: savedTodo })
      return savedTodo
    })
    .catch((err) => {
      console.log('Canot add todo', err)
      throw err
    })
}
