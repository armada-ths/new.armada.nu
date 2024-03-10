import { NavigationMenu } from "@/components/shared/NavigationMenu"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ExhibitorLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<NavigationMenu
				aside={
					<Link href="https://ais.armada.nu/fairs/2024/recruitment">
						<Button variant={"outline"}>Apply for Armada</Button>
					</Link>
				}
			/>
			{children}
		</>
	)
}
