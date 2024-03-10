import { env } from "@/env"
import { useQuery } from "@tanstack/react-query"

export interface Organization {
	name: string
	people: Person[]
}

export interface Person {
	id: number
	name: string
	email: null | string
	picture: string
	linkedin_url: null | string
	programme: string
	role: string
}

export async function fetchOrganization(options?: RequestInit) {
	const res = await fetch(
		`${env.NEXT_PUBLIC_API_URL}/api/organization/v2`,
		options ?? {}
	)
	const result = await res.json()
	return result as Organization[]
}

export function useOrganization(options?: RequestInit) {
	return useQuery({
		queryKey: ["recruitment"],
		queryFn: () => fetchOrganization(options)
	})
}
