import { P } from "@/app/_components/Paragraph"
import { fetchDates } from "@/components/shared/hooks/api/useDates"
import { Button } from "@/components/ui/button"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import { DateTime } from "luxon"

export async function ExhibitorTimeline() {
	const dates = await fetchDates()
	const today = new Date()

	function formatDate(date: string) {
		return DateTime.fromISO(date).toFormat(
			`d MMMM ${DateTime.fromISO(date).year !== DateTime.now().year ? " YYYY" : ""}`
		)
	}

	//to remove?
	function titleRow(date: DateTime, title: String) {
		return (
			<div>
				<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-melon-700"></div>
				<P className="	text-stone-400">Before {formatDate(dates.ir.start)}</P>
				<div className="flex w-full justify-between ">
					<P className="text-2xl md:text-3xl">{title}</P>
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-melon-700">
						<div className="flex h-8 w-8 items-center justify-center rounded-full">
							<ChevronsUpDown />
						</div>
					</div>
				</div>
			</div>
		)
	}

	//ASSUMPTION: the start date will be first for fair dates
	return (
		<ol className="relative mt-10 border-s border-melon-700">
			<li className="mb-2 ms-4">
				<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-melon-700"></div>
				<Collapsible>
					<CollapsibleTrigger className="hover: w-full rounded px-2 pb-4 text-left hover:bg-slate-700">
						<P className="text-stone-400">
							Before {formatDate(dates.ir.start)}
						</P>

						<div className="flex w-full justify-between ">
							<h3 className="text-2xl md:text-3xl">Armada is setting up</h3>
							<div className="flex h-8 w-8 items-center justify-center rounded-full">
								<ChevronsUpDown />
							</div>
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent className="px-2">
						<div>
							<P className="mt-2 text-stone-400">
								Before the initial registration can open, we need to make
								preparations. We are right now choosing a new project group - 20
								something students who will work hard all year to make Armada
								happen.
							</P>
							<P className="mt-2 text-stone-400">
								We will open Initial Registration where you apply to be an
								exhibitor soon. You can express your interest here, and we will
								contact you as soon as registration opens!
							</P>
						</div>
					</CollapsibleContent>
				</Collapsible>
			</li>
			<li className="mb-2 ms-4">
				<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-melon-700"></div>

				<Collapsible>
					<CollapsibleTrigger className="hover: w-full rounded px-2 pb-4 text-left hover:bg-slate-700">
						<P className="text-stone-400">{formatDate(dates.ir.start)}</P>
						<div className="flex w-full justify-between ">
							<h3 className="text-2xl md:text-3xl">
								Initial registration starts
							</h3>
							<div className="flex h-8 w-8 items-center justify-center rounded-full">
								<ChevronsUpDown />
							</div>
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent className="px-2">
						<P className="mt-2 text-stone-400">
							Initial Registration is where you apply to be an exhibitor. When
							you register you commit to be a part of Armada and given a spot
							you are expected to exhibit, so wait with registration until you
							are sure. If you have any questions, do not hesitate to contact{" "}
							<a
								className="text-white underline hover:no-underline"
								href="mailto:sales@armada.nu">
								sales@armada.nu
							</a>
							.
						</P>
						<P className="mt-2 text-stone-400">
							Sadly, we cannot guarantee everyone that register a spot. We right
							now are investigating how many exhibitors we can fit and how big
							the interest is. We really try our best to get a good mix of great
							exhibitors that make Armada the best place for students to find
							their dream employer!
						</P>
						<P className="mt-2 text-stone-400">
							In Initial Registration you don&apos;t need to choose a package,
							and the packages are outlined{" "}
							<a
								className="text-white underline hover:no-underline"
								href="/exhibitor/packages">
								here
							</a>{" "}
							to give you an overview. Prices are set, and small changes can
							occur in the larger packages.
						</P>
						<div className="my-4">
							<a href="https://register.armada.nu/register">
								<Button>Signup to Armada</Button>
							</a>
						</div>
					</CollapsibleContent>
				</Collapsible>
			</li>
			<li className="mb-2 ms-4">
				<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-melon-700"></div>

				<Collapsible>
					<CollapsibleTrigger className="rounded px-2 pb-4 text-left">
						<P className="text-stone-400">{formatDate(dates.ir.end)}</P>
						<div className="flex w-full justify-between">
							<h3 className="text-2xl md:text-3xl">
								Initial registration ends
							</h3>
							<div className="flex h-8 w-8 items-center justify-center rounded-full"></div>
						</div>
					</CollapsibleTrigger>
				</Collapsible>
			</li>
			<li className="mb-2 ms-4">
				<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-melon-700"></div>

				<Collapsible>
					<CollapsibleTrigger className="hover: w-full rounded px-2 pb-4 text-left hover:bg-slate-700">
						<P className="	text-stone-400">{formatDate(dates.ir.acceptance)}</P>
						<div className="flex w-full justify-between">
							<h3 className="text-2xl md:text-3xl">Acceptance date</h3>
							<div className="flex h-8 w-8 items-center justify-center rounded-full">
								<ChevronsUpDown />
							</div>
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent className="px-2">
						<P className="text-stone-400">
							We will get back to everyone who made an initial registration by
							the {formatDate(dates.ir.end)}. This is when you will know 100%
							for sure that you are exhibiting at Armada. You will be informed
							by email to the person who made the final registration, and it
							will be visible on the dashboard for anyone with a login to your
							exhibitor&apos;s page.
						</P>
						<P className="text-stone-400">
							You can always check the status of your registration on the
							dashboard, and contact{" "}
							<a
								className="text-white underline hover:no-underline"
								href="mailto:sales@armada.nu">
								sales@armada.nu
							</a>
							. if you have any questions.
						</P>
					</CollapsibleContent>
				</Collapsible>
			</li>
			<li className="mb-2 ms-4">
				<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-melon-700"></div>

				<Collapsible>
					<CollapsibleTrigger className="hover: w-full rounded px-2 pb-4 text-left hover:bg-slate-700">
						<P className="	text-stone-400">{formatDate(dates.fr.start)}</P>
						<div className="flex w-full justify-between">
							<h3 className="text-2xl md:text-3xl">
								Final registration starts
							</h3>
							<div className="flex h-8 w-8 items-center justify-center rounded-full">
								<ChevronsUpDown />
							</div>
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent className="px-2">
						<P className="mt-2 text-stone-400">
							In Final Registration you choose your package, if you want to do
							any events, number of tickets for the banquet etc. All of this is
							done on the registration dashboard - same as where you did initial
							registration. Final Registration can be done by another person
							than Initial Registration.
						</P>
						<div className="my-4">
							<a href="https://register.armada.nu/register">
								<Button>Signup to Armada</Button>
							</a>
						</div>
						<P className="mt-2 text-stone-400">
							We have many different products that help you reach students on
							KTH in different ways. If you have any thoughts on what best suits
							you, please contact{" "}
							<a
								className="text-white underline hover:no-underline"
								href="mailto:sales@armada.nu">
								sales@armada.nu
							</a>{" "}
							or your sales representative and they&apos;ll guide you through
							it. Maybe you want to talk to a few students in a more cozy
							setting? Or stand out extra on the fair compared to everyone else?
							We can help you do that.
						</P>
					</CollapsibleContent>
				</Collapsible>
			</li>
			<li className="mb-2 ms-4">
				<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-melon-700"></div>

				<Collapsible>
					<CollapsibleTrigger className="rounded px-2 pb-4 text-left">
						<P className="	text-stone-400">{formatDate(dates.fr.end)}</P>
						<div className="flex w-full justify-between">
							<h3 className="text-2xl md:text-3xl">Final registration ends</h3>
							<div className="flex h-8 w-8 items-center justify-center rounded-full"></div>
						</div>
					</CollapsibleTrigger>
				</Collapsible>
			</li>

			{/*fair preperations*/}

			<li className="mb-2 ms-4">
				<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-melon-700"></div>
				<Collapsible>
					<CollapsibleTrigger className="hover: w-full rounded px-2 pb-4 text-left hover:bg-slate-700">
						<P className="	text-stone-400">{formatDate(dates.events.start)}</P>
						<div className="flex w-full justify-between">
							<h3 className="text-2xl md:text-3xl">Event period starts</h3>
							<div className="flex h-8 w-8 items-center justify-center rounded-full">
								<ChevronsUpDown />
							</div>
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent className="px-2">
						<P className="mt-2 text-stone-400">
							This is when the events happen. Three weeks filled of lunch
							lectures, after works, panel discussions and more. Building up the
							momentum before the fair, giving students and exhibitors the
							opportunity to meet in a focused environment.
						</P>
						<P>
							Armada run, the 5km race we organize with students and exhibitor
							representatives, is also happening during the event weeks.
						</P>
					</CollapsibleContent>
				</Collapsible>
			</li>
			<li className="mb-2 ms-4">
				<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-melon-700"></div>
				<Collapsible>
					<CollapsibleTrigger className="rounded px-2 pb-4 text-left">
						<P className="	text-stone-400">{formatDate(dates.events.end)}</P>
						<div className="flex w-full justify-between">
							<h3 className="text-2xl md:text-3xl">Event period ends</h3>
							<div className="flex h-8 w-8 items-center justify-center rounded-full"></div>
						</div>
					</CollapsibleTrigger>
				</Collapsible>
			</li>

			<li className="mb-2 ms-4">
				<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-melon-700"></div>

				<Collapsible>
					<CollapsibleTrigger className="hover: w-full rounded px-2 pb-4 text-left hover:bg-slate-700">
						<P className="	text-stone-400">{formatDate(dates.fair.days[0])}</P>
						<div className="flex w-full justify-between">
							<h3 className="text-2xl md:text-3xl">Armada fair starts</h3>
							<div className="flex h-8 w-8 items-center justify-center rounded-full">
								<ChevronsUpDown />
							</div>
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent className="px-2">
						<P className="mt-2 text-stone-400">
							The days we all have waited for! Four days Armada have worked
							together to build the fair venues and prepare everything! When you
							arrive in the morning, your Host meets you and shows you your
							spot. You’ll build your booth up from the materials already in
							place. Then you might go to the exhibitor lounge and have a
							sandwich and a cup of coffee to read those few emails and charge
							up before the fair!
						</P>
						<P className="mt-2 text-stone-400">
							At 10 the students start rolling in, and your brand will be on
							display. Some are looking for general career advice, some younger
							students just want to know who you are. Some wonder what
							consultants really do, and some have only one goal in mind -
							finding a master thesis.
						</P>
						<P className="mt-2 text-stone-400">
							Best of luck and we really look forward to seeing you there!
						</P>
					</CollapsibleContent>
				</Collapsible>
			</li>

			<li className="mb-2 ms-4">
				<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-melon-700"></div>

				<Collapsible>
					<CollapsibleTrigger className="rounded px-2 pb-4 text-left">
						<P className="	text-stone-400">{formatDate(dates.fair.days[1])}</P>
						<div className="flex w-full justify-between">
							<h3 className="text-2xl md:text-3xl">Armada fair ends</h3>
							<div className="flex h-8 w-8 items-center justify-center rounded-full"></div>
						</div>
					</CollapsibleTrigger>
				</Collapsible>
			</li>
		</ol>
	)
}
