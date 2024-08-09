import { NavigationMenu } from "@/components/shared/NavigationMenu"
import { fetchRecruitment } from "@/components/shared/hooks/api/useRecruitment"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ExhibitorLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const data = await fetchRecruitment({
    next: {
      revalidate: 3600 * 3 // 3 hours
    }
  })
  return data == null ? (
    <>
      <NavigationMenu />
      {children}
    </>
  ) : (
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
