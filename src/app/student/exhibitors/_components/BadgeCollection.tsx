import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function BadgeCollection({
	items,
	maxDisplayed = Infinity,
	className,
	badgeClassName
}: {
	items: { id: number; name: string }[]
	maxDisplayed?: number
	className?: string
	badgeClassName?: string
}) {
	const tooltip = items
		.slice(maxDisplayed)
		.map(ind => ind.name)
		.join(", ")

	return (
		<div className={cn("flex flex-wrap gap-1", className)}>
			{items.slice(0, maxDisplayed).map(({ id, name }) => (
				<Badge
					key={id}
					variant="square"
					className={cn("shadow-lg w-max flex-none", badgeClassName)}>
					{name}
				</Badge>
			))}
			{items.length > maxDisplayed && (
				<Badge
					variant="square"
					title={tooltip}
					className={cn("shadow-lg w-max", badgeClassName, "flex-none")}>
					+{items.length - maxDisplayed}
				</Badge>
			)}
		</div>
	)
}
