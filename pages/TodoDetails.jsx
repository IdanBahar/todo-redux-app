import { todoService } from '../services/todo.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { Loading } from '../cmps/Loading.jsx'
import { setLoading } from '../store/actions/todo.action.js'
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoDetails() {
  const [todo, setTodo] = useState(null)
  const params = useParams()
  const navigate = useNavigate()
  const isLoading = useSelector((state) => state.todosModule.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    loadTodo()
  }, [params.todoId])

  function loadTodo() {
    dispatch(setLoading(true))
    todoService
      .get(params.todoId)
      .then(setTodo)
      .catch((err) => {
        console.error('err:', err)
        showErrorMsg('Cannot load todo')
        navigate('/todo')
      })
      .finally(() => dispatch(setLoading(false)))
  }

  function onBack() {
    // If nothing to do here, better use a Link
    navigate('/todo')
    // navigate(-1)
  }

  if (isLoading || !todo) return <Loading />
  return (
    <section className='todo-details'>
      <h1 className={todo.isDone ? 'done' : ''}>{todo.txt}</h1>
      <h2>{todo.isDone ? 'Done!' : 'In your list'}</h2>

      <h1>Todo importance: {todo.importance}</h1>
      <p>what exctly you wanted to see here?</p>
      <button onClick={onBack}>Back to list</button>
      <div>
        <Link to={`/todo/${todo.nextTodoId}`}>Next Todo</Link> |
        <Link to={`/todo/${todo.prevTodoId}`}>Previous Todo</Link>
      </div>
    </section>
  )
}
