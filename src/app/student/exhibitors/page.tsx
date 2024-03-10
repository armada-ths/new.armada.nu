import { ExhibitorList } from "@/app/student/exhibitors/_components/ExhibitorList"
import { Page } from "@/components/shared/Page"
import { fetchAllYearExhibitors } from "@/components/shared/hooks/api/useExhibitors"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
	title: `Armada exhibitors`,
	description: "See all the companies that are exhibiting at Armada"
}

export default async function ExhibitorListPage() {
	const exhibitors = await fetchAllYearExhibitors({
		cache: "default",
		next: {
			revalidate: 3600 * 24 * 6 // 6 days
		}
	})

	return (
		<Page.Background withIndents>
			<Page.Boundary>
				<Page.Header>Exhibitors</Page.Header>
				<Suspense>
					<ExhibitorList exhibitorYears={exhibitors} />
				</Suspense>
			</Page.Boundary>
		</Page.Background>
	)
}
