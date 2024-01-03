"use client"

import Image from "next/image"
import GameImg from "@/assets/garena-free-fire.jpg"
import { ClipboardCopyIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

export function GameStatics() {
  return (
    <div className="py-4 opacity-0 duration-1000 ease-out animate-out fade-out-100 fill-mode-forwards [animation-delay:1300ms]">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Game key={i} img={GameImg} />
        ))}
      </div>
    </div>
  )
}

function Game({ img }: { img: string | typeof GameImg }) {
  return (
    <div className="group stack-content cursor-pointer overflow-hidden rounded shadow shadow-border [&_*]:select-none">
      <div className="stack-content">
        <Image src={img} alt="game-banner" />
        <div className="self-end bg-gradient-to-b from-black/0 via-black/50 to-black/90 p-4 text-white ">
          <p className="pt-3 text-sm font-semibold tracking-wider transition-opacity duration-200 group-hover:opacity-0 sm:text-xl">
            Garena Free Fire
          </p>
        </div>
      </div>
      <div
        className="z-10 flex h-full w-full items-center justify-center bg-black/50 text-sm font-medium text-white opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100 sm:text-lg"
        onClick={() => toast("Copied successfully!")}
      >
        <p className="flex justify-center gap-2 uppercase text-white transition-transform hover:brightness-90">
          Copy UID <ClipboardCopyIcon className="h-4 w-4 sm:h-6 sm:w-6" />
        </p>
      </div>
    </div>
  )
}
