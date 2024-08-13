"use client"

import { Card } from "@/components/ui/card"
import { Box, Flex, Text } from "@radix-ui/themes"
import Image from "next/image"
import { Booth } from "../lib/booths"

export function BoothListItem({ booth }: { booth: Booth }) {
	const logoSrc = booth.exhibitor.logo_squared ?? booth.exhibitor.logo_freesize
	return (
		<Box>
			<Card className="h-12">
				<Flex gap="3" align="center" className="pl-2">
					{logoSrc ? (
						<div className="flex">
							<Image
								className="my-auto size-12 p-2"
								src={logoSrc}
								alt={booth.exhibitor.name}
								width={400}
								height={300}></Image>
							<Text as="div" size="2" weight="bold">
								{booth.exhibitor.name}
							</Text>
						</div>
					) : (
						<Text as="div" size="2" weight="bold">
							{booth.exhibitor.name}
						</Text>
					)}
				</Flex>
			</Card>
		</Box>
	)
}
