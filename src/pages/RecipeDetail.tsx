import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function RecipeDetail() {

  const { id } = useParams(); // Pega no ID da URL
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) return <div className="py-20 text-center font-serif">A carregar...</div>;
  if (!recipe) return null;

  useEffect(() => {
    async function fetchRecipe() {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Erro ao carregar receita:", error);
        navigate('/receitas');
      } else {
        setRecipe(data);
      }
      setLoading(false);
    }
    fetchRecipe();
  }, [id, navigate]);

  if (loading) return <div className="py-20 text-center font-serif">A carregar receita...</div>;
  if (!recipe) return null;

  return (
    <article className="min-h-screen bg-brand-cream pb-20 font-serif">
      {/* Banner Principal (Primeira Foto) */}
      <div className="h-[50vh] w-full relative group cursor-pointer" onClick={() => setSelectedImage(recipe.image_url?.[0])}>
        <img 
          src={recipe.image_url?.[0]} 
          className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
          alt={recipe.title}
        />
        <button onClick={(e) => { e.stopPropagation(); navigate(-1); }} className="absolute top-6 left-6 bg-white/90 p-3 rounded-full shadow-lg">
          ← Voltar
        </button>
    </div>

    <div className="max-w-5xl mx-auto px-6">
        {/* Galeria de Imagens Secundárias (Tamanho Médio) */}
        {recipe.image_url && recipe.image_url.length > 1 && (
          <div className="flex flex-wrap gap-4 my-8 justify-center">
            {recipe.image_url.slice(1).map((url: string, index: number) => (
              <div 
                key={index} 
                className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedImage(url)}
              >
                <img src={url} className="w-full h-full object-cover" alt={`Passo ${index + 2}`} />
              </div>
            ))}
          </div>
        )}
  
      </div>
  
      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-brand-sage/10">
          <span className="text-brand-terracotta font-bold uppercase tracking-widest text-sm">
            {recipe.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-olive mt-2 mb-6">
            {recipe.title}
          </h1>
  
          <div className="flex gap-6 mb-10 text-zinc-500 border-y border-zinc-100 py-4">
            <span>⏱️ {recipe.prep_time}</span>
            <span>📊 {recipe.difficulty || 'Fácil'}</span>
          </div>
  
          <div className="grid md:grid-cols-3 gap-12">
            {/* Ingredientes */}
            <div className="md:col-span-1">
              <h2 className="text-xl font-bold text-brand-olive mb-4 uppercase tracking-tight">Ingredientes</h2>
              <ul className="space-y-3">
                {recipe.ingredients?.map((ing: string, index: number) => (
                  <li key={index} className="flex gap-2 text-zinc-600 border-b border-zinc-50 pb-2">
                    <span className="text-brand-sage">•</span> {ing}
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Instruções */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-brand-olive mb-4 uppercase tracking-tight">Modo de Preparação</h2>
              <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">
                {recipe.instructions}
              </p>
            </div>
          </div>
        </div>
        
        {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-10 right-10 text-white text-4xl">&times;</button>
          <img 
            src={selectedImage} 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
            alt="Imagem expandida"
          />
        </div>
      )}

      </div>
    </article>
  );
}