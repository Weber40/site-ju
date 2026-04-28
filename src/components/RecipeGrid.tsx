import { useState } from 'react';
import type { Recipe } from '../types';
import RecipeCard from './RecipeCard';

// Mock data expandida para testar filtros
const MOCK_RECIPES: Recipe[] = [
  { id: '1', title: 'Papas de Aveia e Maçã', category: 'Pequeno-almoço', image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=800', prepTime: '15 min', difficulty: 'Fácil' },
  { id: '2', title: 'Caril de Legumes', category: 'Almoço', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800', prepTime: '30 min', difficulty: 'Médio' },
  { id: '3', title: 'Bolachas de Banana', category: 'Snack', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800', prepTime: '20 min', difficulty: 'Fácil' },
  { id: '4', title: 'Sopa de Abóbora', category: 'Jantar', image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=800', prepTime: '40 min', difficulty: 'Fácil' },
];

const CATEGORIES = ['Todas', 'Pequeno-almoço', 'Almoço', 'Jantar', 'Snack'];

export default function RecipeGrid() {
  const [filter, setFilter] = useState('Todas');

  const filteredRecipes = filter === 'Todas' 
    ? MOCK_RECIPES 
    : MOCK_RECIPES.filter(r => r.category === filter);

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