import { Countdown } from "@/app/_components/Countdown"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, UserRoundIcon } from "lucide-react"

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col">
			<div className="via-emerald-white flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-900">
				<div className="absolute bottom-0 right-0 z-0 h-60 w-60 rounded-full bg-melon-700 opacity-20 blur-3xl filter"></div>
				<div className="absolute bottom-1/2 right-1/4 z-0 h-52 w-52 rounded-full bg-melon-700 opacity-20 blur-3xl filter"></div>

				<div className="mb-5 flex w-full flex-1 justify-center">
					<div className="mx-5 w-full max-w-[800px] pt-14 md:mx-10 md:pt-16">
						<a href="/recruitment">
							<Alert className="mt-5 cursor-pointer hover:opacity-80">
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
							<div className="z-10 flex flex-col md:flex-1">
								<h1 className="max-w-96 font-bebas-neue text-7xl text-melon-700">
									Shape your future
								</h1>
								<h2 className="my-5 text-stone-300">
									Where Sweden&apos;s future top engineers come in contact with
									innovation and career opportunities
								</h2>
								<div className="mt-4 flex gap-x-2">
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
			</div>
		</div>
	)
}
