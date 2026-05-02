import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopic() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('hot_topics')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          navigate('/hot-topics');
          return;
        }
        setTopic(data);
      } catch (err) {
        console.error("Erro ao carregar tópico:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchTopic();
  }, [id, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-sand/10">
      <p className="text-xl font-serif animate-pulse text-brand-olive">A carregar o tópico...</p>
    </div>
  );

  if (!topic) return null;

  return (
    <article className="min-h-screen bg-brand-sand/10 pb-20 font-serif text-left">
      <div className="container mx-auto px-6 pt-10">
        <button 
          onClick={() => navigate(-1)} 
          className="text-brand-olive font-sans font-bold flex items-center gap-2 hover:underline mb-8"
        >
          ← Voltar aos tópicos
        </button>

        {/* GALERIA DE IMAGENS (Tamanho Médio, igual às receitas) */}
        {topic.image_url && topic.image_url.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {topic.image_url.map((url: string, index: number) => (
              <div 
                key={index} 
                className="w-40 h-40 md:w-52 md:h-52 rounded-[32px] overflow-hidden shadow-sm cursor-pointer hover:scale-105 transition-all border-4 border-white"
                onClick={() => setSelectedImage(url)}
              >
                <img 
                  src={url} 
                  className="w-full h-full object-cover" 
                  alt={`${topic.title} ${index + 1}`} 
                />
              </div>
            ))}
          </div>
        )}

        {/* CONTEÚDO DO TÓPICO */}
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[50px] shadow-sm border border-brand-sage/10">
          <div className="mb-8">
            <span className="text-brand-terracotta font-bold uppercase tracking-widest text-sm">
              {new Date(topic.created_at).toLocaleDateString('pt-PT')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-olive mt-2 uppercase leading-tight">
              {topic.title}
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-zinc-600 text-xl leading-relaxed whitespace-pre-wrap italic">
              {topic.content}
            </p>
          </div>
        </div>
      </div>

      {/* LIGHTBOX (IMAGEM EXPANDIDA) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain animate-in zoom-in duration-300"
            alt="Imagem expandida"
          />
        </div>
      )}
    </article>
  );
}