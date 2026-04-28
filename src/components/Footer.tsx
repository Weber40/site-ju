export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-12">
      <div className="container mx-auto px-6 border-t border-zinc-800 pt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif font-bold text-white mb-2">Sabores&Saberes</h2>
            <p className="text-sm">© 2026 Todos os direitos reservados.</p>
          </div>
          
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>

          <p className="text-xs text-zinc-600">
            Feito com ❤️ por um Engenheiro Informático.
          </p>
        </div>
      </div>
    </footer>
  );
}