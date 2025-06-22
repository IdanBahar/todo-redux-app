import { loadingReducer } from './reducers/loading.reducer.js'
import { todoReducer } from './reducers/todo.reducer.js'

const { createStore, combineReducers } = Redux

const rootReducer = combineReducers({
  todosModule: todoReducer,
  appModule: loadingReducer,
})

export const store = createStore(rootReducer)
