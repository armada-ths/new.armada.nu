import { cn } from "@/lib/utils"

export function PageBackground(
	props: React.HTMLAttributes<HTMLDivElement> & {
		avoidHeader?: boolean
		withIndents?: boolean
	}
) {
	const { children, className, ...rest } = props
	return (
		<div
			className={cn(
				"via-emerald-white flex min-h-screen flex-1 flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-900",
				{
					"px-5 pt-10": props.withIndents
				},
				className
			)}
			{...rest}>
			<div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-emerald-700 opacity-20 blur-3xl filter"></div>
			<div className="absolute bottom-1/2 right-1/4 h-52 w-52 rounded-full bg-emerald-700 opacity-20 blur-3xl filter"></div>
			{!props.avoidHeader && <div className="h-16" />}
			<div className="z-10 flex w-full flex-1 flex-col">{children}</div>
		</div>
	)
}
