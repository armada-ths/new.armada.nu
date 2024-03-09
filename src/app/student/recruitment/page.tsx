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

export default async function RecruitmentPage() {
	const data = await fetchRecruitment()

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

					<div className="mt-10 flex justify-center">
						<a href={`${env.NEXT_PUBLIC_API_URL}${data.link}`}>
							<Button size={"lg"}>
								Apply for Armada {DateTime.now().year}
							</Button>
						</a>
					</div>
					<Alert className="my-5">
						<AlertTitle>Be an Armada volunteer</AlertTitle>
						<AlertDescription>
							In Armada over 200 volunteers join together to create one of KTH
							biggest happenings. Take the opportunity to meet new friends,
							expand your network and be a part of something you can be really
							proud of!
						</AlertDescription>
					</Alert>

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
												<P className="leading-7">{role.description}</P>
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
