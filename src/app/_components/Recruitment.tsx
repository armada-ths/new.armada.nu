import { fetchRecruitment } from "@/components/shared/hooks/api/useRecruitment"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UserRoundIcon } from "lucide-react"
import Link from "next/link"

export async function RecruitmentBanner() {
	const recruitment = await fetchRecruitment({
		cache: "no-cache"
	})

	if (recruitment == null) return null

	return (
		<Link href="/student/recruitment">
			<Alert className="mt-0 cursor-pointer dark:hover:border-melon-700 dark:hover:border-opacity-50">
				<UserRoundIcon className="h-4 w-4" />
				<AlertTitle>Recruitment open!</AlertTitle>
				<AlertDescription>
					Apply to become a part of Armada 2024
				</AlertDescription>
			</Alert>
		</Link>
	)
}
