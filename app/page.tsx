import { GameStatics } from "@/components/game-statics"
import { Hero } from "@/components/hero"

export default function IndexPage() {
  return (
    <section className="content relative">
      <Hero />
      <GameStatics />
    </section>
  )
}
