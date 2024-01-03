"use client"

import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { useParticles } from "@/hooks/particles"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  adopt?: boolean
}

function _getThemeColor(theme: string | undefined) {
  switch (theme) {
    case "dark":
      return "#fff"
    case "light":
      return "#000"
    default:
      return "#fff"
  }
}

function getThemeColor(
  theme: string | undefined,
  systemTheme: string | undefined,
  adopt: boolean
) {
  if (!adopt) return "#fff"

  switch (theme) {
    case "system":
      return _getThemeColor(systemTheme)
    default:
      return _getThemeColor(theme)
  }
}

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  adopt = false,
}: ParticlesProps) {
  const { theme, systemTheme } = useTheme()
  const colorHex = getThemeColor(theme, systemTheme, adopt)

  const { canvasRef, canvasContainerRef } = useParticles({
    quantity,
    staticity,
    ease,
    colorHex,
  })

  return (
    <div
      className={cn("overflow-hidden", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
