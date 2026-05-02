import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

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
  <section className="py-20 bg-brand-sand min-h-screen font-serif text-left">
    <div className="container mx-auto px-6 max-w-4xl">
      <h2 className="text-5xl font-bold text-brand-olive mb-12">Hot Topics 🔥</h2>

      <div className="space-y-20">
        {topics.map(topic => (
          <article key={topic.id} className="relative group"> 
            
            {/* Botão de Eliminar (Ju) - Mantido no topo para não interferir com o link */}
            {user && (
              <button 
                onClick={() => handleDelete(topic.id)}
                className="absolute -top-4 -right-4 z-20 bg-white text-red-500 border border-red-100 px-4 py-2 rounded-full text-xs font-sans font-bold hover:bg-red-500 hover:text-white transition-all shadow-md"
              >
                Eliminar Post
              </button>
            )}

            {/* TODO O CONTEÚDO DENTRO DO LINK */}
            <Link to={`/hot-topic/${topic.id}`} className="block group">
              {/* Imagem de Capa */}
              {topic.image_url?.[0] && (
                <div className="w-full h-80 rounded-[40px] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img 
                    src={topic.image_url[0]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt={topic.title} 
                  />
                </div>
              )}

              {/* Data e Título */}
              <div className="space-y-2">
                <span className="text-brand-terracotta text-sm font-sans font-bold uppercase tracking-widest">
                  {new Date(topic.created_at).toLocaleDateString('pt-PT')}
                </span>
                <h3 className="text-4xl font-bold text-brand-olive group-hover:text-brand-terracotta transition-colors">
                  {topic.title}
                </h3>
              </div>

              {/* Texto (Excerpt) */}
              <p className="text-zinc-700 leading-relaxed text-lg mt-4 line-clamp-3">
                {topic.content}
              </p>
              
              <span className="inline-block mt-4 text-brand-olive font-bold border-b-2 border-brand-olive hover:text-brand-terracotta hover:border-brand-terracotta transition-all">
                Ler mais →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);
}