import { useEffect, useState } from 'react'
import type { AppDispatch, RootState } from './redux/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// export const useAppDispatch = () => useAppDispatch<AppDispatch>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
