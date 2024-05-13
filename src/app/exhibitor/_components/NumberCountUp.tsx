"use client"
import { useState } from "react"
import CountUp from "react-countup"

export function NumberCountUp(props: {
	start: number
	end: number
	duration: number
	isVisit?: boolean
	isDays?: boolean
}) {
	const [isEnd, setIsEnd] = useState(false)

	return (
		<p className="text-2xl md:text-4xl">
			<CountUp
				start={props.start}
				end={props.end}
				duration={props.duration}
				onEnd={() => setIsEnd(true)}
			/> 
			{
				props.isVisit && isEnd && "+"
			}
			{
				props.isDays && "Days"
			}
		</p>
		
	)
}
