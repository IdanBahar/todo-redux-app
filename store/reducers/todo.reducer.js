export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

const initalState = {
  todos: [],
}

export function todoReducer(state = initalState, cmd) {
  switch (cmd.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: cmd.todos,
      }
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== cmd.todoId),
      }
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, cmd.todo],
      }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((currTodo) => {
          currTodo._id === cmd.todo._id ? cmd.todo : currTodo
        }),
      }

    default:
      return state
  }
}
