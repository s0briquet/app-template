import { Link, NavLink } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-xl text-sm ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold">
            ConvoDojo
          </Link>
          <nav className="flex gap-2">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>
            <NavLink to="/dojos" className={navClass}>
              Dojos
            </NavLink>
            <NavLink to="/about" className={navClass}>
              About
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      <footer className="mx-auto max-w-5xl px-4 py-10 text-sm text-gray-500">
        © {new Date().getFullYear()} ConvoDojo
      </footer>
    </div>
  );
}
