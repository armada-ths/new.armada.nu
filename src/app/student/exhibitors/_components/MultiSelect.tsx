import { useState, useEffect, useRef, Key } from "react"
import {
	Filter,
	FilterItem,
} from "@/app/student/exhibitors/_components/ExhibitorListFilteringHeader"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function MultiSelect({
	filter,
	onChange
}: {
	filter: Filter
	onChange: (items: FilterItem[]) => void
}) {
	const { selected, items, label } = filter

	const [open, setOpen] = useState(false)
	const [searchText, setSearchText] = useState("")

	const searchedItems = items.filter(item =>
		item.name.toLowerCase().includes(searchText.toLowerCase())
	)

	function isSelected(item: FilterItem) {
		return selected.some(s => s.id === item.id)
	}

	function onSelectionChange(item: FilterItem) {
		console.log(item)
		if (isSelected(item)) {
			onChange(selected.filter(s => s.id !== item.id)) // remove item
		} else {
			onChange([...selected, item]) // add item
		}
	}

	const dropdownRef = useRef<HTMLDivElement>(null)

	function handleOutsideClick(e: any) {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setOpen(false)
			setSearchText("")
		}
	}

	function toggleOpen() {
		setOpen(!open)
		if (open) setSearchText("")
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick)
		return () => document.removeEventListener("mousedown", handleOutsideClick)
	}, [])

	return (
		<div ref={dropdownRef}>
			{/* Trigger */}
			<Button variant={"outline"}
				className="max-w-48 flex-auto rounded-md bg-stone-950 p-3 h-10 text-sm font-normal"
				onClick={toggleOpen}>
				<span className="line-clamp-1">
					{selected.length ? selected.map(s => s.name).join(",") : label}
				</span>
			</Button>
			{/* Selection list */}
			{open && (
				<div className={cn("relative z-10 transition duration-200")}>
					<div className="absolute mt-1 flex max-h-[300px] w-max flex-col overflow-y-auto rounded-md border border-emerald-800 bg-stone-950 p-1 text-sm text-stone-200 shadow-lg">
						<Input
							placeholder={label}
							className="h-8 mb-1"
							value={searchText}
							onChange={e => setSearchText(e.target.value)}></Input>
						{searchedItems.map(item => (
							<button
								key={item.id}
								className="flex min-w-32 cursor-default items-center gap-2 p-2 hover:bg-emerald-950 hover:text-melon-700"
								onClick={() => onSelectionChange(item)}>
								<input
									type="checkbox"
									readOnly
									checked={isSelected(item)}
									className="accent-melon-700"
								/>
								<span>{item.name}</span>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
