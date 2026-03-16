function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-slate-900 text-white border-b border-slate-700">
      
      <h1 className="text-2xl font-bold text-indigo-400">
        Echo Chamber Detector
      </h1>

      <div className="space-x-6">
        <button className="hover:text-indigo-400">Home</button>
        <button className="hover:text-indigo-400">How it Works</button>
        <button className="hover:text-indigo-400">Analyze</button>
      </div>

    </nav>
  )
}

export default Navbar