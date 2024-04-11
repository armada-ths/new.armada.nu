import { P } from "@/app/_components/Paragraph"
import { Page } from "@/components/shared/Page"
import { fetchRecruitment } from "@/components/shared/hooks/api/useRecruitment"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { env } from "@/env"
import { DateTime } from "luxon"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
export const metadata: Metadata = {
	title: `Armada Recruitment`,
	description: "See available roles and apply to become a part of Armada"
}

export default async function RecruitmentPage() {
	const data = await fetchRecruitment({
		next: {
			revalidate: 3600 * 3 // 3 hours
		}
	})

	if (data == null) {
		return (
			<Page.Background withIndents>
				<Page.Boundary>
					<Page.Header>Armada Recruitment</Page.Header>
					<Page.Header tier="secondary">
						No available roles at the moment
					</Page.Header>
				</Page.Boundary>
			</Page.Background>
		)
	}

	return (
		<Page.Background withIndents>
			<Page.Boundary maxWidth={750}>
				<Page.Header>Armada Recruitment</Page.Header>
				<div className="mb-32 flex flex-1 flex-col">
					<Page.Header tier="secondary">
						Available roles - Open{" "}
						{DateTime.fromISO(data.start_date).toFormat("d MMM")} -{" "}
						{DateTime.fromISO(data.end_date).toFormat("d MMM")}
					</Page.Header>
					<div>
						<div className="mt-8 flex flex-wrap justify-between">
							<Image
								src={"/fair_pictures/23031965122_efd3a80707_c.jpg"}
								alt={"temp"}
								width={800}
								height={533}
								className="mb-4 aspect-square object-cover transition-all duration-200 hover:scale-105 md:w-1/4 md:p-1"
								style={{
									maxWidth: "48%",
									height: "auto"
								}}
							/>
							<Image
								src={"/fair_pictures/52520331777_e86eca961c_c.jpg"}
								alt={"temp"}
								width={533}
								height={800}
								className="mb-4 aspect-square object-cover transition-all duration-200 hover:scale-105 md:w-1/4 md:p-1"
								style={{
									maxWidth: "48%",
									height: "auto"
								}}
							/>
							<Image
								src={"/fair_pictures/52521081094_8f551d2114_c.jpg"}
								alt={"temp"}
								width={800}
								height={533}
								className="mb-4 aspect-square object-cover transition-all duration-200 hover:scale-105 md:w-1/4 md:p-1"
								style={{
									maxWidth: "48%",
									height: "auto"
								}}
							/>
							<Image
								src={"/fair_pictures/52520926612_8f5d642178_c.jpg"}
								alt={"temp"}
								width={800}
								height={533}
								className="mb-4 aspect-square object-cover transition-all duration-200 hover:scale-105 md:w-1/4 md:p-1"
								style={{
									maxWidth: "48%",
									height: "auto"
								}}
							/>
						</div>
					</div>

					<div className="m-8 flex justify-center">
						<a href={`${env.NEXT_PUBLIC_API_URL}${data.link}`}>
							<Button size={"lg"}>
								Apply for Armada {DateTime.now().year}
							</Button>
						</a>
					</div>
					<Alert className="my-5">
						<AlertTitle>Be an Armada volunteer</AlertTitle>
						<AlertDescription>
							In Armada over 200 volunteers join together to create one of
							KTH&apos;s biggest happenings. Take the opportunity to meet new
							friends, expand your network and be a part of something you can be
							really proud of!
						</AlertDescription>
					</Alert>
					<div>
						<P className="mt-4">
							Armada is a rapidly growing organization that goes from 1 person
							to over 200 each year. Now you have the chance to be part of this
							amazing community of ambitious people who want to create something
							amazing: A huge career fair for all students at KTH!
						</P>
						<P className="mt-4">
							Armada offers you a chance to meet students from all different
							chapters, get valuable experience on your CV, get closer to the
							exhibitors and have a lot of fun!
						</P>
						<P className="mt-4">
							Below you can read more about different roles and you can get to
							know the Armada organization better{" "}
							<Link
								className="text-white underline hover:no-underline"
								href="/about">
								here
							</Link>
							. If you have any questions you can contact the Head of HR.
						</P>
					</div>
					<div className="flex-1">
						<Accordion type="single" collapsible>
							{Object.entries(data.groups).map(([name, group], index) => (
								<div key={index} className="mt-10">
									<Page.Header tier="secondary">
										{name.split("-")[1]}
									</Page.Header>
									{group.map(role => (
										<AccordionItem key={role.name} value={role.name}>
											<AccordionTrigger>{role.name}</AccordionTrigger>
											<AccordionContent>
												{role.description.split("\n").map(line =>
													line.trimStart().startsWith("#") ? (
														<P
															key={line}
															className="text-base font-bold leading-7">
															{line.replace("#", "").trimStart()}
														</P>
													) : (
														<P key={line} className="leading-7">
															{line}
														</P>
													)
												)}
											</AccordionContent>
										</AccordionItem>
									))}
								</div>
							))}
						</Accordion>
					</div>
				</div>
			</Page.Boundary>
		</Page.Background>
	)
}
