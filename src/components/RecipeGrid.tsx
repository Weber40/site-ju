import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Adicionado para o link das receitas
import type { Recipe } from '../types';
import type { User } from '@supabase/supabase-js';
import RecipeCard from './RecipeCard';
import { supabase } from '../lib/supabase';

const CATEGORIES = ['Todas', 'Pequeno-almoço', 'Almoço/Jantar', 'Snack', 'Sobremesas'];

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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-serif font-bold text-zinc-800 mb-4">Receitas da Ju</h2>
        <p className="text-zinc-500 mb-10 italic">Comida real para pessoas reais</p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full border transition-all ${
                filter === cat 
                ? 'bg-brand-olive text-white border-brand-olive shadow-md' // Ajustado para brand-olive conforme regra
                : 'bg-transparent text-zinc-500 border-zinc-200 hover:border-brand-olive'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="relative group">
              {/* Botão de Eliminar - Apenas se user existir */}
              {user && (
                <button 
                  onClick={(e) => deleteRecipe(e, recipe.id)}
                  className="absolute -top-3 -right-3 z-20 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                  title="Eliminar Receita"
                >
                  ✕
                </button>
              )}

              {/* Link para a página de detalhe */}
              <Link to={`/receita/${recipe.id}`} className="block transition-transform hover:scale-[1.02]">
                <RecipeCard recipe={recipe} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}