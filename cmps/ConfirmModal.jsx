const { useState, useEffect } = React
import { eventBusService } from '../services/event-bus.service.js'
export function ConfirmModal() {
  const [isShown, setIsShown] = useState(false)
  const [msg, setMsg] = useState({ title: '', question: '' })
  const [onConfirm, setOnConfirm] = useState(() => {})

  useEffect(() => {
    const unsubscribe = eventBusService.on('confirm', (event) => {
      setMsg(event.msg) // msg = { title, question }
      setOnConfirm(() => event.onConfirm)
      setIsShown(true)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (ev) => {
      if (!isShown) return

      if (ev.key === 'Enter') {
        ev.preventDefault()
        handleConfirm()
      } else if (ev.key === 'Escape') {
        ev.preventDefault()
        handleCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isShown, onConfirm])

  function handleConfirm() {
    onConfirm()
    setIsShown(false)
  }
  function handleCancel() {
    setIsShown(false)
  }
  if (!isShown) return null

  return (
    <section className='modal-message'>
      <div className='modal'>
        <h2>{msg.title}</h2>
        <p>{msg.question}</p>
        <div>
          <button onClick={handleConfirm}>Yes</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </section>
  )
}
