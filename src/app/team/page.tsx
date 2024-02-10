import { PeopleList } from "@/app/team/_components/PeopleList"
import { Page } from "@/components/shared/Page"
import { fetchOrganization } from "@/components/shared/hooks/useOrganization"
import {
	HydrationBoundary,
	QueryClient,
	dehydrate
} from "@tanstack/react-query"

export default async function TeamPage() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ["organization"],
		queryFn: fetchOrganization
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Page.Background withIndents className="justify-start">
				<Page.Boundary>
					<Page.Header>Meet the team</Page.Header>
					<PeopleList />
				</Page.Boundary>
				<div className="h-20" />
			</Page.Background>
		</HydrationBoundary>
	)
}
