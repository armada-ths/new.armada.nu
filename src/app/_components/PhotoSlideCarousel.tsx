"use client"
import Image from "next/image"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

export function PhotoSlideCarousel(props: {
	photoSrc: { source: string; altText: string }[]
}) {
	const responsive = {
		desktop: {
			breakpoint: {
				max: 3000,
				min: 768
			},
			items: 4
		},
		mobile: {
			breakpoint: {
				max: 464,
				min: 0
			},
			items: 2
		},
		tablet: {
			breakpoint: {
				max: 768,
				min: 464
			},
			items: 3
		}
	}
	return (
		<div className="mt-8">
			<Carousel arrows swipeable responsive={responsive} infinite autoPlay>
				{props.photoSrc.map((imgDetails, idx) => (
					<div key={idx}>
						<Image
							key={idx}
							src={imgDetails.source}
							alt={imgDetails.altText}
							width={172}
							height={172}
							className="mb-4 aspect-square object-cover transition-all duration-200 hover:scale-105"
						/>
					</div>
				))}
			</Carousel>
		</div>
	)
}
