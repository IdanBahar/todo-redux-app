import { store } from '../store.js'

export function setLoading(isLoading) {
  return store.dispatch({ type: 'SET_LOADING', isLoading })
}
