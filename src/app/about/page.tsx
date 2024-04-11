import { P } from "@/app/_components/Paragraph"
import { Page } from "@/components/shared/Page"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: `About Armada`,
	description: "Learn more about Armada"
}

export default async function RecruitmentPage() {
	return (
		<Page.Background withIndents>
			<Page.Boundary maxWidth={750}>
				<Page.Header>About Armada</Page.Header>
				<P className="mt-4">
					Armada was founded in 1981 and has since then organized a career fair
					that has grown to become one of the largest in scandinavia. We exist
					to connect students to their dream employer and have since come up
					with different events and happenings to create personal connections
					between students and employers.
				</P>
				<P className="mt-4">
					Each year, Armada goes from 1 student, the Project Manager, to over
					200 student volunteers managing a fair over two days, in several
					locations and 20 000 visitors. As Armada is fully owned by{" "}
					<Link
						className="text-white underline hover:no-underline"
						href="/about">
						THS
					</Link>
					, the student union at KTH, any profit Armada makes goes back to the
					students, funding THS initiatives for a better student life.
				</P>
			</Page.Boundary>
		</Page.Background>
	)
}
