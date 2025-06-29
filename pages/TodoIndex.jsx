import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { DataTable } from '../cmps/data-table/DataTable.jsx'
import { todoService } from '../services/todo.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import {
  loadTodos,
  removeTodo,
  saveTodo,
  setLoading,
} from '../store/actions/todo.action.js'
import { setFilterBy } from '../store/actions/todo.action.js'
import { userService } from '../services/user.service.js'
import { Loading } from '../cmps/Loading.jsx'

const { useSelector, useDispatch } = ReactRedux
const { useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
  const todos = useSelector((state) => state.todosModule.todos)
  const user = useSelector((state) => state.userModule.loggedInUser)
  const filterBy = useSelector((state) => state.todosModule.filterBy)
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.todosModule.isLoading)
  // console.log('isLoading:', isLoading)
  function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
  }

  //   const [todos, setTodos] = useState(null)
  let filteredTodos = todos

  if (filterBy.status === 'active') {
    filteredTodos = todos.filter((todo) => !todo.isDone)
  } else if (filterBy.status === 'done') {
    filteredTodos = todos.filter((todo) => todo.isDone)
  }
  // Special hook for accessing search-params:
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

  useEffect(() => {
    if (!todos.length) setLoading(true)
    setTimeout(() => {
      setLoading(true)
    }, 3000)
    setSearchParams(filterBy)

    todoService
      .query(filterBy)
      .then((todos) => {
        dispatch({ type: 'SET_TODOS', todos })
      })
      .catch((err) => {
        console.error('Cannot load todos', err)
      })
      .finally(() => setLoading(false))
  }, [filterBy]) // export to other function

  function onRemoveTodo(todoId) {
    removeTodo(todoId)
      .then(() => {
        showSuccessMsg('Todo Removed!')
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Couldnt remove todo' + todoId)
      })
  }

  function onToggleTodo(todo) {
    const todoToSave = {
      ...todo,
      isDone: !todo.isDone,
    }
    // if (!todo.isDone) updateUserBalance(10)

    saveTodo(todoToSave)
      .then((savedTodo) => {
        userService.updateBalance(10).then((updatedUser) => {
          dispatch({ type: 'SET_USER', user: updatedUser })
        })
        loadTodos(filterBy)
        showSuccessMsg(
          `Todo is ${savedTodo.isDone ? 'done' : 'back on your list'}`
        )
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot toggle todo ' + todo._id)
      })
  }

  if (isLoading && !todos.length) return <Loading />
  return (
    <section className='todo-index'>
      <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

      {/* <div></div> */}
      <h2>Todos List</h2>
      <TodoList
        todos={filteredTodos}
        onRemoveTodo={onRemoveTodo}
        onToggleTodo={onToggleTodo}
      />
      <hr />
      <h2>Todos Table</h2>
      <div style={{ width: '60%', margin: 'auto' }}>
        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
      </div>
    </section>
  )
}
