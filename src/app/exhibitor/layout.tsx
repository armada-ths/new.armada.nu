import { NavigationMenu } from "@/components/shared/NavigationMenu"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ExhibitorLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<NavigationMenu
				itemAside={
					<Link href="https://register.armada.nu/register">
						<Button>Exhibitor signup</Button>
					</Link>
				}
			/>
			{children}
		</>
	)
}
