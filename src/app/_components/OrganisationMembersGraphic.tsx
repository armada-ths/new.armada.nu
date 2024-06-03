"use client"

//create layers, 1 manager, multiple pg, more ot, most hosts

export function OrganisationMembersGraphic() {
	const Ot_layer = () => {
		return (
			<>
				<circle fill="blue" cx="50" cy="30" r="4" />
				<circle fill="blue" cx="50" cy="70" r="4" />
			</>
		)
	}

	const pgCircleList = (people: number) => {
		let pi_division = 0
		let pi_division2 = 0
		//radius = 4, diameter = 8, 3 circles min length = 24, if length is exceeded create new layer
		if (people > 3 * Math.PI) {
			pi_division = (2 * Math.PI) / Math.floor(3 * Math.PI)
			pi_division2 = (2 * Math.PI) / (people - Math.floor(3 * Math.PI))
		} else {
			pi_division = (2 * Math.PI) / people
		}
		let pg_circles = []
		//divide pi by people, if divided num too small -> add second layer
		for (let i = 0; i < people; i++) {
			pg_circles.push({
				name: i,
				cx: 50 + 10 * Math.cos(i * pi_division),
				cy: 50 + 10 * Math.sin(i * pi_division),
				r: 4
			})
		}
		return pg_circles
	}

	const pgCircles = pgCircleList(15).map(circle => {
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

	return (
		<>
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<circle fill="orange" cx="50" cy="50" r="4" />
				{pgCircles}
				<Ot_layer />
			</svg>
		</>
	)
}
