import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo / Nome */}
        <Link to="/" className="text-2xl font-serif font-bold text-brand-dark">
          Sabores&Saberes
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-8 font-serif font-medium text-zinc-600">
          <Link to="/" className="hover:text-brand-medium transition-colors">Início</Link>
          <Link to="/hot-topics" className="hover:text-brand-medium transition-colors">Hot Topics</Link>
          <Link to="/receitas" className="hover:text-brand-medium transition-colors">Receitas</Link>
          <Link to="/servicos" className="hover:text-brand-medium transition-colors">Serviços</Link>
          <Link to="/contactos" className="hover:text-brand-medium transition-colors">Contactos</Link>
        </div>
      </div>
    </nav>
  );
}