import { useCallback, useRef, useState } from 'react'

export const useToast = () => {
  const [message, setMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const timerRef = useRef<number | null>(null)

  const showToast = useCallback((nextMessage: string) => {
    setMessage(nextMessage)
    setIsVisible(true)

    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
    }

    timerRef.current = window.setTimeout(() => {
      setIsVisible(false)
    }, 2500)
  }, [])

  return {
    toastMessage: message,
    isToastVisible: isVisible,
    showToast,
  }
}
