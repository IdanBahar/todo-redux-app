import { userService } from '../../services/user.service.js'

export const SET_USER = 'SET_USER'

const initalState = {
  loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = initalState, cmd) {
  switch (cmd.type) {
    case SET_USER:
      return { ...state, loggedInUser: cmd.user }

    default:
      return state
  }
}
