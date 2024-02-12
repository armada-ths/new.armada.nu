import { ExhibitorList } from "@/app/exhibitors/_components/ExhibitorList"
import { Page } from "@/components/shared/Page"
import { fetchExhibitors } from "@/components/shared/hooks/api/useExhibitors"

export default async function ExhibitorListPage() {
	const exhibitors = await fetchExhibitors()

	return (
		<Page.Background withIndents>
			<Page.Boundary>
				<Page.Header>Exhibitors</Page.Header>
				<ExhibitorList exhibitors={exhibitors} />
			</Page.Boundary>
		</Page.Background>
	)
}
