import { FairDates } from "@/app/_components/FairDates"
import { CompanyRegistrationButton } from "@/app/_components/CompanyRegistrationButton"
import { RecruitmentBanner } from "@/app/_components/Recruitment"
import { NavigationMenu } from "@/components/shared/NavigationMenu"
import { Page } from "@/components/shared/Page"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default async function HomePage() {
	return (
		<>
			<NavigationMenu aside={<CompanyRegistrationButton />} />
			<Page.Background className="">
				<div className="mb-5 flex w-full flex-1 justify-center ">
					<div className="mx-5 w-full max-w-[800px] pt-3 md:mx-10 md:pt-6">
						<Suspense>
							<RecruitmentBanner />
						</Suspense>
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
									<CompanyRegistrationButton />

									<Link href="/exhibitor/packages">
										<Button
											variant={"secondary"}
											className="dark:bg-liqorice-700">
											This Years Packages
											<ArrowRightIcon className="ml-2 h-4 w-4" />
										</Button>
									</Link>
								</div>
								<Suspense>
									<FairDates />
								</Suspense>
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
