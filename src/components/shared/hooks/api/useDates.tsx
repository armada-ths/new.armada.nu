import { env } from "@/env"
import { useQuery } from "@tanstack/react-query"

interface FairDate {
	fair: {
		description: string
		days: string[]
	}
	ticket: {
		end: string | null
	}
	ir: {
		start: string
		end: string
	}
	fr: {
		start: string
		end: string
	}
}

export function useDates() {
	return useQuery({
		queryKey: ["dates"],
		queryFn: async () => {
			const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/dates`, {
				cache: "force-cache"
			})
			const result = await res.json()
			return result as FairDate
		}
	})
}
