import { useEffect } from 'react'

export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · George's Workshop` : "George's Workshop"
  }, [title])
}
