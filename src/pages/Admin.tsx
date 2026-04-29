import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <section className="min-h-screen bg-brand-sand/20 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-brand-olive">Painel de Controlo</h1>
          <button onClick={handleLogout} className="text-brand-terracotta font-bold underline">Sair</button>
          
          <div>
            <h2 className="text-4xl font-serif font-bold text-brand-olive">Painel de Gestão</h2>
            <p className="text-zinc-500">O que vamos criar hoje, Ju?</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm font-sans font-bold text-brand-terracotta hover:underline"
          >
            Sair da conta
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Hot Topics */}
          <button 
            onClick={() => navigate('/admin/novo-topico')}
            className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-sage/20 hover:scale-[1.02] transition-all text-left group"
          >
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🔥</div>
            <h3 className="text-2xl font-serif font-bold text-brand-olive mb-2">Hot Topics</h3>
            <p className="text-zinc-500 text-sm italic">Posts sobre nutrição, mitos e dicas rápidas.</p>
          </button>

          {/* Card Receitas */}
          <button 
            onClick={() => navigate('/admin/nova-receita')}
            className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-sage/20 hover:scale-[1.02] transition-all text-left group"
          >
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🥗</div>
            <h3 className="text-2xl font-serif font-bold text-brand-olive mb-2">Receitas</h3>
            <p className="text-zinc-500 text-sm italic">Adicionar pratos novos ao arquivo de receitas.</p>
          </button>
            <div className="mt-20">
              <h3 className="text-xl font-serif font-bold text-brand-olive mb-6 border-b border-brand-sage/30 pb-2">
                Gestão de Conteúdo Existente
              </h3>
            <div className="bg-white rounded-[30px] p-6 shadow-sm">
              <p className="text-zinc-500 text-sm italic">
                Dica: Podes apagar posts e receitas diretamente nas páginas deles enquanto navegas no site (os botões de eliminar só aparecem para ti!).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 