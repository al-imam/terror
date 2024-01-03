import { GameStatics } from "@/components/game-statics"
import { Hero } from "@/components/hero"
import { Links } from "@/components/links"

export default function IndexPage() {
  return (
    <section className="content relative">
      <Hero />
      <Links />
      <GameStatics />
    </section>
  )
}
