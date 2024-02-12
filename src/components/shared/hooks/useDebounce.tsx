import { useEffect, useRef, useState } from "react"

export function useDebounce<T>(
	value: T,
	callback: (value: T) => void,
	options?: {
		timeout?: number
	}
) {
	const initialized = useRef(false)
	const timeout = useRef<NodeJS.Timeout>()

	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true
			return
		}

		clearTimeout(timeout.current)
		timeout.current = setTimeout(() => callback(value), options?.timeout ?? 150)
		return () => clearTimeout(timeout.current)

		// We don't want to include the callback in the dependecy array
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, options?.timeout])
}

export function useDebounceValue<T>(
	value: T,
	options?: {
		timeout?: number
	}
) {
	const initialized = useRef(false)
	const timeout = useRef<NodeJS.Timeout>()
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true
			return
		}
		clearTimeout(timeout.current)
		timeout.current = setTimeout(
			() => setDebouncedValue(value),
			options?.timeout ?? 100
		)
		return () => clearTimeout(timeout.current)
	}, [value, options?.timeout])

	return debouncedValue
}
