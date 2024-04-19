import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from "@/components/ui/collapsible"
import { P } from "@/app/_components/Paragraph"
import { ChevronsUpDown } from "lucide-react"

export function TimelineItem({
	children,
	title,
	dateString
}: {
	children?: React.ReactNode
	title: string
	dateString: string
}) {
	return (
		<>
			<div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-melon-700"></div>
			<Collapsible>
				<CollapsibleTrigger className="hover: w-full rounded px-2 pb-4 text-left hover:bg-slate-700">
					<P className="text-stone-400">{dateString}</P>
					<div className="flex w-full justify-between ">
						<h3 className="text-2xl md:text-3xl">{title}</h3>
						<div className="flex h-8 w-8 items-center justify-center rounded-full">
							<ChevronsUpDown />
						</div>
					</div>
				</CollapsibleTrigger>
				{children && (
					<CollapsibleContent className="px-2">
						<div>{children}</div>
					</CollapsibleContent>
				)}
			</Collapsible>
		</>
	)
}
