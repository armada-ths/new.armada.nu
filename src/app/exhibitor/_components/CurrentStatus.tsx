import { fetchDates } from "@/components/shared/hooks/api/useDates"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Sparkles } from "lucide-react"
import { DateTime } from "luxon"
import Link from "next/link"

//ASSUMPTION: the start date will be first for fair dates
export async function CurrentStatus() {
	const dates = await fetchDates()
	const today = Date.now() //.toISOString();

	function formatDate(date: string) {
		return DateTime.fromISO(date).toFormat(
			`d MMMM ${DateTime.fromISO(date).year !== DateTime.now().year ? " YYYY" : ""}`
		)
	}

	if (today < new Date(dates.ir.start).getTime()) {
		return (
			<div>
				<Alert className="mt-0">
					<Sparkles size={20} />
					<AlertTitle>Registration is opening soon!</AlertTitle>
					<AlertDescription>
						We are preparing the registration for next year&apos;s Armada. In
						the meanwhile, you are very welcome to report interest in this{" "}
						<Link
							className="text-white underline hover:no-underline"
							href="https://docs.google.com/forms/d/e/1FAIpQLSdny1mhsj1Wutt_FaJtqgxKJP3OOBrWW09Ic3T5_NwEHWhV_w/viewform?usp=sf_link">
							form
						</Link>{" "}
						and we will get back to you once registration is open!
					</AlertDescription>
				</Alert>
			</div>
		)
	} else if (
		new Date(dates.ir.start).getTime() < today &&
		today < new Date(dates.ir.end).getTime()
	) {
		return (
			<div>
				<Alert className="mt-5">
					<Sparkles size={20} />
					<AlertTitle>Initial Registration open</AlertTitle>
					<AlertDescription>
						During the Initial Registration you apply to be an exhibitor at
						Armada. When you do so you commit to exhibit, but you don&apos;t
						have to specify your package yet. Read more about each stage{" "}
						<Link
							className="text-white underline hover:no-underline"
							href="/exhibitor/timeline">
							here
						</Link>
					</AlertDescription>
				</Alert>
			</div>
		)
	}

	//default
	return <div></div>
}
