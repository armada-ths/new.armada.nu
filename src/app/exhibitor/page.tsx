import { CurrentStatus } from "@/app/exhibitor/_components/CurrentStatus"
import { PhotoCarousel } from "@/app/exhibitor/_components/PhotoCarousel"
import { Page } from "@/components/shared/Page"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: `Become an exhibitor at Armada`
}

export default function ForExhibitorsPage() {
	const numberFormat = Intl.NumberFormat("sv")
	return (
		<Page.Background withIndents>
			<Page.Boundary maxWidth={600} className="pb-20">
				<Page.Header tier="primary">Why Armada</Page.Header>
				<div className="h-4" />

				<div className="flex w-full flex-col space-y-4">
					<div className="mt-2 flex w-full flex-row flex-wrap justify-between gap-4 bg-melon-700 p-6 text-center md:text-2xl">
						<div className="w-3/12  font-bebas-neue font-medium text-stone-900">
							<p className="text-2xl md:text-4xl">
								{numberFormat.format(20000)}+
							</p>
							<p>visits</p>
						</div>
						<div className=" w-3/12  font-bebas-neue font-medium text-stone-900">
							<p className="text-2xl md:text-4xl">
								{numberFormat.format(15000)}
							</p>
							<p>Students</p>
						</div>
						<div className=" w-3/12 font-bebas-neue font-medium text-stone-900">
							<p className="text-2xl md:text-4xl">2 days</p>
							<p>of networking</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col space-y-4 py-6">
					<div className="mt-2 flex flex-row flex-wrap justify-stretch gap-4 ">
						<a href="https://register.armada.nu/register">
							<Button>Signup to Armada</Button>
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
					</div>
					<p className="text-xs text-slate-400">
						Or{" "}
						<a
							className="text-white underline hover:no-underline"
							href="mailto:sales@armada.nu">
							contact sales
						</a>{" "}
						if you have any questions
					</p>
				</div>
				<div className="mt-2">
					<CurrentStatus />
				</div>
				<section className="flex flex-col gap-y-10">
					<div className="mt-6">
						<h2 className="font-bebas-neue text-3xl font-medium text-melon-700">
							New students, every year!
						</h2>
						<p className="text-stone-300">
							Every year, around 4000 new students come to KTH. Almost as many
							students get their first full time job or internship.
							Participating in Armada means you get access to all of them, and
							can both build awareness among younger students and be top of mind
							when the older students start looking for a job. Welcome!
						</p>
					</div>

					<div className="mt-6">
						<h2 className="font-bebas-neue text-3xl font-medium text-melon-700">
							Do you write &quot;we place high importance on your personal
							character&quot; in job ads?
						</h2>
						<p className="text-stone-300">
							Armada realizes that what you study does not always decide where
							you end up in your career. Employers today must be attractive to a
							broad range of workers to recruit a diverse team and because you
							never know, your next star employee might have a different degree
							than you thought!
						</p>
					</div>
					<div className="mt-6">
						<h2 className="font-bebas-neue text-3xl font-medium text-melon-700">
							Skills you need, from all ends of KTH
						</h2>
						<p className="text-stone-300">
							Did you know that there are at least 5 programmes at KTH teaching
							computer science and students from more than 3 programmes can call
							themselves “mechanical engineers” when applying for jobs?
						</p>
					</div>
				</section>
				<div className="mt-6 flex justify-center">
					<PhotoCarousel />
				</div>
			</Page.Boundary>
		</Page.Background>
	)
}
