function SelectLocation({
	locationId,
	setLocationId
}: {
	locationId: LocationId
	setLocationId: (id: LocationId) => void
}) {
	return (
		<div className="absolute top-2 sm:right-2 self-center rounded-full">
			<Select
				value={locationId}
				onValueChange={(id: LocationId) => setLocationId(id)}>
				<SelectTrigger className="w-[180px] rounded-full py-5 dark:ring-offset-0 dark:focus:ring-0">
					<SelectValue placeholder="Location" />
				</SelectTrigger>
				<SelectContent>
					{locations.map(loc => (
						<SelectItem key={loc.id} value={loc.id}>
							{loc.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
