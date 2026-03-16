import { FaBrain } from "react-icons/fa"

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-12 py-6 bg-slate-900 text-white border-b border-slate-800">

      <div className="flex items-center gap-3">
        <FaBrain className="text-indigo-400 text-2xl" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Echo Chamber Detector
        </h1>
      </div>

      <div className="space-x-8 text-slate-300">
        <button className="hover:text-indigo-400 transition">Home</button>
        <button className="hover:text-indigo-400 transition">How it Works</button>
        <button className="hover:text-indigo-400 transition">Analyze</button>
      </div>

    </nav>
  )
}

export default Navbar;