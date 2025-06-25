import { getImportanceLevel } from '../services/util.service.js'

export function TodoPreview({ todo, onToggleTodo }) {
  return (
    <article className='todo-preview'>
      <h2 className={todo.isDone ? 'done' : ''} onClick={onToggleTodo}>
        Todo: {todo.txt}
      </h2>
      <h4>{getImportanceLevel(todo.importance) + ' ' + todo.importance}</h4>
      {/* <img src={`../assets/img/${'todo'}.png`} alt='' /> */}
    </article>
  )
}
