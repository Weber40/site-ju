export default function Services() {
  const areas = [
    { title: 'Nutrição Clínica', desc: 'Consultas personalizadas para adultos e materno-infatil.' },
    { title: 'Formações', desc: 'Formações para empresas de restauração coletiva.' },
    { title: 'Workshops', desc: 'Workshops de educação alimentar.' }
  ];

  return (
    <section className="py-20 bg-zinc-50 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-serif font-bold text-center mb-16">Áreas de Atuação</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {areas.map(area => (
            <div key={area.title} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
              <h3 className="text-xl font-bold text-brand-dark mb-4">{area.title}</h3>
              <p className="text-zinc-600">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}