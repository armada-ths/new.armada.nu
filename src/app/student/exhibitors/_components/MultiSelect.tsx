import {
	Filter,
	FilterItem
} from "@/app/student/exhibitors/_components/ExhibitorListFilteringHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

import { useRef, useState } from "react"
import { ChevronDown, X } from "lucide-react"

// TODO:
// - keyboard navigation?
// - aria stuff

function Badges({ items }: { items: FilterItem[] }) {
	return (
		<div className="flex gap-1">
			<Badge variant="square">{items[0].name}</Badge>
			{items.length > 1 && <Badge variant="square">+{items.length - 1}</Badge>}
		</div>
	)
}

export default function MultiSelect({
	filter,
	onChange
}: {
	filter: Filter
	onChange: (items: FilterItem[]) => void
}) {
	const { selected, items, label } = filter

	const [searchText, setSearchText] = useState("")

	const inputRef = useRef<HTMLInputElement>(null)

	const searchedItems = items.filter(item =>
		item.name.toLowerCase().includes(searchText.toLowerCase())
	)

	function isSelected(item: FilterItem) {
		return selected.some(s => s.id === item.id)
	}

	function onSelectionChange(item: FilterItem) {
		if (isSelected(item)) {
			onChange(selected.filter(s => s.id !== item.id)) // remove item
		} else {
			onChange([...selected, item]) // add item
		}
	}

	return (
		<Popover
			// want to clear the input field when popover closes, but if we do it right away it causes the popover to rerender and it looks bad
			// so add delay to allow the close transition to play, but probably there is a better way to do this
			onOpenChange={open => !open && setTimeout(() => setSearchText(""), 300)}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className="h-10 rounded-md bg-stone-950 p-3 text-sm font-normal hover:dark:bg-stone-950">
					{selected.length === 0 ? (
						<>
							<span>{label}</span>
							<ChevronDown size={16} className="ml-4 opacity-50" />
						</>
					) : (
						<>
							<Badges items={selected} />
							<X
								size={16}
								className="ml-4 opacity-50 transition hover:opacity-80"
								onClick={() => onChange([])}></X>
						</>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent
				className="z-10 w-auto border-none p-0"
				align="start"
				sideOffset={5}
				onOpenAutoFocus={e => {
					e.preventDefault()
					inputRef.current?.focus()
				}}>
				<div className="w-max rounded-md border border-emerald-800 bg-zinc-950 p-0 text-sm text-stone-300 shadow-lg">
					<Input
						ref={inputRef}
						placeholder={label}
						className="mb-1 rounded-none rounded-t-md border-0 border-b dark:border-emerald-800"
						value={searchText}
						onChange={e => setSearchText(e.target.value)}></Input>
					<ScrollArea>
						<div className="flex max-h-[300px] flex-col">
							{searchedItems.length === 0 ? (
								<span className="p-1 text-stone-400">No results</span>
							) : (
								searchedItems.map(item => (
									<button
										key={item.id}
										className="flex min-w-32 cursor-default items-center gap-2 p-2 pl-3  hover:bg-emerald-950 hover:text-melon-700"
										onClick={() => onSelectionChange(item)}>
										<input
											type="checkbox"
											readOnly
											checked={isSelected(item)}
											className="accent-melon-700"
										/>
										<span>{item.name}</span>
									</button>
								))
							)}
						</div>
					</ScrollArea>
				</div>
			</PopoverContent>
		</Popover>
	)
}
