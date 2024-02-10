import { Page } from "@/components/shared/Page"

export default function Packages() {
	return (
		<Page.Background withIndents>
			<Page.Boundary>
				<Page.Header>Packages</Page.Header>
				<div className="mt-10 flex flex-1 flex-col">
					<div className="mt-2 flex flex-col flex-wrap justify-stretch gap-10 md:flex-row">
						<div className="flex flex-col rounded-lg bg-orange-950 p-5 md:flex-1">
							<h3 className="font-lato text-2xl text-orange-500">Bronze</h3>
							<p className="mt-2 font-lato text-orange-600">
								Our most affordable and standard package
							</p>
						</div>
						<div className="flex flex-col rounded-lg bg-zinc-800 p-5 md:flex-1">
							<h3 className="font-lato text-2xl text-zinc-400">Silver</h3>
							<p className="mt-2 font-lato text-zinc-500">
								Get a little extra attention with our silver package
							</p>
						</div>
						<div className="flex flex-col rounded-lg bg-yellow-800 p-5 md:flex-1">
							<h3 className="font-lato text-2xl text-yellow-400">Gold</h3>
							<p className="mt-2 font-lato text-yellow-500">
								Get a little extra attention with our silver package
							</p>
						</div>
					</div>
				</div>
			</Page.Boundary>
		</Page.Background>
	)
}
