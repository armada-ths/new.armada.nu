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
import { FaceIcon } from "@radix-ui/react-icons"
import { DateTime } from "luxon"

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
		href: "/docs/primitives/progress",
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
					<NavigationMenuItem className="hover:bg-transparent focus:bg-transparent">
						<Link href="/" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Logo here
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="dark:hover:text-melon-700">
							Getting started
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<li className="row-span-3">
									<NavigationMenuLink asChild>
										<a
											className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
											href="/">
											<FaceIcon className="h-6 w-6" />
											<div className="mb-2 mt-4 text-lg font-medium">
												shadcn/ui
											</div>
											<p className="text-muted-foreground text-sm leading-tight">
												Beautifully designed components that you can copy and
												paste into your apps. Accessible. Customizable. Open
												Source.
											</p>
										</a>
									</NavigationMenuLink>
								</li>
								<ListItem href="/docs" title="Introduction">
									Re-usable components built using Radix UI and Tailwind CSS.
								</ListItem>
								<ListItem href="/docs/installation" title="Installation">
									How to install dependencies and structure your app.
								</ListItem>
								<ListItem href="/docs/primitives/typography" title="Typography">
									Styles for headings, paragraphs, lists...etc
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:bg-transparent">
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
					<NavigationMenuItem className="hover:bg-transparent">
						<Link href="/docs" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Documentation
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem className="hover:bg-transparent">
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
