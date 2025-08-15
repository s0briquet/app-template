import { Route, Routes, Navigate, Link } from "react-router-dom";
import Home from "./Home";

export default function App() {
  return (
    <div className="min-h-screen p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your App</h1>
        <nav className="flex gap-4">
          <Link className="underline" to="/">Home</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
