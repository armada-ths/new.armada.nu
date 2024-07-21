export const locations = [
	{
		id: "nymble/1",
		label: "Nymble - floor 1"
	},
	{
		id: "nymble/2",
		label: "Nymble - floor 2"
	},
	{
		id: "nymble/3",
		label: "Nymble - floor 3"
	},
	{
		id: "library",
		label: "Library"
	}
] as const

export type Location = (typeof locations)[number]
export type LocationId = Location["id"]
