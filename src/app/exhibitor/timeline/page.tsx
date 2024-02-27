import { ExhibitorTimeline } from "@/app/exhibitor/_components/ExhibitorTimeline"
import { Page } from "@/components/shared/Page"

export default async function WhyKTHPage() {
	

	return (
		<Page.Background withIndents>
			<Page.Boundary maxWidth={600}>
				<Page.Header>Timeline</Page.Header>
				<div className="h-5" />
				<p className="leading-8 text-stone-400">text here</p>
				<ExhibitorTimeline />
			</Page.Boundary>
		</Page.Background>
	)
}
