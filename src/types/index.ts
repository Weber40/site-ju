export interface Recipe {
  id: string;
  title: string;
  category: 'Pequeno-almoço' | 'Almoço' | 'Jantar' | 'Snack';
  image: string;
  prepTime: string;
  difficulty: 'Fácil' | 'Médio' | 'Pro';
}