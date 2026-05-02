import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Adicionado para o link das receitas
import type { Recipe } from '../types';
import type { User } from '@supabase/supabase-js';
import RecipeCard from './RecipeCard';
import { supabase } from '../lib/supabase';
import { Trash2, UtensilsCrossed } from 'lucide-react';

const CATEGORIES = ['Todas', 'Pequeno-almoço', 'Almoço/Jantar', 'Snacks', 'Sobremesas'];

export default function RecipeGrid() {
  const [filter, setFilter] = useState('Todas');
  const [user, setUser] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const filteredRecipes = filter === 'Todas'
    ? recipes
    : recipes.filter(r => r.category?.trim().toLowerCase() === filter.trim().toLowerCase());

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const { data } = await supabase.from('recipes').select('*').order('created_at', { ascending: false });
    setRecipes(data || []);
  }

  const deleteRecipe = async (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Impede que o clique no botão abra a página da receita
    if (window.confirm("Tens a certeza que queres apagar esta receita?")) {
      const { error } = await supabase.from('recipes').delete().eq('id', id);
      if (error) {
        alert("Erro ao eliminar: " + error.message);
      } else {
        setRecipes(recipes.filter(r => r.id !== id));
      }
    }
  };

return (
    <section className="py-16 bg-brand-sand/30 min-h-screen relative overflow-hidden font-serif">
      {/* Camada de Textura Orgânica */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Cabeçalho Editorial */}
        <div className="text-center mb-20">
          <span className="text-brand-terracotta font-sans font-bold uppercase tracking-[0.3em] text-sm">Nutrição & Sabor</span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-olive mt-4 mb-6">Receitas da Ju</h2>
          <div className="w-24 h-1.5 bg-brand-terracotta mx-auto mb-6 rounded-full opacity-80"></div>
          <p className="text-zinc-600 text-xl italic max-w-xl mx-auto">
            Comida real para pessoas reais. Inspira-te com opções saudáveis e práticas.
          </p>
        </div>

        {/* Filtros Renovados */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300
                ${filter === cat 
                  ? 'bg-brand-olive text-white shadow-xl scale-105 border-transparent' 
                  : 'bg-white/50 text-brand-olive border border-brand-sage/20 hover:bg-white hover:shadow-md backdrop-blur-sm'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Grelha de Cartões */}
        {filteredRecipes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} className="relative group">
                
                {/* Botão de Eliminar (Apenas Admin) - Mais discreto e elegante */}
                {user && (
                  <button 
                    onClick={(e) => deleteRecipe(e, recipe.id)}
                    className="absolute top-4 right-4 z-30 bg-white/90 text-red-500 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                    title="Eliminar Receita"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                {/* Link que envolve o card com animação suave */}
                <Link 
                  to={`/receita/${recipe.id}`} 
                  className="block transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="shadow-sm group-hover:shadow-2xl rounded-[45px] transition-shadow duration-500">
                    <RecipeCard recipe={recipe} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* Estado Vazio */
          <div className="text-center py-24 bg-white/40 rounded-[60px] border-2 border-dashed border-brand-sage/20">
            <UtensilsCrossed size={48} className="mx-auto text-brand-sage opacity-30 mb-6" />
            <p className="text-zinc-500 italic text-xl">Ainda não temos receitas nesta categoria...</p>
          </div>
        )}
      </div>
    </section>
  );
}