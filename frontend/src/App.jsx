import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Analyze from "./components/Analyze"
import Results from "./components/Results"

function App() {
  return (
    <div className="bg-slate-900 min-h-screen">

      <Navbar />
      <Hero />
      <Features />
      <Analyze />
      <Results />

    </div>
  )
}

export default App