"use client"

import Image from "next/image"
import COCLogo from "@/assets/coc-logo.jpg"
import COCImg from "@/assets/coc.jpg"
import FFLogo from "@/assets/ff-logo.png"
import GameImg from "@/assets/garena-free-fire.jpg"
import PLImg from "@/assets/per-light.jpg"
import PLLogo from "@/assets/pl-logo.jpg"
import PUBGBanner from "@/assets/pubg-banner.jpg"
import PUBGLogo from "@/assets/pubg-logo.jpg"
import { ClipboardCopyIcon } from "lucide-react"
import { toast } from "sonner"

const games = [
  {
    img: GameImg,
    logo: FFLogo,
    release: 2017,
    download: "1B",
    title: "Garena Free Fire",
  },
  {
    img: COCImg,
    logo: COCLogo,
    release: 2012,
    download: "500M",
    title: "Clash of Clans",
  },
  {
    img: PLImg,
    logo: PLLogo,
    release: 2023,
    download: "10M",
    title: "Farlight",
  },
  {
    img: PUBGBanner,
    logo: PUBGLogo,
    release: 2017,
    download: "500M",
    title: "PUBG Mobile",
  },
]

export function GameStatics() {
  return (
    <div className="py-4 opacity-0 duration-1000 ease-out animate-out fade-out-100 fill-mode-forwards [animation-delay:1300ms]">
      <div className="grid gap-8 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4">
        {games.map((item, i) => (
          <Game
            key={JSON.stringify(item) + i}
            img={item.img}
            logo={item.logo}
            release={item.release}
            download={item.download}
            title={item.title}
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
  title,
}: {
  img: string | typeof GameImg
  logo: string | typeof GameImg
  release: number
  download: string
  title: string
}) {
  return (
    <div className="group stack-content cursor-pointer overflow-hidden rounded shadow shadow-border [&_*]:select-none">
      <div className="stack-content">
        <Image
          src={img}
          alt="game-banner"
          className="max-h-[30rem] object-cover object-center"
        />
        <div className="self-end bg-gradient-to-b from-black/0 via-black/50 to-black/90 p-4 text-white ">
          <div className="flex items-center gap-2 pt-3 transition-opacity duration-200 group-hover:opacity-0">
            <Image
              src={logo}
              className="h-12 w-12 rounded-full object-cover object-center"
              alt="logo"
            />
            <div className="mt-auto flex flex-col text-sm">
              <span className="line-clamp-1 flex items-center gap-2 text-white">
                {release}
                <div className="aspect-square h-[0.1875rem] rounded-full bg-white" />
                {download}
              </span>
              <span className="line-clamp-1 text-base font-medium tracking-wider text-white">
                {title}
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
