export default function Contact() {
  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-serif font-bold text-center mb-8">Vamos Conversar?</h2>
        <p className="text-zinc-600 text-center mb-12">
          Para marcações de consultas, parcerias ou formações, preenche o formulário ou envia um e-mail.
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Info de Contacto */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">E-mail</h3>
              <p className="text-zinc-600">joanamachdonutricao@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Localização</h3>
              <p className="text-zinc-600">Consultas Presenciais (Felgueiras, Amarante, Braga)</p>
            </div>
            <div className="flex gap-4">
              {/* Links para Instagram/LinkedIn aqui */}
              <span className="text-brand-medium font-bold cursor-pointer hover:underline text-sm uppercase tracking-widest">https://www.linkedin.com/in/joana-teixeira-machado-510b86235/</span>
              <span className="text-brand-medium font-bold cursor-pointer hover:underline text-sm uppercase tracking-widest"></span>
            </div>
          </div>

          {/* Formulário Simples */}
          <form className="space-y-4">
            <input type="text" placeholder="Nome" className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-brand-medium" />
            <input type="email" placeholder="E-mail" className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-brand-medium" />
            <textarea placeholder="A tua mensagem..." rows={4} className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-brand-medium"></textarea>
            <button className="w-full bg-brand-dark text-white font-bold py-4 rounded-xl hover:bg-brand-medium transition-all">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}