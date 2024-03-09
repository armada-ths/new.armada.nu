import { NavigationMenu } from "@/components/shared/NavigationMenu"
import { Page } from "@/components/shared/Page"
import { fetchDates } from "@/components/shared/hooks/api/useDates"
import { fetchRecruitment } from "@/components/shared/hooks/api/useRecruitment"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, UserRoundIcon } from "lucide-react"
import { DateTime } from "luxon"
import Link from "next/link"

export default async function HomePage() {
	const recruitment = await fetchRecruitment()
	const dates = await fetchDates()

	return (
		<>
			<NavigationMenu
				itemAside={
					<Link href="https://register.armada.nu/register">
						<Button>Exhibitor Signup</Button>
					</Link>
				}
			/>
			<Page.Background className="">
				<div className="mb-5 flex w-full flex-1 justify-center ">
					<div className="mx-5 w-full max-w-[800px] pt-3 md:mx-10 md:pt-6">
						{recruitment != null && (
							<Link href="/student/recruitment">
								<Alert className="mt-0 cursor-pointer dark:hover:border-melon-700 dark:hover:border-opacity-50">
									<UserRoundIcon className="h-4 w-4" />
									<AlertTitle>Recruitment open!</AlertTitle>
									<AlertDescription>
										Apply to become a part of Armada 2024
									</AlertDescription>
								</Alert>
							</Link>
						)}
					</div>
				</div>
				<div className="flex w-full flex-1 flex-col gap-y-10 pb-32 md:flex-row">
					<div className="flex flex-1">
						<div className="mx-auto flex max-w-[500px] flex-1">
							<div className="z-10 mx-10 flex flex-col md:flex-1">
								<h1 className="max-w-96 font-bebas-neue text-7xl text-melon-700">
									Shape your future
								</h1>
								<h2 className="my-5 text-stone-300">
									Where Sweden&apos;s future top engineers come in contact with
									innovation and career opportunities
								</h2>
								<div className="mt-4 flex flex-wrap gap-2">
									<a href="https://register.armada.nu/register">
										<Button>Exhibitor signup</Button>
									</a>
									<a href="/exhibitor/packages">
										<Button
											variant={"secondary"}
											className="dark:bg-liqorice-700">
											This Years Packages
											<ArrowRightIcon className="ml-2 h-4 w-4" />
										</Button>
									</a>
								</div>
								<div className="mt-5 flex gap-4 font-bebas-neue">
									<p className="text-2xl uppercase text-stone-400">Fair:</p>
									<div className="flex">
										{[
											// Pick first and last day (ASSUMPTION: days are sorted and continuous)
											dates.fair.days[0],
											dates.fair.days[dates.fair.days.length - 1]
										].map((date, index, list) => (
											<p key={date} className="text-2xl text-stone-400">
												{DateTime.fromISO(date).toFormat(
													// Only add month and year to last
													`d${index == list.length - 1 ? " MMM" : "-"}${DateTime.fromISO(date).year !== DateTime.now().year ? " YYYY" : ""}`
												)}
											</p>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="z-10 flex justify-center gap-4 md:flex-[1]">
						{/* 					<div className="flex max-h-52 max-w-96 flex-col items-center justify-center gap-y-5 rounded-lg border-[1px] border-slate-200 bg-white bg-opacity-40 p-8">
						<Countdown />
					</div> */}
					</div>
				</div>
			</Page.Background>
		</>
	)
}
