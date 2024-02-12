"use client"

import Link from "next/link"
import * as React from "react"

import {
	NavigationMenu as BaseNavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { DateTime } from "luxon"
import Image from "next/image"

const components: { title: string; href: string; description: string }[] = [
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

export function NavigationMenu(props: React.HTMLAttributes<HTMLDivElement>) {
	const { className, ...rest } = props
	return (
		<div
			className={cn("flex w-screen items-center gap-x-10 px-5 py-4", className)}
			{...rest}>
			<BaseNavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem className="dark:hover:text-melon-700">
						<Link href="/" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Logo here
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="dark:hover:text-melon-700">
							For Students
						</NavigationMenuTrigger>
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
								<ListItem href="/exhibitors" title="Exhibitors">
									Get an in depth look at the companies attending the fair
								</ListItem>
								<ListItem href="/events" title="Events">
									See the events leading up to the fair
								</ListItem>
								<ListItem href="/recruitment" title="Recruitment">
									Join Armada {DateTime.now().year}. See which roles are
									available
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="dark:hover:text-melon-700">
							For Exhibitors
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
								{components.map(component => (
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
