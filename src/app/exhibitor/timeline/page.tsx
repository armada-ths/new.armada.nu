import { ExhibitorTimeline } from "@/app/exhibitor/_components/ExhibitorTimeline"
import { Page } from "@/components/shared/Page"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: `Exhibitor Timeline`,
	description:
		"From signup to fair, see what happens, step by step as an exhibitor"
}

export default async function WhyArmadaPage() {
	return (
		<Page.Background withIndents>
			<Page.Boundary maxWidth={600} className="pb-20">
				<Page.Header>Timeline</Page.Header>
				<p className="mt-4 text-stone-400">
					Armada Registration is divided into 2 parts, Initial and Final.
					Initial registration is where you apply to exhibit at Armada, and in
					Final Registration you choose your package, events and other products.
					This is so we don’t overfill the fair, and so we can prepare the best
					possible products for you!
				</p>
				<ExhibitorTimeline />
				<div className="h-5" />
			</Page.Boundary>
		</Page.Background>
	)
	/*
	return (
		<Page.Background withIndents>
			<RegisterBanner />
			<Page.Boundary className="pb-20">
				<Page.Header>Timeline</Page.Header>
				<ExhibitorTimeline />
				<div className="h-5" />
				<h2>More in depth timeline</h2>
				<div>
					<h3>Armada is setting up - before 11th of Mars</h3>
					<p>
						Before the initial registration can open, we need to make
						preparations. We are right now choosing a new project group - 20
						something students who will work hard all year to make Armada
						happen.
					</p>
					<p>
						We will open Initial Registration where you apply to be an exhibitor
						soon. You can express your interest here, and we will contact you as
						soon as registration opens!
					</p>
				</div>
				<div>
					<h3>Initial Registration open - 11th of Mars to 24th of May</h3>
					<p>
						Initial Registration is where you apply to be an exhibitor. When you
						register you commit to be a part of Armada and given a spot you are
						expected to exhibit, so wait with registration until you are sure.
						If you have any questions, do not hesitate to contact{" "}
						<a
							className="text-blue-600 hover:underline"
							href="mailto:sales@armada.nu">
							sales@armada.nu
						</a>
						.
					</p>
					<p>
						Sadly, we cannot guarantee everyone that register a spot. We right
						now are investigating how many exhibitors we can fit and how big the
						interest is. We really try our best to get a good mix of great
						exhibitors that make Armada the best place for students to find
						their dream employer!
					</p>
					<p>
						In Initial Registration you don't need to choose a package, and the
						packages are outlined{" "}
						<a
							className="text-blue-600 hover:underline"
							href="/exhibitor/packages">
							here
						</a>{" "}
						to give you an overview. Prices are set, and small changes can occur
						in the larger packages.
					</p>
				</div>
				<div>
					<h3>Acceptance date - 7th of June.</h3>
					<p>
						We will get back to everyone who made an initial registration by the
						7th of June. This is when you will know 100% for sure that you are
						exhibiting at Armada. You will be informed by email to the person
						who made the final registration, and it will be visible on the
						dashboard for anyone with a login to your exhibitor's page.
					</p>
					<p>
						You can always check the status of your registration on the
						dashboard, and contact{" "}
						<a
							className="text-blue-600 hover:underline"
							href="mailto:sales@armada.nu">
							sales@armada.nu
						</a>
						. if you have any questions.
					</p>
				</div>
				<div></div>
			</Page.Boundary>
		</Page.Background>
	)
	*/
}
