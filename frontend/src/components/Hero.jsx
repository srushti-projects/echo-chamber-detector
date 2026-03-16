import { FaSearch } from "react-icons/fa"

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center h-[80vh] bg-slate-900 text-white px-6">

      <h1 className="text-6xl font-extrabold mb-6 leading-tight">
        Detect Your
        <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Information Bubble
        </span>
      </h1>

      <p className="text-lg text-slate-400 max-w-xl mb-10">
        Our AI analyzes your tweets, news articles, and social media posts
        to reveal ideological bias and measure how diverse your information sources really are.
      </p>

      <button className="flex items-center gap-3 bg-indigo-500 hover:bg-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold transition shadow-lg shadow-indigo-500/30">

        <FaSearch />
        Analyze Your Feed

      </button>

    </section>
  )
}

export default Hero;