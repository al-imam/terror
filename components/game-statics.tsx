"use client"

import Image from "next/image"
import FFLogo from "@/assets/ff-logo.png"
import GameImg from "@/assets/garena-free-fire.jpg"
import { CircleDotIcon, ClipboardCopyIcon } from "lucide-react"
import { toast } from "sonner"

export function GameStatics() {
  return (
    <div className="py-4 opacity-0 duration-1000 ease-out animate-out fade-out-100 fill-mode-forwards [animation-delay:1300ms]">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Game
            key={i}
            img={GameImg}
            logo={FFLogo}
            release={2017}
            download={"20M"}
          />
        ))}
      </div>
    </div>
  )
}

function Game({
  img,
  logo,
  release,
  download,
}: {
  img: string | typeof GameImg
  logo: string | typeof GameImg
  release: number
  download: string
}) {
  return (
    <div className="group stack-content cursor-pointer overflow-hidden rounded shadow shadow-border [&_*]:select-none">
      <div className="stack-content">
        <Image src={img} alt="game-banner" />
        <div className="self-end bg-gradient-to-b from-black/0 via-black/50 to-black/90 p-4 text-white ">
          <div className="flex items-center gap-2 pt-3 transition-opacity duration-200 group-hover:opacity-0">
            <Image src={logo} className="h-12 w-12 rounded-full" alt="logo" />
            <div className="mt-auto flex flex-col text-sm">
              <span className="line-clamp-1 flex items-center gap-2 text-white/80 backdrop-blur-sm">
                {release}
                <div className="aspect-square h-[0.1875rem] rounded-full bg-white/80 backdrop-blur-sm" />
                {download}
              </span>
              <span className="line-clamp-1 text-base font-medium tracking-wider text-white/90 backdrop-blur-sm">
                Garena Free Fire
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="z-10 flex h-full w-full items-center justify-center bg-black/50 text-sm font-medium text-white opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100"
        onClick={() => toast("Copied successfully!")}
      >
        <p className="flex justify-center gap-2 uppercase text-white transition-transform hover:brightness-90">
          Copy UID <ClipboardCopyIcon className="h-4 w-4" />
        </p>
      </div>
    </div>
  )
}
