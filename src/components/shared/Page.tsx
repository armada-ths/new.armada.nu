import { cn } from "@/lib/utils"

export function Page() {
	return null
}

Page.Boundary = function PageBoundary({
	children,
	className,
	...rest
}: React.HTMLAttributes<HTMLDivElement> & { maxWidth?: number }) {
	return (
		<div
			className={cn("mx-auto mt-10 flex w-full flex-1 flex-col", className)}
			style={{ maxWidth: rest.maxWidth ?? 1000 }}
			{...rest}>
			{children}
		</div>
	)
}
Page.Header = function PageHeader(props: React.HTMLAttributes<HTMLDivElement>) {
	const { children, className, ...rest } = props
	return (
		<h1
			className={cn("font-bebas-neue text-5xl text-melon-700", className)}
			{...rest}>
			{children}
		</h1>
	)
}
Page.Background = function PageBackground(
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
