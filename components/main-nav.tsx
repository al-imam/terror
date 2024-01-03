import * as React from "react"
import Link from "next/link"
import { Gamepad2 } from "lucide-react"

import { siteConfig } from "@/config/site"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2 uppercase">
        <Gamepad2 className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.shortName}</span>
      </Link>
    </div>
  )
}
