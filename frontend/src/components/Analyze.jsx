import { useState } from "react"
import { FaSearch } from "react-icons/fa"

function Analyze() {

  const [text, setText] = useState("")

  const handleAnalyze = () => {
    console.log("User input:", text)
  }

  return (
    <section className="bg-slate-900 text-white py-24 px-6 flex flex-col items-center">

      <h2 className="text-4xl font-bold mb-8">
        Analyze Your Information Feed
      </h2>

      <p className="text-slate-400 mb-10 text-center max-w-xl">
        Paste tweets, news articles, or social media posts and our AI will detect
        ideological bias and calculate your echo chamber score.
      </p>

      <textarea
        className="w-full max-w-3xl h-48 p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-indigo-500 outline-none text-slate-200"
        placeholder="Paste tweets, posts, or news articles here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="mt-8 flex items-center gap-3 bg-indigo-500 hover:bg-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold transition shadow-lg shadow-indigo-500/30"
      >
        <FaSearch />
        Analyze Feed
      </button>

    </section>
  )
}

export default Analyze