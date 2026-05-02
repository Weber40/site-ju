import { Mail, MapPin, Link, Send } from 'lucide-react';

export default function Contact() {
  const linkedinUrl = "https://www.linkedin.com/in/joana-teixeira-machado-510b86235/";

  return (
    <section className="min-h-screen bg-brand-sand/30 py-12 font-serif relative overflow-hidden text-left">
      {/* Camada de textura de papel subtil */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Cabeçalho alinhado com o estilo do site */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-brand-olive mb-6 tracking-tight">
              Vamos Conversar?
            </h2>
            <div className="w-20 h-1.5 bg-brand-terracotta mx-auto mb-8 rounded-full"></div>
            <p className="text-zinc-600 text-xl font-sans max-w-2xl mx-auto italic leading-relaxed">
              Para marcações de consultas, parcerias ou formações, preenche o formulário abaixo ou utiliza os canais diretos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start">
            
            {/* COLUNA ESQUERDA: Informações de Contacto Reestruturadas */}
            <div className="space-y-8">
              <div className="bg-white/60 backdrop-blur-md p-10 rounded-[40px] border border-brand-sage/15 shadow-sm">
                
                {/* E-mail */}
                <div className="flex items-start gap-6 mb-10">
                  <div className="bg-brand-olive/10 p-4 rounded-2xl text-brand-olive shadow-inner">
                    <Mail size={26} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-brand-olive uppercase tracking-[0.15em] text-xs mb-2">E-mail Profissional</h4>
                    <a 
                      href="mailto:joanamachdonutricao@gmail.com" 
                      className="text-zinc-700 font-sans text-lg hover:text-brand-terracotta transition-colors break-all underline-offset-4 hover:underline"
                    >
                      joanamachdonutricao@gmail.com
                    </a>
                  </div>
                </div>

                {/* Localização (Mantendo os teus dados originais) */}
                <div className="flex items-start gap-6 mb-10">
                  <div className="bg-brand-olive/10 p-4 rounded-2xl text-brand-olive shadow-inner">
                    <MapPin size={26} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-olive uppercase tracking-[0.15em] text-xs mb-2">Localização</h4>
                    <p className="text-zinc-700 font-sans text-lg leading-relaxed">
                      Consultas Presenciais em:<br />
                      <span className="font-bold text-brand-olive">Felgueiras, Amarante e Braga</span>
                    </p>
                  </div>
                </div>

                {/* LinkedIn (Agora funcional) */}
                <div className="flex items-start gap-6">
                  <div className="bg-brand-olive/10 p-4 rounded-2xl text-brand-olive shadow-inner">
                    <Link size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-olive uppercase tracking-[0.15em] text-xs mb-2">Network</h4>
                    <a 
                      href={linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-brand-terracotta font-sans font-bold text-lg hover:translate-x-1 transition-transform"
                    >
                      Ver perfil profissional →
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* COLUNA DIREITA: Formulário com estilo Premium */}
            <form className="bg-white p-8 lg:p-10 rounded-[40px] shadow-xl shadow-brand-olive/5 border border-brand-sage/10 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold text-brand-olive uppercase tracking-[0.25em] mb-1 ml-2 opacity-70">O teu Nome</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Maria Silva"
                    className="w-full p-3 rounded-2xl bg-brand-sand/15 border-none ring-1 ring-brand-sage/20 focus:ring-2 focus:ring-brand-terracotta outline-none transition-all font-sans text-zinc-700 placeholder:text-zinc-400"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-brand-olive uppercase tracking-[0.25em] mb-1 ml-2 opacity-70">O teu E-mail</label>
                  <input 
                    type="email" 
                    placeholder="exemplo@correio.com"
                    className="w-full p-3 rounded-2xl bg-brand-sand/15 border-none ring-1 ring-brand-sage/20 focus:ring-2 focus:ring-brand-terracotta outline-none transition-all font-sans text-zinc-700 placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-brand-olive uppercase tracking-[0.25em] mb-3 ml-2 opacity-70">Mensagem ou Pedido de Consulta</label>
                <textarea 
                  rows={4}
                  placeholder="Olá Joana, gostaria de saber mais sobre..."
                  className="w-full p-3 rounded-2xl bg-brand-sand/15 border-none ring-1 ring-brand-sage/20 focus:ring-2 focus:ring-brand-terracotta outline-none transition-all font-sans text-zinc-700 placeholder:text-zinc-400 resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-olive text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-brand-terracotta transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs"
              >
                <Send size={18} className="animate-pulse" />
                Enviar Mensagem
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
}