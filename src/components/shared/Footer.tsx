import { InstagramIcon, LinkedinIcon, Music2Icon } from "lucide-react"

export function Footer() {
  return (
    <div className="w-full bg-slate-500">
      <p>Follow us on:</p>
      <p>LinkedIn</p>
      <LinkedinIcon />
      <p>Instagram</p>
      <InstagramIcon />
      <p>TikTok</p>
      <Music2Icon />
    </div>
  )
}
