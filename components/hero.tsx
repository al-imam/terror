"use client"

import { useRef } from "react"
import Image from "next/image"
import imgProfile from "@/assets/main.jpg"
import { motion, useScroll, useTransform } from "framer-motion"

import { siteConfig } from "@/config/site"
import Particles from "@/components/particles"

import { Text } from "./Text"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div className="content-expand relative overflow-hidden" ref={ref}>
      <motion.div style={{ y }} className="absolute inset-0 -z-10 flex w-full">
        <Particles
          className="min-h-full w-full bg-transparent opacity-0 delay-1000 duration-1000 ease-out animate-out fade-out-100 fill-mode-forwards"
          quantity={100}
          adopt
        />
      </motion.div>
      <div className="content relative">
        <div className="flex flex-col items-center justify-center py-52">
          <div className="mx-auto mb-4 size-36 overflow-hidden rounded-full bg-primary opacity-0 delay-1000 duration-500 ease-out animate-out fade-out-100 fill-mode-forwards">
            <Image
              src={imgProfile}
              alt="srabon"
              className="max-h-full max-w-full object-cover object-center"
            />
          </div>
          <Text
            text={siteConfig.name}
            className="z-10 cursor-default select-none whitespace-nowrap p-2 font-sans text-4xl font-bold text-foreground md:text-7xl"
          />
          <div className="text-center text-sm text-muted-foreground opacity-0 delay-1000 duration-1000 ease-out animate-out fade-out-100 fill-mode-forwards sm:text-base">
            <h2 className="mx-auto max-w-[65ch] [text-wrap:balance]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              dolores ab officia recusandae quos vitae quaerat, ex aut
              voluptatibus? Voluptate.
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
