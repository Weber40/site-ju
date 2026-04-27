import type { Recipe } from '../types';

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-dark">
          {recipe.category}
        </span>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-zinc-800 mb-2 group-hover:text-brand-medium transition-colors">
          {recipe.title}
        </h3>
        <div className="flex items-center text-zinc-500 text-sm gap-4">
          <span className="flex items-center gap-1">
            ⏱️ {recipe.prepTime}
          </span>
          <span className="flex items-center gap-1">
            📊 {recipe.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}