"use client"
import { ExhibitorContext } from "@/app/exhibitors/_components/ExhibitorList"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { DateTime } from "luxon"
import { useContext } from "react"

export default function ExhibitorListFilteringHeader({
	filteredMatches,
	total
}: {
	filteredMatches: number
	total: number
}) {
	const { setYear, textSearch, setTextSearch } = useContext(ExhibitorContext)

	return (
		<div className="flex flex-col">
			<div className="flex w-full flex-wrap gap-1">
				<Select onValueChange={year => setYear?.(Number(year))}>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder="Fair Year" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{new Array(DateTime.now().year - 2021).fill(0).map((_, i) => (
								<SelectItem
									key={i}
									value={(DateTime.now().year - i).toString()}>
									{DateTime.now().year - i}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<Select disabled>
					<SelectTrigger className="w-[100px]">
						<SelectValue placeholder="Location" />
					</SelectTrigger>
				</Select>
				<Select disabled>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Industry" />
					</SelectTrigger>
				</Select>
				<Input
					type="text"
					placeholder="Search..."
					className="max-w-[400px]"
					value={textSearch}
					onChange={e => setTextSearch?.(e.target.value)}
				/>
			</div>
			<p className="mt-4">
				{filteredMatches} out of {total}
			</p>
		</div>
	)
}
