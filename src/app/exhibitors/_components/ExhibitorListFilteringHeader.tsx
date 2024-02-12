"use client"
import { useDebounce } from "@/components/shared/hooks/useDebounce"
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
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

export default function ExhibitorListFilteringHeader({
	filtered,
	total
}: {
	filtered: number
	total: number
}) {
	const { get } = useSearchParams()
	const router = useRouter()

	const year =
		get("year") ?? DateTime.now().minus({ months: 6 }).year.toString()
	const search = get("search") ?? ""

	const [searchText, setSearchText] = useState(search)

	// Since setting attributes in the URL is slow, we debounce the search
	// to not interrupt the user while typing
	useDebounce(searchText, value =>
		router.replace(
			`?${new URLSearchParams({
				year,
				search: value
			})}`
		)
	)

	const SelectGroupCallback = useCallback(
		() => (
			<SelectGroup>
				{new Array(DateTime.now().year - 2021).fill(0).map((_, i) => (
					<SelectItem key={i} value={(DateTime.now().year - i).toString()}>
						{DateTime.now().year - i}
					</SelectItem>
				))}
			</SelectGroup>
		),
		[]
	)

	return (
		<div className="flex flex-col">
			<div className="flex w-full flex-wrap gap-1">
				<Select
					value={year}
					onValueChange={year =>
						router.replace(
							`?${new URLSearchParams({
								year,
								search
							})}`
						)
					}>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder="Fair Year" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroupCallback />
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
					value={searchText}
					onChange={e => setSearchText(e.target.value)}
				/>
			</div>
			<p className="mt-4">
				{filtered} out of {total}
			</p>
		</div>
	)
}
