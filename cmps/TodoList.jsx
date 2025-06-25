const { useSelector, useDispatch } = ReactRedux
import { showConfirmMsg } from '../services/event-bus.service.js'
import { removeTodo } from '../store/actions/todo.action.js'
import { TodoPreview } from './TodoPreview.jsx'

const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
  const dispatch = useDispatch()
  return (
    <ul className='todo-list'>
      {todos.map((todo) => {
        // console.log('Rendering todo:', todo._id, todo)
        return (
          <li
            key={todo._id}
            style={{
              background: todo.bgColor
                ? `linear-gradient(70deg, ${todo.bgColor}, rgba(148, 148, 148, 1))`
                : null,
            }}
          >
            <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
            <section className='buttons-container'>
              <button>
                <Link to={`/todo/${todo._id}`}>
                  <i className='fa-solid fa-circle-info'></i>
                </Link>
              </button>
              <button
                onClick={() =>
                  showConfirmMsg(
                    {
                      title: todo.txt,
                      question: 'Are you sure you want to delete this todo?',
                    },
                    () => {
                      removeTodo(todo._id)
                    }
                  )
                }
              >
                <i className='fa-solid fa-trash'></i>
              </button>

              <button>
                <Link to={`/todo/edit/${todo._id}`}>
                  <i className='fa-solid fa-pen-to-square'></i>
                </Link>
              </button>
            </section>
          </li>
        )
      })}
    </ul>
  )
}
