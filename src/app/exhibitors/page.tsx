import { ExhibitorList } from "@/app/exhibitors/_components/ExhibitorList"
import { Page } from "@/components/shared/Page"
import { fetchAllYearExhibitors } from "@/components/shared/hooks/api/useExhibitors"

export default async function ExhibitorListPage() {
	const exhibitors = await fetchAllYearExhibitors()

	return (
		<Page.Background withIndents>
			<Page.Boundary>
				<Page.Header>Exhibitors</Page.Header>
				<ExhibitorList exhibitorYears={exhibitors} />
			</Page.Boundary>
		</Page.Background>
	)
}
