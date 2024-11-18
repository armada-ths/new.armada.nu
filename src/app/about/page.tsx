import { P } from "@/app/_components/Paragraph"
import { PhotoSlideCarousel } from "@/app/_components/PhotoSlideCarousel"
import { OrganisationMembersGraphic } from "@/app/about/_components/OrganisationMembersGraphic"
import { Page } from "@/components/shared/Page"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: `About Armada`,
  description: "Learn more about Armada"
}

export default async function RecruitmentPage() {
  const photoSrc: { source: string; altText: string }[] = [
    {
      source: "/fair_pictures/23031965122_efd3a80707_c.jpg",
      altText: "Students laying down carpet"
    },
    {
      source: "/fair_pictures/53396499463_86ddb61379_k.jpg",
      altText: "Student talking with company representative"
    },
    {
      source: "/fair_pictures/49121988801_f0b111943f_k.jpg",
      altText: "Crowd walking around the Armada fair"
    },
    {
      source: "/fair_pictures/49122130686_297ea7d00a_o.jpg",
      altText: "Student interacting with robot"
    }
  ]

  return (
    <Page.Background withIndents>
      <Page.Boundary maxWidth={750}>
        <Page.Header>About Armada</Page.Header>
        <PhotoSlideCarousel photoSrc={photoSrc} />
        <P className="mt-4">
          Armada was founded in 1981 and has since then organized a career fair
          that has grown to become one of the largest in scandinavia. We exist
          to connect students to their dream employer and have since come up
          with different events and happenings to create personal connections
          between students and employers.
        </P>
        <P className="mt-4">
          Each year, Armada goes from 1 student, the Project Manager, to over
          200 student volunteers managing a fair over two days, in several
          locations and 20 000 visitors. As Armada is fully owned by{" "}
          <Link
            className="text-white underline hover:no-underline"
            href="https://thskth.se/en/">
            THS
          </Link>
          , the student union at KTH, any profit Armada makes goes back to the
          students, funding THS initiatives for a better student life.
        </P>

        <div className="flex w-full justify-center">
          <OrganisationMembersGraphic />
        </div>
        <div className="my-10 block aspect-[0.75]">
          <embed
            src="/files/2024_paper.pdf"
            type="application/pdf"
            height="100%"
            width="100%"
            title="Armada Newsletter"
          />
        </div>
      </Page.Boundary>
    </Page.Background>
  )
}
