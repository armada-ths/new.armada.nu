import { fetchDates } from "@/components/shared/hooks/api/useDates"
import { DateTime } from "luxon"

export async function ExhibitorTimeline() {
	const dates = await fetchDates()

	console.log(dates)

	function formatDate(date: string) {
		return DateTime.fromISO(date).toFormat(
			`d MMMM ${DateTime.fromISO(date).year !== DateTime.now().year ? " YYYY" : ""}`
		)
	}

	//ASSUMPTION: the start date will be first for fair dates
	return (
		<div className="mt-10">
			<div className="mt-10 flex flex-col space-y-4">
				<div className="flex space-x-4">
					<p className="w-28">{formatDate(dates.ir.start)}</p>
					<p>Initial registration start</p>
				</div>
				<div className="flex space-x-4">
					<p className="w-28">{formatDate(dates.ir.end)}</p>
					<p>Initial registration end</p>
				</div>
			</div>

			<div className="mt-10 flex flex-col space-y-4">
				<div className="flex space-x-4">
					<p className="w-28">{formatDate(dates.fr.start)}</p>
					<p>Final registration start</p>
				</div>
				<div className="flex space-x-4">
					<p className="w-28">{formatDate(dates.fr.end)}</p>
					<p>Final registration end</p>
				</div>
			</div>

			<div className="mt-10 flex flex-col space-y-4">
				<div className="flex space-x-4">
					<p className="w-28">{formatDate(dates.fair.days[0])}</p>
					<p>Armada fair start</p>
				</div>
				<div className="flex space-x-4">
					<p className="w-28">{formatDate(dates.fair.days[1])}</p>
					<p>Armada fair end</p>
				</div>
			</div>
		</div>
	)
}
