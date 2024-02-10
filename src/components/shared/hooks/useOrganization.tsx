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

export function useOrganization() {
	return useQuery({
		queryKey: ["recruitment"],
		queryFn: async () => {
			const res = await fetch(
				`${env.NEXT_PUBLIC_API_URL}/api/organization/v2`,
				{
					cache: "force-cache"
				}
			)
			const result = await res.json()
			return result as Organization[]
		}
	})
}
