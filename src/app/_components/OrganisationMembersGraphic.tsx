"use client"
import { useEffect, useState } from "react"

//create layers, 1 manager, multiple pg, more ot, most hosts

export function OrganisationMembersGraphic() {
	const PgCircleList = (people: number) => {
		const [theta, setTheta] = useState(0)

		let pi_division = 0
		let pi_division2 = 0
		let pg_circles = []

		//radius = 4, diameter = 8, 3 circles min length = 24, if length is exceeded create new layer
		if (people > 7) {
			pi_division = (2 * Math.PI) / Math.floor(2 * Math.PI + 1)
			pi_division2 = (2 * Math.PI) / (people - Math.floor(2 * Math.PI + 1))
		} else {
			pi_division = (2 * Math.PI) / people
		}

		//divide pi by people, if divided num too small -> add second layer
		for (let i = 0; i < people; i++) {
			pg_circles.push({
				name: i,
				cx: 75 + 10 * Math.sin(i * pi_division + theta),
				cy: 75 + 10 * Math.cos(i * pi_division + theta),
				r: 4.2
			})
		}
		for (let i = 7; i < people; i++) {
			pg_circles.push({
				name: i,
				cx: 75 + 20 * Math.sin(i * pi_division2 - theta),
				cy: 75 + 20 * Math.cos(i * pi_division2 - theta),
				r: 4.2
			})
		}

		useEffect(() => {
			const updateTheta = () => {
				setTheta(prevTheta => (prevTheta + 0.002) % (2 * Math.PI))
			}

			const interval = setInterval(updateTheta, 50)

			return () => clearInterval(interval)
		}, [])

		return pg_circles
	}

	const OtCircleList = (people: number) => {
		const [theta, setTheta] = useState(0)

		let pi_division = 0
		let pi_division2 = 0
		let ot_circles = []

		//radius = 4, diameter = 8, 3 circles min length = 24, if length is exceeded create new layer
		if (people > 25) {
			pi_division = (2 * Math.PI) / Math.floor(6 * Math.PI + 1)
			pi_division2 = (2 * Math.PI) / (people - Math.floor(14 * Math.PI + 1))
		} else {
			pi_division = (2 * Math.PI) / people
		}

		//divide pi by people, if divided num too small -> add second layer
		for (let i = 0; i < people; i++) {
			ot_circles.push({
				name: i,
				cx: 75 + 30 * Math.sin(i * pi_division + theta),
				cy: 75 + 30 * Math.cos(i * pi_division + theta),
				r: 4.2
			})
		}
		for (let i = 25; i < people; i++) {
			ot_circles.push({
				name: i,
				cx: 75 + 40 * Math.sin(i * pi_division2 - theta),
				cy: 75 + 40 * Math.cos(i * pi_division2 - theta),
				r: 4.2
			})
		}

		useEffect(() => {
			const updateTheta = () => {
				setTheta(prevTheta => (prevTheta + 0.002) % (2 * Math.PI))
			}

			const interval = setInterval(updateTheta, 50)

			return () => clearInterval(interval)
		}, [])

		return ot_circles
	}

	const HostCircleList = (people: number) => {
		const [theta, setTheta] = useState(0)

		let pi_division = 0
		let pi_division2 = 0
		let host_circles = []

		//radius = 4, diameter = 8, 3 circles min length = 24, if length is exceeded create new layer
		if (people > 50) {
			pi_division = (2 * Math.PI) / Math.floor(11 * Math.PI + 1)
			pi_division2 = (2 * Math.PI) / (people - Math.floor(25 * Math.PI + 1))
		} else {
			pi_division = (2 * Math.PI) / people
		}

		//divide pi by people, if divided num too small -> add second layer
		for (let i = 0; i < people; i++) {
			host_circles.push({
				name: i,
				cx: 75 + 50 * Math.sin(i * pi_division + theta),
				cy: 75 + 50 * Math.cos(i * pi_division + theta),
				r: 4.2
			})
		}
		for (let i = 50; i < people; i++) {
			host_circles.push({
				name: i,
				cx: 75 + 60 * Math.sin(i * pi_division2 - theta),
				cy: 75 + 60 * Math.cos(i * pi_division2 - theta),
				r: 4.2
			})
		}

		useEffect(() => {
			const updateTheta = () => {
				setTheta(prevTheta => (prevTheta + 0.002) % (2 * Math.PI))
			}

			const interval = setInterval(updateTheta, 50)

			return () => clearInterval(interval)
		}, [])

		return host_circles
	}

	const pgCircles = PgCircleList(20).map(circle => {
		return (
			<circle
				key={circle.name}
				fill="red"
				cx={circle.cx}
				cy={circle.cy}
				r={circle.r}
			/>
		)
	})

	const otCircles = OtCircleList(70).map(circle => {
		return (
			<circle
				key={circle.name}
				fill="rgb(0 215 144)"
				cx={circle.cx}
				cy={circle.cy}
				r={circle.r}
			/>
		)
	})

	const hostCircles = HostCircleList(120).map(circle => {
		return (
			<circle
				key={circle.name}
				fill="rgb(0 100 70)"
				cx={circle.cx}
				cy={circle.cy}
				r={circle.r}
			/>
		)
	})

	return (
		<>
			<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
				<circle fill="orange" cx="75" cy="75" r="4.2" />
				{pgCircles}
				{otCircles}
				{hostCircles}
			</svg>
		</>
	)
}
