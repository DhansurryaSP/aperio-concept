import Nav from './components/Nav'
import Hero from './components/Hero'
import Story from './components/Story'
import Product from './components/Product'
import Outcomes from './components/Outcomes'
import Principles from './components/Principles'
import Pricing from './components/Pricing'
import { Closing, Footer } from './components/Closing'

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-graphite">Skip to content</a>
      <p className="eyebrow border-b border-bone/10 px-4 py-2 text-center text-[0.66rem] text-ash">
        Concept project · Aperio is a fictional product designed and built by Dhansurrya S P
      </p>
      <Nav />
      <main id="main">
        <Hero />
        <Story />
        <Product />
        <Outcomes />
        <Principles />
        <Pricing />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
