import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white py-6 px-10 shadow-sm">
      <div className="flex justify-between items-center w-full">
        {/* LADO ESQUERDO: Logo e Título */}
        <Link to="/" className="flex items-center gap-4 group">
          <img 
            src="public/logotipo.svg" 
            alt="Logo Sabores&Saberes" 
            className="w-13 h-13 object-contain transition-transform group-hover:scale-110" 
          />
          <span className="text-2xl font-serif font-bold text-brand-olive transition-colors group-hover:text-brand-terracotta">
            Sabores&Saberes
          </span>
        </Link>

        {/* LADO DIREITO: Links de Navegação */}
        <div className="hidden md:flex items-center gap-8 font-sans font-medium text-zinc-600">
          <Link to="/" className="hover:text-brand-olive">Início</Link>
          <Link to="/hot-topics" className="hover:text-brand-olive">Hot Topics</Link>
          <Link to="/receitas" className="hover:text-brand-olive">Receitas</Link>
          <Link to="/servicos" className="hover:text-brand-olive">Serviços</Link>
          <Link to="/contactos" className="hover:text-brand-olive">Contactos</Link>
        </div>

      </div>
    </nav>
  );
}