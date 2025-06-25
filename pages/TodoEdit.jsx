import { todoService } from '../services/todo.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { saveTodo, setLoading } from '../store/actions/todo.action.js'
import { Loading } from '../cmps/Loading.jsx'

const { useState, useEffect } = React
const { useDispatch, useSelector } = ReactRedux
const { useNavigate, useParams } = ReactRouterDOM

export function TodoEdit() {
  const bgColors = ['#f8bcbc', '#bce6c4', '#c4d8f8', '#f8e6bc']
  const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())

  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const isLoading = useSelector(
    (storeState) => storeState.todosModule.isLoading
  )

  useEffect(() => {
    if (params.todoId) loadTodo()
  }, [])

  function loadTodo() {
    dispatch(setLoading(true))
    todoService
      .get(params.todoId)
      .then(setTodoToEdit)
      .catch((err) => console.log('err:', err))
      .finally(() => dispatch(setLoading(false)))
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setTodoToEdit((prevTodoToEdit) => ({ ...prevTodoToEdit, [field]: value }))
  }

  function onSaveTodo(ev) {
    ev.preventDefault()
    // console.log('todoToEdit before saving:', todoToEdit)
    saveTodo(todoToEdit)
      .then((savedTodo) => {
        console.log(`Todo saved! ${savedTodo._id}`)
        navigate('/todo')
        showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
      })
      .catch((err) => {
        showErrorMsg('Cannot save todo')
        console.log('err:', err)
      })
  }

  const { txt, importance, isDone } = todoToEdit
  if (isLoading) return <Loading />

  return (
    <section className='todo-edit'>
      <form
        onSubmit={onSaveTodo}
        style={
          todoToEdit.bgColor
            ? {
                background: `linear-gradient(135deg, ${todoToEdit.bgColor}, rgba(255, 255, 255, 1))`,
              }
            : {}
        }
      >
        <label htmlFor='txt'>
          Text:{' '}
          <input
            onChange={handleChange}
            value={txt}
            type='text'
            name='txt'
            id='txt'
          />
        </label>

        <label htmlFor='importance'>
          Importance:{' '}
          <input
            onChange={handleChange}
            value={importance}
            type='number'
            min='1'
            max='10'
            name='importance'
            id='importance'
          />
        </label>

        <label htmlFor='isDone'>
          Done:
          <input
            onChange={handleChange}
            value={isDone}
            type='checkbox'
            name='isDone'
            id='isDone'
          />
        </label>
        <div className='color-picker'>
          {bgColors.map((color) => (
            <div
              key={color}
              className={`color-circle ${
                todoToEdit.bgColor === color ? 'selected' : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={() =>
                setTodoToEdit((prev) => ({ ...prev, bgColor: color }))
              }
            ></div>
          ))}
        </div>

        <button>Save</button>
      </form>
    </section>
  )
}
