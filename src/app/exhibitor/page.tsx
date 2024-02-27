import { Page } from "@/components/shared/Page"

export default function ForExhibitorsPage() {
	return (
		<Page.Background withIndents>
			<Page.Boundary maxWidth={600}>
				<Page.Header tier="primary">text here</Page.Header>
				<div className="h-5" />
				<p className="leading-8 text-stone-400">text here</p>
			</Page.Boundary>
		</Page.Background>
	)
}
