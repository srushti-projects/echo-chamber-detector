function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center h-[80vh] bg-slate-900 text-white">

      <h1 className="text-6xl font-bold mb-6">
        Break Your
        <span className="text-indigo-400"> Information Bubble</span>
      </h1>

      <p className="text-lg text-slate-400 max-w-xl mb-8">
        Analyze tweets, news, and social media posts to detect
        ideological bias and echo chambers in your information feed.
      </p>

      <button className="bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold transition">
        Analyze Your Feed
      </button>

    </section>
  )
}

export default Hero