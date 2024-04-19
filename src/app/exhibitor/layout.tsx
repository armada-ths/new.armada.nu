import { CompanyRegistrationButton } from "@/app/_components/CompanyRegistrationButton"
import { NavigationMenu } from "@/components/shared/NavigationMenu"
import Link from "next/link"

export default function ExhibitorLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<NavigationMenu
				aside={
					<Link href="https://register.armada.nu/register">
						<CompanyRegistrationButton />
					</Link>
				}
			/>
			{children}
		</>
	)
}
