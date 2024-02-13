import { ExhibitorList } from "@/app/student/exhibitors/_components/ExhibitorList"
import { Page } from "@/components/shared/Page"
import { fetchAllYearExhibitors } from "@/components/shared/hooks/api/useExhibitors"
import { Suspense } from "react"

export default async function ExhibitorListPage() {
	const exhibitors = await fetchAllYearExhibitors()

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
