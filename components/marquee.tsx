"use client"

import React, { Fragment, useEffect, useRef } from "react"
import { useWindowSize } from "@react-hook/window-size"
import {
  MotionValue,
  PanInfo,
  motion,
  useSpring,
  useTransform,
} from "framer-motion"
import normalizeWheel from "normalize-wheel"
import { useRafLoop } from "react-use"

import { cn } from "@/lib/utils"

/**
 * @see https://14islands.com/blog/interactive-marquee-with-framer-motion/
 * @see https://codesandbox.io/s/x3r465?file=/src/App.js
 */

type MarqueeItemProps = {
  children: React.ReactNode
  speed: MotionValue<any>
} & React.ComponentProps<typeof motion.div>

function MarqueeItem({
  children,
  speed,
  className,
  ...rest
}: MarqueeItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const x = useRef(0)
  const [width, height] = useWindowSize()

  function setX() {
    if (!itemRef.current || !rectRef.current) {
      return
    }

    const xPercentage = (x.current / rectRef.current.width) * 100

    if (xPercentage < -100) {
      x.current = 0
    }

    if (xPercentage > 0) {
      x.current = -rectRef.current.width
    }

    itemRef.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`
  }

  function loop() {
    x.current -= speed.get()
    setX()
  }

  const [_, loopStart] = useRafLoop(loop, false)

  useEffect(() => {
    if (itemRef.current) {
      rectRef.current = itemRef.current.getBoundingClientRect()
    }
  }, [width, height])

  useEffect(() => {
    loopStart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      ref={itemRef}
      className={cn(
        "dragging-none flex select-none gap-[var(--item-gap,1rem)] whitespace-nowrap",
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

type MarqueeProps = {
  speed?: number
  threshold?: number
  wheelFactor?: number
  dragFactor?: number
  className?: Partial<Record<"root" | "container" | "overlay", string>>
  children: React.ReactNode
}

export function Marquee({
  speed = 1,
  threshold = 0.014,
  wheelFactor = 1.8,
  dragFactor = 1.2,
  className = {},
  children,
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const slowDown = useRef(false)
  const isScrolling = useRef<NodeJS.Timeout | null>(null)
  const constraintsRef = useRef<HTMLDivElement>(null)

  const x = useRef(0)
  const [wWidth] = useWindowSize()
  const speedSpring = useSpring(speed, {
    damping: 40,
    stiffness: 90,
    mass: 5,
  })

  const opacity = useTransform(
    speedSpring,
    [-wWidth * 0.05, 0, wWidth * 0.05],
    [1, 0, 1]
  )
  const skewX = useTransform(
    speedSpring,
    [-wWidth * 0.05, 0, wWidth * 0.05],
    [1, 0, 1]
  )

  function handleOnWheel(e: React.WheelEvent<HTMLDivElement> | undefined) {
    const normalized = normalizeWheel(e)
    x.current = normalized.pixelY * wheelFactor
    if (isScrolling.current) {
      window.clearTimeout(isScrolling.current)
    }

    isScrolling.current = setTimeout(() => {
      speedSpring.set(speed)
    }, 30)
  }

  function handleDragStart() {
    slowDown.current = true
    marqueeRef.current?.classList.add("cursor-grabbing")
    speedSpring.set(0)
  }

  function handleOnDrag(_: any, info: PanInfo) {
    speedSpring.set(dragFactor * -info.delta.x)
  }

  function handleDragEnd(_: any) {
    slowDown.current = false
    marqueeRef.current?.classList.remove("cursor-grabbing")

    x.current = speed
  }

  function loop() {
    if (slowDown.current || Math.abs(x.current) < threshold) {
      return
    }

    x.current *= 0.66

    if (x.current < 0) {
      x.current = Math.min(x.current, 0)
    } else {
      x.current = Math.max(x.current, 0)
    }

    speedSpring.set(speed + x.current)
  }

  useRafLoop(loop)

  return (
    <Fragment>
      <motion.div
        className={cn("fixed inset-0 bg-[#e6d5b8]", className.overlay)}
        style={{ opacity }}
        ref={constraintsRef}
      />
      <motion.div
        className={cn(
          "z-10 flex cursor-grab items-center gap-[var(--item-gap,1rem)] overflow-hidden",
          className.root
        )}
        ref={marqueeRef}
        style={{ skewX }}
        onWheel={handleOnWheel}
        drag="x"
        dragPropagation={true}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDrag={handleOnDrag}
        onDragEnd={handleDragEnd}
        dragElastic={0.000001}
      >
        <MarqueeItem speed={speedSpring} className={className.container}>
          {children}
        </MarqueeItem>
        <MarqueeItem speed={speedSpring} className={className.container}>
          {children}
        </MarqueeItem>
      </motion.div>
    </Fragment>
  )
}
