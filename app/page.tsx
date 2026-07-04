import { CircuitBackground } from '@/components/portfolio/circuit-background'
import { MouseGlow } from '@/components/portfolio/mouse-glow'
import { Nav } from '@/components/portfolio/nav'
import { Hero } from '@/components/portfolio/hero'
import { About } from '@/components/portfolio/about'
import { Skills } from '@/components/portfolio/skills'
import { Experience } from '@/components/portfolio/experience'
import { Projects } from '@/components/portfolio/projects'
import { Achievements } from '@/components/portfolio/achievements'
import { Contact } from '@/components/portfolio/contact'

export default function Home() {
  return (
    <>
      <CircuitBackground />
      <MouseGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </>
  )
}
