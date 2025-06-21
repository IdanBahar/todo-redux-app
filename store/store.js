import { todoReducer } from './reducers/todo.reducer.js'

const { createStore, combineReducers } = Redux

const rootReducer = combineReducers({
  todosModule: todoReducer,
})

export const store = createStore(rootReducer)
