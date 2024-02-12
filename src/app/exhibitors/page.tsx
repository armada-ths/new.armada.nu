import { ExhibitorList } from "@/app/exhibitors/_components/ExhibitorList"
import { Page } from "@/components/shared/Page"
import { fetchExhibitors } from "@/components/shared/hooks/api/useExhibitors"
import {
	HydrationBoundary,
	QueryClient,
	dehydrate
} from "@tanstack/react-query"

export default async function ExhibitorListPage() {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery({
		queryKey: ["exhibitors"],
		queryFn: async () => fetchExhibitors()
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Page.Background withIndents>
				<Page.Boundary>
					<Page.Header>Exhibitors</Page.Header>
					<ExhibitorList />
				</Page.Boundary>
			</Page.Background>
		</HydrationBoundary>
	)
}
