export default function Services() {

  const areas = [

    { title: 'Nutrição Clínica', desc: 'Consultas personalizadas para adultos e materno-infatil.',icon: "🥗",color: "bg-emerald-50" },

    { title: 'Formações', desc: 'Formações para empresas de restauração coletiva.',icon: "📚",color: "bg-amber-50" },

    { title: 'Workshops', desc: 'Workshops de educação alimentar.', icon:"🍳", color: "bg-rose-50" },
  ];

return (
    <section className="min-h-screen bg-brand-sand/30 py-20 font-serif">
      <div className="container mx-auto px-6">
        
        {/* Cabeçalho com mais presença */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-brand-olive mb-6 uppercase tracking-tight">
            Áreas de Atuação
          </h2>
          <div className="w-24 h-1 bg-brand-terracotta mx-auto mb-6"></div>
          <p className="text-zinc-600 text-xl italic font-sans">
            Soluções integradas de nutrição e bem-estar para indivíduos e organizações.
          </p>
        </div>

        {/* Grelha de Serviços Renovada */}
        <div className="grid md:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-[35px] shadow-sm border border-brand-sage/10 hover:shadow-xl transition-all group hover:-translate-y-2 duration-300"
            >
              <div className={`${area.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                {area.icon}
              </div>
              
              <h3 className="text-xl font-bold text-brand-olive mb-4 uppercase tracking-tight">
                {area.title}
              </h3>
              
              <p className="text-zinc-600 leading-relaxed font-sans text-xl">
                {area.desc}
              </p>

              <button className="mt-8 text-brand-terracotta font-bold font-sans uppercase tracking-widest text-sm hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Saber Mais →
              </button>
            </div>
          ))}
        </div>

        <div className="mt-19 bg-brand-olive rounded-[600px] p-10 md:p-16 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Pronta para começar a sua mudança?</h3>
          <p className="text-white/80 text-l mb-10 max-w-2xl mx-auto font-sans">
            Agende uma consulta ou peça um orçamento para a sua empresa de forma simples e rápida.
          </p>
          <button className="bg-brand-sand text-brand-olive px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors uppercase tracking-widest">
            Marcar Consulta
          </button>
        </div>

      </div>
    </section>
  );
}