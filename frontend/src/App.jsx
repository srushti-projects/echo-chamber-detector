import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Analyze from "./components/Analyze"

function App() {
  return (
    <div className="bg-slate-900 min-h-screen">

      <Navbar />
      <Hero />
      <Features />
      <Analyze />

    </div>
  )
}

export default App