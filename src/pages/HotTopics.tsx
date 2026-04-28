export default function HotTopics() {
  const topics = [
    { id: 1, title: "O mito do jejum intermitente", date: "24 Abr", excerpt: "Será que o jejum é para todos? Vamos analisar a ciência por trás..." },
    { id: 2, title: "Hidratação e Performance", date: "20 Abr", excerpt: "Beber água é o básico, mas a forma como te hidratas influencia o teu foco." },
    { id: 3, title: "Superalimentos: Marketing ou Realidade?", date: "15 Abr", excerpt: "Precisas mesmo de sementes de chia para ser saudável?" },
  ];

  return (
    <section className="py-20 bg-brand-cream min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-5xl font-serif font-bold text-brand-olive mb-12">Hot Topics 🔥</h2>
        <div className="space-y-8">
          {topics.map(topic => (
            <article key={topic.id} className="bg-white p-8 rounded-3xl shadow-sm border-l-8 border-brand-terracotta hover:shadow-md transition-all">
              <span className="text-brand-sage font-bold text-sm uppercase">{topic.date}</span>
              <h3 className="text-2xl font-serif font-bold text-brand-olive mt-2 mb-4">{topic.title}</h3>
              <p className="text-zinc-600 mb-6">{topic.excerpt}</p>
              <button className="text-brand-terracotta font-bold hover:underline">Ler artigo completo →</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}