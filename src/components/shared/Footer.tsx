"use client"

import { useScreenSize } from "@/components/shared/hooks/useScreenSize"
import { InstagramIcon, LinkedinIcon, Music2Icon } from "lucide-react"

export function Footer() {
  const { width } = useScreenSize()
  let screenSmall = false

  return (
    /* IF WIDTH < 768, SET TO VERTICAL, OTHERWISE KEEP HORIZONTAL */
    (width ?? 0) < 768 ? (screenSmall = true) : (screenSmall = false),
    (
      <div
        className={
          screenSmall
            ? "w-100 flex flex-col items-center justify-center"
            : "w-100 flex flex-row justify-center"
        }>
        <hr
          className={
            screenSmall
              ? "static mt-2 h-1 w-2/3 rounded border-0 bg-slate-500 bg-opacity-30"
              : "absolute mt-2 h-1 w-2/3 rounded border-0 bg-slate-500 bg-opacity-30"
          }
        />
        <div
          className={
            screenSmall
              ? "m-5 mb-3 mt-7 w-1/4 place-items-center text-center"
              : "m-5 mb-3 mt-7 w-1/4"
          }>
          <p>Follow us on:</p>
          <a
            href="https://www.linkedin.com/company/armada"
            className="flex space-x-1">
            <LinkedinIcon size="20" />
            <p className="mb-0">LinkedIn</p>
          </a>
          <a
            href="https://www.instagram.com/thsarmada/"
            className="flex space-x-1">
            <InstagramIcon size="20" />
            <p>Instagram</p>
          </a>
          <a
            href="https://www.tiktok.com/@ths.armada"
            className="flex space-x-1">
            <Music2Icon size="20" />
            <p>TikTok</p>
          </a>
        </div>

        <div
          className={
            screenSmall
              ? "m-5 mb-3 mt-7 w-1/2 place-items-center text-center"
              : "m-5 mb-3 mt-7 w-1/2 text-end"
          }>
          {/*PUT SPONSORS HERE*/}
        </div>
        <div
          className={
            screenSmall
              ? "m-5 mb-3 mt-7 w-1/4 place-items-center text-center"
              : "m-5 mb-3 mt-7 w-1/4 text-end"
          }>
          <p>ARMADA</p>
          <p>Drottning Kristinas väg 15</p>
          <p>114 28, Stockholm</p>
        </div>
      </div>
    )
  )
}
