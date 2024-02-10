import { PeopleList } from "@/app/team/_components/PeopleList"
import { PageBackground } from "@/components/shared/PageBackground"
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
			<PageBackground withIndents className="justify-start">
				<div className="mt-10 flex w-full flex-1 flex-col">
					<h1 className="font-bebas-neue text-5xl text-melon-700">
						Meet the Team
					</h1>
					<PeopleList />
				</div>
				<div className="h-20" />
			</PageBackground>
		</HydrationBoundary>
	)
}
