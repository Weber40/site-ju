import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function HotTopics() {
  const [topics, setTopics] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null); // Estado para saber se a Ju está logada

  useEffect(() => {
    //1. Verificar se a Ju está logada
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    } );

    //2. Carregar os tópicos
    fetchTopics();
  }, []);

    async function fetchTopics() {
      const { data, error } = await supabase.from('hot_topics').select('*').order('created_at', { ascending: false });
      if (error)console.error('Erro ao carregar:', error);
      else setTopics(data || []);
    }
    //3. Função p/ eliminar um topico (apenas para a Ju)
    const handleDelete = async (id: string) => {
      if (window.confirm("Tens a certeza que queres apagar este post?")) {
      const { error } = await supabase.from('hot_topics').delete().eq('id', id);
      
      if (error) {
        alert("Erro ao eliminar: " + error.message);
      } else {
        // Atualiza a lista localmente para o post desaparecer logo
        setTopics(topics.filter(t => t.id !== id));
      }
    }
  };

  return (
    <section className="py-20 bg-brand-sand min-h-screen font-serif">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-5xl font-serif font-bold text-brand-olive mb-12">Hot Topics 🔥</h2>

        <div className="space-y-12">
          {topics.map(topic => (
            <article key={topic.id} className="relative border-b border-brand-sage/20 pb-12 group"> 
              {/* BOTÃO DE ELIMINAR: Só renderiza se alguém estiver (logado) */}
              {user && (
                <button 
                  onClick={() => handleDelete(topic.id)}
                  className="absolute top-0 right-0 bg-red-50 text-red-500 px-4 py-2 rounded-full text-xs font-sans font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm">
                  Eliminar Post
                </button>
              )}
              <span className="text-brand-terracotta text-sm font-sans font-bold uppercase tracking-widest">
                {new Date(topic.created_at).toLocaleDateString('pt-PT')}
              </span>
              <h3 className="text-3xl font-bold text-brand-olive mt-2 mb-4">{topic.title}</h3>
              <p className="text-zinc-700 leading-relaxed text-lg whitespace-pre-wrap">{topic.content}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}