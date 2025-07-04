import { todoReducer } from './reducers/todo.reducer.js'
import { userReducer } from './reducers/user.reducer.js'

const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
  todosModule: todoReducer,
  userModule: userReducer,
})

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose

export const store = createStore(rootReducer, composeEnchancers)
