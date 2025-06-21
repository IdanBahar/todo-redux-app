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
          <li key={todo._id}>
            <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
            <section>
              <button
                onClick={() =>
                  showConfirmMsg(
                    'Are you sure you want to delete this todo?',
                    () => {
                      removeTodo(todo._id)
                    }
                  )
                }
              >
                Remove
              </button>
              <button>
                <Link to={`/todo/${todo._id}`}>Details</Link>
              </button>
              <button>
                <Link to={`/todo/edit/${todo._id}`}>Edit</Link>
              </button>
            </section>
          </li>
        )
      })}
    </ul>
  )
}
