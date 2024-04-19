import { CompanyRegistrationButton } from "@/app/_components/CompanyRegistrationButton"
import { NavigationMenu } from "@/components/shared/NavigationMenu"

export default function ExhibitorLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<NavigationMenu aside={<CompanyRegistrationButton />} />
			{children}
		</>
	)
}
