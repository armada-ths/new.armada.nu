import { Page } from "@/components/shared/Page"
import { Button } from "@/components/ui/button"

export default function ForExhibitorsPage() {
	return (
		<Page.Background withIndents>
			<Page.Boundary maxWidth={600}>
				<Page.Header tier="primary">For Exhibitors</Page.Header>
				<div className="h-4" />

				<div className="flex flex-col space-y-4">
					<div className="mt-2 flex flex-row flex-wrap justify-stretch gap-4 ">
						<a href="https://register.armada.nu/register">
							<Button>Signup to armada</Button>
						</a>
						<a href="/exhibitor/packages">
							<Button variant={"secondary"} className="dark:bg-liqorice-700">
								Packages
							</Button>
						</a>
						<a href="/exhibitor/timeline">
							<Button variant={"secondary"} className="dark:bg-liqorice-700">
								Timeline
							</Button>
						</a>
						<a href="/exhibitor/why_kth">
							<Button variant={"secondary"} className="dark:bg-liqorice-700">
								Why KTH
							</Button>
						</a>
					</div>
				</div>
				<div className="mt-4">
					<p>text here</p>
				</div>
			</Page.Boundary>
		</Page.Background>
	)
}
