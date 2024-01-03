import { Hero } from "@/components/Hero"

export default function IndexPage() {
  return (
    <section className="content relative">
      <Hero />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 5 }).map(() => {
          return <div className="h-64 bg-pink-400" />
        })}
      </div>
    </section>
  )
}
