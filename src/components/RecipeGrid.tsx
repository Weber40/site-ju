import { useEffect, useState } from 'react';
import type { Recipe } from '../types';
import type { User } from '@supabase/supabase-js';
import RecipeCard from './RecipeCard';
import { supabase } from '../lib/supabase';

// Mock data expandida para testar filtros
/*const MOCK_RECIPES: Recipe[] = [
  { id: '1', title: 'Papas de Aveia e Maçã', category: 'Pequeno-almoço', image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=800', prepTime: '15 min', difficulty: 'Fácil' },
  { id: '2', title: 'Caril de Legumes', category: 'Almoço', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800', prepTime: '30 min', difficulty: 'Médio' },
  { id: '3', title: 'Bolachas de Banana', category: 'Snack', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800', prepTime: '20 min', difficulty: 'Fácil' },
  { id: '4', title: 'Sopa de Abóbora', category: 'Jantar', image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=800', prepTime: '40 min', difficulty: 'Fácil' },
]; */

const CATEGORIES = ['Todas', 'Pequeno-almoço', 'Almoço', 'Jantar', 'Snack'];

export default function RecipeGrid() {
const [filter, setFilter] = useState('Todas');
const [user, setUser] = useState<User | null>(null); // Estado para saber se a Ju está logada
const [recipes, setRecipes] = useState<Recipe[]>([]);

const filteredRecipes = filter === 'Todas'
  ? recipes
  : recipes.filter(r => r.category === filter);

    useEffect(() => {
    // 1. Verificar se há alguém logado
    supabase.auth.getUser().then(({ data: { user } }) => {
      return setUser(user);
    });
    // 2. Carregar os posts
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const { data } = await supabase.from('recipes').select('*').order('created_at', { ascending: false });
    setRecipes(data || []);
  }

  // 3. Função para eliminar
  const deleteRecipe = async (id: string) => {
    if (window.confirm("Tens a certeza que queres apagar este post?")) {
      const { error } = await supabase.from('recipes').delete().eq('id', id);
      
      if (error) {
        alert("Erro ao eliminar: " + error.message);
      } else {
        // Atualiza a lista localmente para o post desaparecer logo
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
                ? 'bg-brand-medium text-white border-brand-medium shadow-md' 
                : 'bg-transparent text-zinc-500 border-zinc-200 hover:border-brand-medium'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Grid com animação simples */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
}