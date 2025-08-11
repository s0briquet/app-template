import { Link } from "react-router-dom";
import Layout from "./_Layout";

const DOJOS = [
  {
    id: "mom",
    name: "お母さん",
    subtitle: "Beginner – warm family chat",
    emoji: "👩‍🦳",
  },
  {
    id: "friend",
    name: "友達",
    subtitle: "Intermediate – casual convo",
    emoji: "😊",
  },
  {
    id: "coworker",
    name: "同僚",
    subtitle: "Advanced – workplace politeness",
    emoji: "👔",
  },
];

export default function Dojos() {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">Pick your sensei</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOJOS.map((d) => (
          <Link
            key={d.id}
            to={`/session/${d.id}`}
            className="rounded-2xl border bg-white p-4 hover:shadow-sm"
          >
            <div className="text-3xl">{d.emoji}</div>
            <div className="mt-2 font-medium">{d.name}</div>
            <div className="text-gray-500 text-sm">{d.subtitle}</div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
