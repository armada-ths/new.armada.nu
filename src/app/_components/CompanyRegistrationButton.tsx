import { P } from "@/app/_components/Paragraph"
import { fetchDates } from "@/components/shared/hooks/api/useDates"
import { Button } from "@/components/ui/button"
import { DateTime } from "luxon"
import Link from "next/link"

export async function CompanyRegistrationButton() {
  const { fr } = await fetchDates()
  const isAfterFr = DateTime.now() > DateTime.fromISO(fr.end)

  if (isAfterFr) {
    return <P>{DateTime.now().year} signup is closed</P>
  }

  return (
    <Link href="https://register.armada.nu/register">
      <Button>Exhibitor Signup</Button>
    </Link>
  )
}
