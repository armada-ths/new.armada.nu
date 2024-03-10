import { env } from "@/env"
import { useQuery } from "@tanstack/react-query"

export interface Recruitment {
	name: string
	link: string
	start_date: string
	end_date: string
	groups: Record<string, RecruitmentGroup[]>
}

interface RecruitmentGroup {
	name: string
	parent: null
	description: string
}

export async function fetchRecruitment(options?: RequestInit) {
	const res = await fetch(
		`${env.NEXT_PUBLIC_API_URL}/api/recruitment`,
		options ?? {
			cache: "no-cache"
		}
	)
	const result = await res.json()
	if (result == null || !Array.isArray(result) || result.length <= 0)
		return null
	return result[0] as Recruitment
}

export function useRecruitment(options?: RequestInit) {
	return useQuery({
		queryKey: ["recruitment"],
		queryFn: () => fetchRecruitment(options)
	})
}
