import Providers from "@/app/providers"
import { NavigationMenu } from "@/components/shared/NavigationMenu"
import { DateTime } from "luxon"
import type { Metadata } from "next"
import { Bebas_Neue, Inter, Lato } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const bebasNeue = Bebas_Neue({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-bebas-neue"
})
const lato = Lato({
	subsets: ["latin"],
	weight: ["100", "300", "400", "700", "900"],
	variable: "--font-lato"
})

export const metadata: Metadata = {
	title: `THS Armada ${DateTime.now().year} Career Fair`,
	description: "Scandinavia's largest career fair for engineers"
}

export const revalidate = 60 * 60 * 12 // 12 hours

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			style={{
				colorScheme: "dark"
			}}>
			<head />
			<body
				className={`${inter.variable} ${bebasNeue.variable} ${lato.variable}`}>
				<Providers>
					<NavigationMenu className="fixed top-0 z-50 h-16 bg-gradient-to-b from-stone-900 to-stone-950/40 filter backdrop-blur-lg" />
					{children}
				</Providers>
			</body>
		</html>
	)
}
