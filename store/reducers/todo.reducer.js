export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER = 'SET_FILTER'

const initalState = {
  todos: [],
  filterBy: 'all', // change the default values
  isLoading: false,
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
      if (!cmd.todo) return state
      return {
        ...state,
        todos: state.todos.map((currTodo) =>
          currTodo._id === cmd.todo._id ? cmd.todo : currTodo
        ),
      }
    case SET_FILTER:
      return {
        ...state,
        filterBy: cmd.filterBy,
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: cmd.isLoading,
      }

    default:
      return state
  }
}

// export function loadingReducer(state = initalState, cmd) {
//   switch (cmd.type) {
//     case 'SET_LOADING':
//       return {
//         ...state,
//         isLoading: cmd.isLoading,
//       }
//     default:
//       return state
//   }
// }
