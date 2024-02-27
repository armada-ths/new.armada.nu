import { Page } from "@/components/shared/Page"
import { Button } from "@/components/ui/button"

export default function ForExhibitorsPage() {
	return (
		<Page.Background withIndents>
			<Page.Boundary maxWidth={600}>
				<Page.Header tier="primary">For Exhibitors</Page.Header>
				<div className="h-5" />
				<a href="https://register.armada.nu/register">
					<Button>Signup to be part of armada</Button>
				</a>
				<p className="leading-8 text-stone-400">text here</p>
				<p>timeline here</p>
			</Page.Boundary>
		</Page.Background>
	)
}
