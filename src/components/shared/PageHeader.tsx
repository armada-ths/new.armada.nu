export function PageHeader(
	props: {
		title: string
		subtitle: string
	} & React.HTMLAttributes<HTMLDivElement>
) {
	const { title, subtitle } = props
	return (
		<div {...props}>
			<h1 className="mt-20 text-center font-lato text-3xl font-bold text-melon-700">
				{title}
			</h1>
			<p className="text-center">{subtitle}</p>
		</div>
	)
}
