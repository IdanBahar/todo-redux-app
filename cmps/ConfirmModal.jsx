const { useState, useEffect } = React
import { eventBusService } from '../services/event-bus.service.js'
export function ConfirmModal() {
  const [isShown, setIsShown] = useState(false)
  const [msg, setMsg] = useState('')
  const [onConfirm, setOnConfirm] = useState(() => {})

  useEffect(() => {
    const unsubscribe = eventBusService.on('confirm', (event) => {
      setMsg(event.msg)
      setOnConfirm(() => event.onConfirm)
      setIsShown(true)
    })
    return () => unsubscribe()
  }, [])

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
        <p>{msg}</p>
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </section>
  )
}
