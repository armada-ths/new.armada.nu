import { ExhibitorList } from "@/app/student/exhibitors/_components/ExhibitorList"
import { Page } from "@/components/shared/Page"
import { fetchAllYearExhibitors } from "@/components/shared/hooks/api/useExhibitors"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: `Armada exhibitors`,
  description: "See all the companies that are exhibiting at Armada"
}

export default async function ExhibitorListPage() {
  const exhibitors = await fetchAllYearExhibitors({
    next: {
      revalidate: 3600 / 2 // every 30 minutes
    }
  })

  return (
    <Page.Background withIndents>
      <Page.Boundary>
        <Page.Header>Exhibitors</Page.Header>
        <Suspense>
          <ExhibitorList exhibitorsByYear={exhibitors} />
        </Suspense>
      </Page.Boundary>
    </Page.Background>
  )
}
