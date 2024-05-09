"use client"

import ExhibitorDetails from "@/app/student/exhibitors/_components/ExhibitorDetails"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import Modal from "@/components/shared/Modal"

import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

// TODO:
// - optimize logo image loading somehow
// - use position relative container around image and set filled attr on image since we dont know width/height

export function ExhibitorCard({
	exhibitor,
	year
}: {
	exhibitor: Exhibitor
	year: string
}) {
	const searchParams = useSearchParams()
	const router = useRouter()

	const [modalOpen, setModalOpen] = useState(false)

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
					router.push("/student/exhibitors", { scroll: false }) // clear url when the modal is closed
				}}
				className="max-w-[1000px] bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-900 p-10">
				<ExhibitorDetails exhibitor={exhibitor} />
			</Modal>

			<Link
				href={`/student/exhibitors?id=${exhibitor.id}`}
				scroll={false}>
				<div className="to-liqorice-950 group relative flex h-full flex-col rounded-lg border-2 border-solid border-emerald-900 bg-gradient-to-b from-emerald-900 via-emerald-950 filter transition hover:scale-[1.05] hover:brightness-95">
					{exhibitor.logo_freesize != null ||
						(exhibitor.logo_squared != null && (
							<div className="flex justify-center p-4">
								<Image
									className="max-h-[100px] w-auto object-contain"
									src={exhibitor.logo_squared ?? exhibitor.logo_freesize}
									alt={exhibitor.name}
									width={100}
									height={100}
								/>
							</div>
						))}
					<div className="flex-1" />
					<h3 className="my-2 text-center font-bebas-neue text-xl text-emerald-100 antialiased transition group-hover:text-melon-700">
						{exhibitor.name}
					</h3>
				</div>
			</Link>
		</>
	)
}
