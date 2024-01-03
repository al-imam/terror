import Link from "next/link"

import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { buttonVariants } from "./ui/button"

export function SiteHeader() {
  return (
    <header className="content absolute top-0 z-40 w-full">
      <div className="flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <nav className="flex flex-1 items-center justify-end gap-4">
          <Link
            href="/contact"
            className={buttonVariants({ variant: "ghost" })}
          >
            Contact
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
