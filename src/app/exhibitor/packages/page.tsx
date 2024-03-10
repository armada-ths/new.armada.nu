import { Page } from "@/components/shared/Page"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Sparkles } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: `Packages - Armada Exhibitor`,
	description:
		"The packages we offer for exhibitors at Armada. Choose between bronze, silver and gold."
}

export default async function Packages() {
	return (
		<Page.Background withIndents>
			<Page.Boundary className="pb-20">
				<div className="mx-auto max-w-[600px]">
					<Page.Header>Packages</Page.Header>
					<div className="mt-4">
						<p className="max-w-[500] text-stone-400">
							Armada has the following packages you can get. The bronze package
							is all the basics you need to exhibit at Armada. The silver
							package allows you to expand your presence and the Gold package
							makes you truly stand out from the rest through extra marketing.
						</p>
					</div>
					<Alert className="mt-8">
						<Sparkles size={20} />
						<AlertTitle>Did you know?</AlertTitle>
						<AlertDescription>
							When we asked the students after the fair which exhibitors they
							remembered, Gold exhibitors were 3 times as likely to be
							remembered compared to Bronze exhibitors!
						</AlertDescription>
					</Alert>
				</div>
				<div className="mt-10 flex flex-1 flex-col">
					<div className="mt-2 flex flex-col-reverse justify-stretch gap-10 md:flex-row">
						<div className="relative flex min-w-48 flex-1 flex-col rounded-lg bg-orange-950 p-5 pb-20">
							<h3 className="font-lato text-2xl text-orange-500">Bronze</h3>
							<ul className="mt-2 font-lato text-orange-600">
								<li className="my-2">Host</li>
								<li className="my-2">3x2 m booth</li>
								<li className="my-2">Armada transport</li>
								<li className="my-2">Lunch for 4 people</li>
							</ul>
							<div className="absolute bottom-4">
								<p className="text-s">Early bird price:</p>
								<p>46 000 SEK*</p>
							</div>
							{/* 							<p className="absolute bottom-4">46 000 SEK*</p> */}
						</div>
						<div className="relative flex min-w-48 flex-1 flex-col rounded-lg bg-zinc-800 p-5 pb-20">
							<h3 className="font-lato text-2xl text-zinc-400">Silver</h3>
							<ul className="mt-2 font-lato text-zinc-500">
								<li className="my-2">Everything from bronze package</li>
								<li className="my-2">4x2 m booth</li>
								<li className="my-2">Second priority placement</li>
								<li className="my-2">Lunch for 6 people</li>
								<li className="my-2">2 banquet tickets</li>
								<li className="my-2">
									Silver Marketing, including a presentation post together on
									social media together with other exhibitors.
								</li>
							</ul>
							{/* 							<p className="absolute bottom-4">71 500 SEK*</p> */}
						</div>
						<div className="relative flex min-w-48 flex-1 flex-col rounded-lg bg-yellow-800 p-5 pb-20">
							<h3 className="font-lato text-2xl text-yellow-400">Gold</h3>
							<ul className="mt-2 font-lato text-yellow-500">
								<li className="my-2">Everything from silver package</li>
								<li className="my-2">5x2 m booth</li>
								<li className="my-2">First priority placement</li>
								<li className="my-2">Lunch for 8 people</li>
								<li className="my-2">4 banquet tickets</li>
								<li className="my-2">
									Complimentary participation in a panel discussion
								</li>
								<li className="my-2">Logo on Armada&apos;s website</li>
								<li className="my-2">
									Gold Marketing, including an exclusive presentation post on
									social media
								</li>
							</ul>
							{/* 							<p className="absolute bottom-4">108 500 SEK*</p> */}
						</div>
					</div>
				</div>
				<p className="mt-4 text-sm">*All prices are ex. VAT. </p>
				<div className="mx-auto mt-10 w-full max-w-[600px]">
					<h1 className="ml-2 text-2xl">FAQ</h1>
					<div>
						<Collapsible>
							<CollapsibleTrigger className="mt-2 w-full rounded p-2 pb-4 text-left hover:bg-slate-700">
								<div className="flex w-full justify-between ">
									<p className="text-xl">
										What does &quot;Priority placement&quot; mean?
									</p>
									<div className="flex h-8 w-8 items-center justify-center rounded-full">
										<ChevronsUpDown />
									</div>
								</div>
							</CollapsibleTrigger>
							<CollapsibleContent className="mt-2 p-2 text-stone-400">
								Priority placement means that we will place you in spots on the
								fair where there is good footfall. Gold exhibitors take the best
								spots and silver exhibitors are prioritized next. Contact{" "}
								<a
									className="text-white underline hover:no-underline"
									href="mailto:sales@armada.nu">
									sales@armada.nu
								</a>{" "}
								for more information.
							</CollapsibleContent>
						</Collapsible>
						<Collapsible>
							<CollapsibleTrigger className="w-full rounded p-2 pb-4 text-left hover:bg-slate-700">
								<div className="flex w-full justify-between ">
									<p className="text-xl">
										When is the deadline for initial registration?
									</p>
									<div className="flex h-8 w-8 items-center justify-center rounded-full">
										<ChevronsUpDown />
									</div>
								</div>
							</CollapsibleTrigger>
							<CollapsibleContent className="p-2 text-stone-400">
								<p>
									The initial registration ends {formatDate(dates.ir.end)}. See
									our{" "}
									<a
										className="text-white underline hover:no-underline"
										href="/exhibitor/timeline">
										timeline
									</a>{" "}
									for more information and other important dates.
								</p>
							</CollapsibleContent>
						</Collapsible>
						<Collapsible>
							<CollapsibleTrigger className="w-full rounded p-2 pb-4 text-left hover:bg-slate-700">
								<div className="flex w-full justify-between ">
									<p className="text-xl">How do I sign up for armada?</p>
									<div className="flex h-8 w-8 items-center justify-center rounded-full">
										<ChevronsUpDown />
									</div>
								</div>
							</CollapsibleTrigger>
							<CollapsibleContent className="p-2 text-stone-400">
								<p>You can sign up here:</p>
								<div className="my-4">
									<Link href="https://register.armada.nu/register">
										<Button>Signup to Armada</Button>
									</Link>
								</div>
								<p>
									If you have any questions, you can contact us at{" "}
									<Link
										className="text-white underline hover:no-underline"
										href="mailto:sales@armada.nu">
										sales@armada.nu
									</Link>
									.
								</p>
							</CollapsibleContent>
						</Collapsible>
					</div>
				</div>
			</Page.Boundary>
		</Page.Background>
	)
}
