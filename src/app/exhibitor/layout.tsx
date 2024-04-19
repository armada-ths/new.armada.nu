import ExhibitorSignupButton from "@/app/exhibitor/_components/ExhibitorSignupButton"
import { NavigationMenu } from "@/components/shared/NavigationMenu"

export default function ExhibitorLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<NavigationMenu aside={<ExhibitorSignupButton />} />
			{children}
		</>
	)
}
