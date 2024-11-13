import { CompanyRegistrationButton } from "@/app/_components/CompanyRegistrationButton"
import { FairDates } from "@/app/_components/FairDates"
import { RecruitmentBanner } from "@/app/_components/Recruitment"
import { fetchDates } from "@/components/shared/hooks/api/useDates"
import { fetchExhibitors } from "@/components/shared/hooks/api/useExhibitors"
import { NavigationMenu } from "@/components/shared/NavigationMenu"
import { Page } from "@/components/shared/Page"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

export default async function HomePage() {
  const exhibitors = await fetchExhibitors()
  const dates = await fetchDates()
  const fr_end = new Date(dates.fr.end).getTime()
  const fair_start = new Date(dates.fair.days[0]).getTime()
  const fair_end = new Date(dates.fair.days[1]).getTime()
  const today = Date.now()
  return (
    <>
      <NavigationMenu
        aside={today < fr_end ? <CompanyRegistrationButton /> : ""}
      />
      <Page.Background className="">
        <div className="mb-5 flex w-full flex-1 justify-center ">
          <div className="mx-5 w-full max-w-[800px] pt-3 md:mx-10 md:pt-6">
            <Suspense>
              <RecruitmentBanner />
            </Suspense>
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col gap-y-40 pb-32 md:flex-row">
          <div className="flex flex-1">
            <div className="mx-auto flex max-w-[500px] flex-1">
              <div className="z-10 mx-10 flex flex-col md:flex-1">
                <h1 className="max-w-96 font-bebas-neue text-7xl text-melon-700">
                  Shape your future
                </h1>
                <h2 className="my-5 text-stone-300">
                  The No. 1 career fair at KTH Royal Institute of Technology.
                  Where future engineers come in contact with career
                  opportunities and shape their future
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {today < fr_end ? (
                    <>
                      <CompanyRegistrationButton />
                      <Link href="/exhibitor/packages">
                        <Button
                          variant={"secondary"}
                          className="dark:bg-liqorice-700">
                          This Year&apos;s Packages
                          <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/student/events">
                        <Button>Signup for events</Button>
                      </Link>
                      {fair_start < today && today < fair_end && (
                        <Link href="/students/map">
                          <Button
                            variant={"secondary"}
                            className="dark:bg-liqorice-700">
                            Go to map
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </>
                  )}
                </div>
                <Suspense>
                  <FairDates />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="z-10 flex flex-col items-center justify-center md:flex-[1]">
            {/*<div className="flex max-h-52 max-w-96 flex-col items-center justify-center gap-y-5 rounded-lg border-[1px] border-slate-200 bg-white bg-opacity-40 p-8">
						<Countdown />
					  </div> */}
            <h1 className="max-w-30 flex justify-center font-bebas-neue text-3xl text-stone-300">
              Our Gold Exhibitors
            </h1>
            <div className="flex w-full flex-wrap justify-center gap-6">
              {exhibitors
                .filter(
                  exhibitor =>
                    exhibitor.name === "Försvarsmakten" ||
                    exhibitor.name === "Nordea"
                )
                .map(exhibitor => (
                  <div
                    key={exhibitor.id}
                    className="flex h-40 w-40 items-center justify-center rounded-lg">
                    {(exhibitor.logo_squared ||
                      exhibitor.logo_freesize ||
                      exhibitor.name === "Nordea") && (
                      <Image
                        className="object-contain"
                        src={
                          exhibitor.name === "Nordea"
                            ? "/exhibitorLogo/NordeaBankLogo.png"
                            : (exhibitor.logo_squared ??
                              exhibitor.logo_freesize ??
                              "")
                        }
                        alt={exhibitor.name}
                        width={600}
                        height={600}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Page.Background>
    </>
  )
}
