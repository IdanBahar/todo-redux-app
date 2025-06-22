const initalState = {
  isLoading: false,
}

export function loadingReducer(state = initalState, cmd) {
  switch (cmd.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: cmd.isLoading,
      }
    default:
      return state
  }
}
