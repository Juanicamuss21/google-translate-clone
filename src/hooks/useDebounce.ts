import { useEffect, useState } from 'react'

// el Debounce es un valor que espera un determinado tiempo antes de ser cambiado

// 1_Entender bien como esta funcionando el debounce
export function useDebounce<T> (value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => { clearTimeout(timer) }
  }, [value, delay])

  return debouncedValue
}
