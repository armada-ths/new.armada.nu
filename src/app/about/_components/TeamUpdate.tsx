"use client"
import TeamUpdateList from "@/app/about/_components/TeamUpdateList"
import { Organization } from "@/components/shared/hooks/api/useOrganization"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { useState } from "react"

const TeamUpdate = (organization: Organization) => {
	const [updateTeam, setUpdateTeam] = useState(false)

	const handleButtonClick = () => {
		setUpdateTeam(prevState => !prevState)
	}

	const projectGroup = organization.people.filter(
		person =>
			person.role.includes("Project Group") ||
			person.role.includes("Project Manager")
	)
	const operationTeam = organization.people.filter(person =>
		person.role.includes("Operation Team")
	)

	return (
		<div key={organization.name} className="mt-16">
			<h2 className="font-bebas-neue text-3xl">{organization.name}</h2>
			<div className="mt-5 flex flex-wrap items-start justify-center gap-6 md:justify-start">
				{projectGroup.map(person => (
					<>
						<TeamUpdateList
							id={person.id}
							name={person.name}
							email={person.email}
							picture={person.picture}
							linkedin_url={person.linkedin_url}
							programme={person.programme}
							role={person.role}
						/>
					</>
				))}
				{updateTeam
					? operationTeam.map(person => (
							<TeamUpdateList
								key={person.id}
								id={person.id}
								name={person.name}
								email={person.email}
								picture={person.picture}
								linkedin_url={person.linkedin_url}
								programme={person.programme}
								role={person.role}
							/>
						))
					: null}
				<div className="my-20 flex justify-center">
					{organization.name === "Project Manager" ? null : (
						<Button
							variant={"secondary"}
							className="dark:bg-liqorice-700"
							onClick={handleButtonClick}>
							{updateTeam ? (
								<>
									<ArrowLeftIcon className="mr-4 h-4 w-4" />
									See Less Members
								</>
							) : (
								<>
									See More Members
									<ArrowRightIcon className="ml-4 h-4 w-4" />
								</>
							)}
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default TeamUpdate
