"use client"
import { useOrganization } from "@/components/shared/hooks/api/useOrganization"
import { PersonIcon } from "@radix-ui/react-icons"
import { LinkedinIcon, MailIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function PeopleList() {
	const { data, isLoading } = useOrganization()

	if (isLoading || data == null) return null

	return (
		<div className="">
			{data.map(group => (
				<div key={group.name} className="mt-16">
					<h2 className="font-bebas-neue text-3xl">{group.name}</h2>
					<div className="mt-5 flex flex-wrap items-center justify-center gap-6 md:justify-start">
						{group.people.map(person => (
							<div key={person.id} className="w-52">
								{person.picture == null ||
								person.picture.includes("no-image") ? (
									<div className="flex aspect-square w-52 flex-1 items-center justify-center">
										<PersonIcon className="m-auto h-20 w-20 text-melon-700" />
									</div>
								) : (
									<div className="overflow-hidden rounded-lg">
										<Image
											src={person.picture}
											alt={person.name}
											// Width and height doesn't matter since we're using "unoptimized" images
											// due to have output type "export"
											width={0}
											height={0}
											className="aspect-square w-full object-cover transition-all duration-200 hover:scale-105"
										/>
									</div>
								)}
								<div className="mt-2">
									<p className="text-melon-700">{person.name}</p>
									<p className="mt-1 text-sm text-stone-400">
										{person.role.split("–")[1]}
									</p>
									<div className="mt-2 flex gap-x-2">
										{person.email != null && (
											<Link href={`mailto:${person.email}`}>
												<MailIcon className="mr-2 inline-block aspect-square w-5" />
											</Link>
										)}
										{person.linkedin_url != null && (
											<Link href={person.linkedin_url}>
												<LinkedinIcon className="inline-block aspect-square w-5" />
											</Link>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
