import { Countdown } from "@/app/_components/Countdown"
import { Page } from "@/components/shared/Page"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, UserRoundIcon } from "lucide-react"

export default function HomePage() {
	return (
		<Page.Background className="">
			<div className="mb-5 flex w-full flex-1 justify-center ">
				<div className="mx-5 w-full max-w-[800px] pt-3 md:mx-10 md:pt-6">
					<a href="/recruitment">
						<Alert className="mt-0 cursor-pointer hover:opacity-80">
							<UserRoundIcon className="h-4 w-4" />
							<AlertTitle>Recruitment open!</AlertTitle>
							<AlertDescription>
								Apply to become a part of Armada 2024
							</AlertDescription>
						</Alert>
					</a>
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
								<a href="/recruitment">
									<Button>Fair Info</Button>
								</a>
								<a href="/recruitment">
									<Button>
										Fair Info
										<ArrowRightIcon className="ml-2 h-4 w-4" />
									</Button>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="z-10 flex justify-center gap-4 md:flex-[1]">
					<div className="flex max-h-52 max-w-96 flex-col items-center justify-center gap-y-5 rounded-lg border-[1px] border-slate-200 bg-white bg-opacity-40 p-8">
						<Countdown />
					</div>
				</div>
			</div>
		</Page.Background>
	)
}
