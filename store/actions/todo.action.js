import { showSuccessMsg } from '../../services/event-bus.service.js'
import { todoService } from '../../services/todo.service.js'
import { ADD_TODO, SET_FILTER, UPDATE_TODO } from '../reducers/todo.reducer.js'
import { store } from '../store.js'

export function loadTodos(filterBy) {
  return todoService
    .query(filterBy)
    .then((todos) => store.dispatch({ type: 'SET_TODOS', todos }))
    .catch((err) => console.log('couldnt load todos'))
}

export function removeTodo(todoId) {
  todoService
    .remove(todoId)
    .then(() => {
      store.dispatch({ type: 'REMOVE_TODO', todoId })
      showSuccessMsg(`Todo Removed (id: ${todoId})`)
    })
    .catch((err) => {
      console.log('Cannot remove todo', err)
      throw err
    })
}

export function saveTodo(todo) {
  const type = todo._id ? UPDATE_TODO : ADD_TODO
  return todoService
    .save(todo)
    .then((savedTodo) => {
      store.dispatch({ type, todo: savedTodo })
      return savedTodo
    })
    .catch((err) => {
      console.log('Canot save todo', err)
      throw err
    })
}
export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER, filterBy })
}
