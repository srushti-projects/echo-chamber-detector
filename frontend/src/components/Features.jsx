import { FaBrain, FaBalanceScale, FaChartPie } from "react-icons/fa"

function Features() {
  return (
    <section className="bg-slate-950 text-white py-24 px-10">

      <h2 className="text-4xl font-bold text-center mb-16">
        How Our AI Analyzes Your Feed
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-indigo-500 transition">
          <FaBrain className="text-indigo-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-3">Sentiment Analysis</h3>
          <p className="text-slate-400">
            Our NLP model analyzes whether posts are positive, negative,
            or neutral to understand emotional tone in your information feed.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-indigo-500 transition">
          <FaBalanceScale className="text-indigo-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-3">Bias Detection</h3>
          <p className="text-slate-400">
            Machine learning models classify whether content leans
            left, right, or neutral using political bias datasets.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-indigo-500 transition">
          <FaChartPie className="text-indigo-400 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-3">Echo Chamber Score</h3>
          <p className="text-slate-400">
            Using information theory, the system calculates how diverse
            your sources are and estimates echo chamber risk.
          </p>
        </div>

      </div>

    </section>
  )
}

export default Features