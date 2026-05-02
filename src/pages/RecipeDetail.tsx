import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          navigate('/receitas');
          return;
        }
        setRecipe(data);
      } catch (err) {
        console.error("Erro ao carregar:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchRecipe();
  }, [id, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-sand/10">
      <p className="text-xl font-serif animate-pulse text-brand-olive">A carregar...</p>
    </div>
  );

  if (!recipe) return null;

  return (
    <article className="min-h-screen bg-brand-sand/10 pb-20 font-serif">
      {/* Botão Voltar Discreto */}
      <div className="container mx-auto px-6 pt-10">
        <button 
          onClick={() => navigate(-1)} 
          className="text-brand-olive font-sans font-bold flex items-center gap-2 hover:underline mb-8"
        >
          ← Voltar às receitas
        </button>

        {/* GALERIA DE IMAGENS MÉDIAS (Todas as imagens aparecem aqui) */}
        {recipe.image_url && recipe.image_url.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {recipe.image_url.map((url: string, index: number) => (
              <div 
                key={index} 
                className="w-35 h-35 md:w-46 md:h-46 rounded-[32px] overflow-hidden shadow-lg cursor-pointer hover:scale-[1.03] transition-all border-8 border-white"
                onClick={() => setSelectedImage(url)}
              >
                <img src={url} className="w-full h-full object-cover" alt={`${recipe.title} ${index + 1}`} />
              </div>
            ))}
          </div>
        )}

        {/* CONTEÚDO DA RECEITA */}
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[50px] shadow-sm border border-brand-sage/10 text-left">
          <span className="text-brand-terracotta font-bold uppercase tracking-widest text-sm">
            {recipe.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-olive mt-2 mb-8">
            {recipe.title}
          </h1>

          <div className="flex gap-8 mb-12 text-zinc-500 border-y border-zinc-100 py-6 font-sans font-bold text-lg">
            <span className="flex items-center gap-2">⏱️ {recipe.prep_time} MIN</span>
            <span className="flex items-center gap-2">📊 {recipe.difficulty}</span>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {/* Coluna Ingredientes */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-brand-olive mb-6 uppercase tracking-tight border-b-2 border-brand-sand pb-2">
                Ingredientes
              </h2>
              <ul className="space-y-4">
                {recipe.ingredients?.map((ing: string, index: number) => (
                  <li key={index} className="flex gap-3 text-zinc-600 text-lg leading-tight">
                    <span className="text-brand-sage font-bold">•</span> {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna Preparação */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-brand-olive mb-6 uppercase tracking-tight border-b-2 border-brand-sand pb-2">
                Modo de Preparação
              </h2>
              <p className="text-zinc-600 leading-relaxed text-lg whitespace-pre-wrap">
                {recipe.instructions}
              </p>
            </div>
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
          <p className="absolute bottom-8 text-white/50 font-sans text-sm tracking-widest uppercase">
            Clica para fechar
          </p>
        </div>
      )}
    </article>
  );
}