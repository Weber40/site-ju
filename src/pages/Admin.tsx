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
        </div>
      </div>
    </section>
  );
}