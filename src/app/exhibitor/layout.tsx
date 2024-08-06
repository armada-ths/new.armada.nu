import { CompanySubmissionPopover } from "@/app/exhibitor/_components/CompanySubmissionPopover"
import { NavigationMenu } from "@/components/shared/NavigationMenu"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
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
            <Button>Exhibitor signup</Button>
          </Link>
        }
      />
      {children}
      <CompanySubmissionPopover />
      <Toaster expand={true} richColors closeButton />
    </>
  )
}
