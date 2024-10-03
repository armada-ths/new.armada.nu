"use client"

import ExhibitorDetails from "@/app/student/_components/ExhibitorDetails"
import BadgeCollection from "@/app/student/exhibitors/_components/BadgeCollection"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import Modal from "@/components/ui/Modal"

import { useScreenSize } from "@/components/shared/hooks/useScreenSize"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function ExhibitorCard({ exhibitor }: { exhibitor: Exhibitor }) {
  const searchParams = useSearchParams()
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  const { width } = useScreenSize()
  const maxDisplayedBadges = width && width < 470 ? 2 : 1

  useEffect(() => {
    const queryId = searchParams.get("id")
    if (queryId === exhibitor.id.toString()) setModalOpen(true)
    else setModalOpen(false)
  }, [exhibitor, searchParams])

  return (
    <>
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        onClose={() => {
          router.push("/student/exhibitors", { scroll: false })
        }}
        className="max-w-[1000px] bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-900 p-0">
        <div className="p-4 sm:p-10">
          <ExhibitorDetails exhibitor={exhibitor} />
        </div>
      </Modal>

      <Link href={`/student/exhibitors?id=${exhibitor.id}`} scroll={false}>
        <div className="to-liqorice-950 group relative flex h-full flex-col rounded-lg border-2 border-solid border-emerald-900 bg-gradient-to-b from-emerald-900 via-emerald-950 filter transition hover:scale-[1.05] hover:brightness-95">
          <h3 className="my-2 text-center font-bebas-neue text-2xl text-emerald-100 antialiased transition group-hover:text-melon-700 xs:text-xl">
            {exhibitor.name}
          </h3>
          {(exhibitor.logo_squared || exhibitor.logo_freesize) && (
            <div className="relative mt-2 flex h-[70px] w-full flex-initial justify-center px-4">
              <Image
                className="h-full w-full object-contain"
                src={exhibitor.logo_squared ?? exhibitor.logo_freesize ?? ""}
                alt={exhibitor.name}
                width={300}
                height={300}
              />
            </div>
          )}
          <BadgeCollection
            items={exhibitor.industries}
            maxDisplayed={maxDisplayedBadges}
            className="mt-auto flex-nowrap justify-center overflow-hidden p-2.5 pt-0"
            badgeClassName="text-[0.65em] flex-initial truncate inline-block"
          />
        </div>
      </Link>
    </>
  )
}
