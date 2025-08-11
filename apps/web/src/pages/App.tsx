import { Link } from "react-router-dom";
import Layout from "./_Layout";

export default function App() {
  return (
    <Layout>
      <section className="grid gap-6">
        <h1 className="text-3xl font-semibold">
          Sharpen your Japanese in an AI-powered dojo
        </h1>
        <p className="text-gray-600 max-w-prose">
          Practice natural conversations with friendly “senseis.” Start simple,
          level up fast.
        </p>
        <div className="flex gap-3">
          <Link
            to="/dojos"
            className="px-4 py-2 rounded-xl bg-black text-white"
          >
            Choose a dojo
          </Link>
          <Link to="/about" className="px-4 py-2 rounded-xl border">
            How it works
          </Link>
        </div>
      </section>
    </Layout>
  );
}
