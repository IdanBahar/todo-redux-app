const { useSelector, useDispatch } = ReactRedux

import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { DataTable } from '../cmps/data-table/DataTable.jsx'
import { todoService } from '../services/todo.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadTodos, removeTodo } from '../store/actions/todo.action.js'
import { setFilterBy } from '../store/actions/todo.action.js'

const { useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
  const todos = useSelector((state) => state.todosModule.todos)
  const filterBy = useSelector((state) => state.todosModule.filterBy)
  const dispatch = useDispatch()

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
    setSearchParams(filterBy)
    loadTodos(filterBy)
  }, [filterBy])

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
    const todoToSave = { ...todo, isDone: !todo.isDone }
    todoService
      .save(todoToSave)
      .then((savedTodo) => {
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

  if (!todos) return <div>Loading...</div>
  return (
    <section className='todo-index'>
      <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <div>
        <Link to='/todo/edit' className='btn'>
          Add Todo
        </Link>
      </div>
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
