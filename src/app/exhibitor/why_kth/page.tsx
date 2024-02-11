import { Page } from "@/components/shared/Page"

export default function WhyKTHPage() {
	return (
		<Page.Background withIndents>
			<Page.Boundary maxWidth={600}>
				<Page.Header>Why KTH?</Page.Header>
				<div className="h-5" />
				<p className="leading-8 text-stone-400">
					KTH Royal Institute of Technology, Sweden&apos;s premier technical
					university, embodies excellence with a royal legacy. Home to 20,000 of
					the nation&apos;s brightest minds, KTH students are known for their
					academic rigor and real-world applicability. Engaging with these
					students means connecting with future leaders poised to innovate and
					excel in the global industry. As fellow students at Armada, we see
					firsthand the remarkable potential these individuals bring to any
					field.
				</p>
			</Page.Boundary>
		</Page.Background>
	)
}
