"use client"

import { Page } from "@/components/shared/Page"
import { useRecruitment } from "@/components/shared/hooks/api/useRecruitment"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { env } from "@/env"
import { DateTime } from "luxon"

export function RecruitmentList() {
	const { data, isLoading } = useRecruitment()
	if (isLoading) return <p>Loading...</p>

	if (data == null) {
		return (
			<Page.Header tier="secondary">
				No available roles at the moment
			</Page.Header>
		)
	}

	return (
		<div className="mb-32 flex flex-1 flex-col">
			<Page.Header tier="secondary">
				Available roles - Open{" "}
				{DateTime.fromISO(data.start_date).toFormat("d MMM")} -{" "}
				{DateTime.fromISO(data.end_date).toFormat("d MMM")}
			</Page.Header>

			<div className="mt-10 flex justify-center">
				<a href={`${env.NEXT_PUBLIC_API_URL}${data.link}`}>
					<Button size={"lg"}>Apply for Armada {DateTime.now().year}</Button>
				</a>
			</div>

			<div className="flex-1">
				<Accordion type="single" collapsible>
					{Object.entries(data.groups).map(([name, group], index) => (
						<div key={index} className="mt-10">
							<Page.Header tier="secondary">{name.split("-")[1]}</Page.Header>
							{group.map(role => (
								<AccordionItem key={role.name} value={role.name}>
									<AccordionTrigger>{role.name}</AccordionTrigger>
									<AccordionContent>
										<p>{role.description}</p>
									</AccordionContent>
								</AccordionItem>
							))}
						</div>
					))}
				</Accordion>
			</div>
		</div>
	)
}
