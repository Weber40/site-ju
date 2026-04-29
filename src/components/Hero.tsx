import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-brand-greenlight py-20 lg:py-20">
      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Lado Esquerdo: Texto */}
        <div className="z-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-brand-dark leading-tight">
            Nutrir o corpo, <br />
            <span className="text-brand-greenDark text-3xl lg:text-5xl italic">com equilíbrio e ciência.</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-600 max-w-lg leading-relaxed">
            Bem-vindo(a)!
      Este é um espaço dedicado à nutrição e à alimentação consciente, criado para informar, descomplicar e inspirar escolhas mais saudáveis no dia a dia. Aqui encontras conteúdos baseados em evidência científica, apresentados de forma clara e prática, para que possas aplicá-los facilmente na tua rotina.
          </p>
          <div className="mt-10 flex gap-4">
            <Link to="/biografia" 
            className="border-2 border-brand-medium text-brand-greenDark px-8 py-4 rounded-full font-serif font-bold hover:bg-brand-greenLight transition-all inline-block">
          Conhece-me
          </Link>
            <Link to="/contactos" 
            className="border-2 border-brand-medium text-brand-medium px-8 py-4 rounded-full font-serif font-bold hover:bg-brand-medium hover:text-white transition-all">
              Marcar Consulta
            </Link>
          </div>
        </div>

        {/* Lado Direito: Foto */}
        <div className="relative">
          <div className="absolute -z-10 w-72 h-72 lg:w-96 lg:h-96 bg-brand-medium/20 rounded-full blur-3xl -top-10 -right-10"></div>
          <img 
            src="/src/components/pfpju.png" 
            alt="Foto de Perfil" 
            className="rounded-2xl shadow-2xl w-full max-w-md mx-auto object-cover border-4 border-white"
          />
        </div>

      </div>
    </section>
  );
}