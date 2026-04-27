export default function Hero() {
  return (
    <section className="relative bg-brand-light py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Lado Esquerdo: Texto */}
        <div className="z-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-brand-dark leading-tight">
            Nutrir o corpo, <br />
            <span className="text-brand-medium text-3xl lg:text-5xl italic">com equilíbrio e ciência.</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-600 max-w-lg leading-relaxed">
            Olá! Sou a Joana Machado, nutricionista focada em ajudar-te a alcançar a tua melhor versão sem dietas restritivas. Acredito que a comida deve ser uma fonte de prazer e saúde.
          </p>
          <div className="mt-10 flex gap-4">
            <button className="bg-brand-medium text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all">
              Marcar Consulta
            </button>
            <button className="border-2 border-brand-medium text-brand-medium px-8 py-4 rounded-full font-bold hover:bg-brand-medium hover:text-white transition-all">
              Ver Receitas
            </button>
          </div>
        </div>

        {/* Lado Direito: Foto */}
        <div className="relative">
          <div className="absolute -z-10 w-72 h-72 lg:w-96 lg:h-96 bg-brand-medium/20 rounded-full blur-3xl -top-10 -right-10"></div>
          <img 
            src="/src/assets/hero.png" 
            alt="Foto de Perfil" 
            className="rounded-2xl shadow-2xl w-full max-w-md mx-auto object-cover border-4 border-white"
          />
        </div>

      </div>
    </section>
  );
}