import { PieChart, Pie, Cell, Tooltip } from "recharts"

const data = [
  { name: "Left", value: 40 },
  { name: "Right", value: 35 },
  { name: "Neutral", value: 25 }
]

const COLORS = ["#6366f1", "#ef4444", "#22c55e"]

function Results() {
  return (
    <section className="bg-slate-950 text-white py-24 px-10">

      <h2 className="text-4xl font-bold text-center mb-16">
        Analysis Results
      </h2>

      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">

        {/* Echo Chamber Score */}

        <div className="bg-slate-900 p-10 rounded-xl border border-slate-800 text-center">
          <h3 className="text-2xl font-semibold mb-6">
            Echo Chamber Score
          </h3>

          <div className="text-6xl font-bold text-indigo-400 mb-4">
            72%
          </div>

          <p className="text-slate-400">
            High echo chamber risk. Your sources mostly share
            similar political viewpoints.
          </p>
        </div>


        {/* Ideology Distribution */}

        <div className="bg-slate-900 p-10 rounded-xl border border-slate-800 flex flex-col items-center">

          <h3 className="text-2xl font-semibold mb-6">
            Ideology Distribution
          </h3>

          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

        </div>

      </div>

    </section>
  )
}

export default Results