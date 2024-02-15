"use client"

import Link from "next/link"
import * as React from "react"

import { Page } from "@/components/shared/Page"
import { useScreenSize } from "@/components/shared/hooks/useScreenSize"
import {
	NavigationMenu as BaseNavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { DateTime } from "luxon"
import Image from "next/image"
import { useEffect, useState } from "react"

const companyLinks: { title: string; href: string; description: string }[] = [
	{
		title: "Registration",
		href: "https://register.armada.nu/register",
		description: `Signup as an exhibitor for the fair ${DateTime.now().year}`
	},
	{
		title: "Packages",
		href: "/exhibitor/packages",
		description: "See what we have to offer"
	},
	{
		title: "Why KTH",
		href: "/exhibitor/why_kth",
		description: "The industry's top engineers come from KTH"
	},
	{
		title: "Timeline - Step by Step",
		href: "/docs/primitives/scroll-area",
		description: "Your guide to the fair"
	}
]

const studentLinks: { title: string; href: string; description: string }[] = [
	{
		title: "Exhibitors",
		href: "/student/exhibitors",
		description: `Get an in depth look at the companies attending the fair`
	},
	{
		title: "Events",
		href: "/student/events",
		description: "See the events leading up to the fair"
	},
	{
		title: "Recruitment",
		href: "/student/recruitment",
		description:
			"Join Armada {DateTime.now().year}. See which roles are available"
	}
]

export function NavigationMenu(props: React.HTMLAttributes<HTMLDivElement>) {
	const [sheetOpen, setSheetOpen] = useState<boolean>()
	const { className, ...rest } = props

	const { width } = useScreenSize()

	useEffect(() => {
		// Always close sheet if its open when expanding the screen size
		if (width > 768 && sheetOpen) {
			setSheetOpen(false)
		}
	}, [width, sheetOpen])

	useEffect(() => {
		if (sheetOpen) {
			// This gives back the control to the underlying radix component
			// Without this the exit button and click on overlay won't work
			setSheetOpen(undefined)
		}
	}, [sheetOpen])

	return (
		<div
			className={cn(
				"flex w-screen items-center justify-end gap-x-10 px-5 py-4 md:justify-start",
				className
			)}
			{...rest}>
			{/** Sheet is used for mobile navigation */}
			<Sheet open={sheetOpen}>
				<SheetTrigger className="md:hidden" onClick={() => setSheetOpen(true)}>
					<HamburgerMenuIcon width={30} height={30} />
				</SheetTrigger>
				<SheetContent className="md:hidden">
					<Link href="/" onClick={() => setSheetOpen(false)}>
						<p className="font-bebas-neue text-xl text-melon-700">Home</p>
					</Link>
					<Separator className="my-4" />
					<Page.Header tier="secondary" className="text-2xl">
						Student
					</Page.Header>
					{studentLinks.map(component => (
						<div key={component.href} className="mt-2">
							<Link
								onClick={() => setSheetOpen(false)}
								className="font-bebas-neue text-xl text-melon-700"
								href={component.href}>
								{component.title}
							</Link>
						</div>
					))}
					<Separator className="my-4" />
					<Page.Header tier="secondary" className="text-2xl">
						Exhibitor
					</Page.Header>
					{companyLinks.map(component => (
						<div key={component.href} className="mt-2">
							<Link
								onClick={() => setSheetOpen(false)}
								className="font-bebas-neue text-xl text-melon-700"
								href={component.href}>
								{component.title}
							</Link>
						</div>
					))}
					<Separator className="my-4" />
					<Link href="/" onClick={() => setSheetOpen(false)}>
						<p className="font-bebas-neue text-xl text-melon-700">About us</p>
					</Link>
				</SheetContent>
			</Sheet>
			{/** BaseNavigationMenu is used for desktop navigation */}
			<BaseNavigationMenu className="hidden md:block">
				<NavigationMenuList>
					<NavigationMenuItem className="dark:hover:text-melon-700">
						<Link href="/" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Logo here
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="/student/exhibitors">
							<NavigationMenuTrigger className="dark:hover:text-melon-700">
								For Students
							</NavigationMenuTrigger>
						</Link>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<li className="row-span-3">
									<NavigationMenuLink asChild>
										<a
											className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
											href="/">
											<Image
												src={"/logo.svg"}
												alt="Armada logo"
												className="aspect-square w-full p-5"
												width={200}
												height={200}
												style={{
													maxWidth: "100%",
													height: "auto"
												}}
											/>
											<div className="mb-2 mt-4 text-lg font-medium">
												THS Armada
											</div>
											<p className="text-muted-foreground text-sm leading-tight">
												Scandinavia&apos;s largest career fair
											</p>
										</a>
									</NavigationMenuLink>
								</li>
								{studentLinks.map(component => (
									<ListItem
										key={component.href}
										href={component.href}
										title={component.title}>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="dark:hover:text-melon-700">
							For Exhibitors
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
								{companyLinks.map(component => (
									<ListItem
										key={component.title}
										title={component.title}
										href={component.href}>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:text-melon-700 dark:hover:text-melon-700">
						<Link href="/team" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								About us
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</BaseNavigationMenu>
		</div>
	)
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-stone-900",
						className
					)}
					{...props}>
					<div className="text-sm font-medium leading-none text-melon-700">
						{title}
					</div>
					<p className="line-clamp-2 text-sm leading-snug text-stone-400">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = "ListItem"
