export interface Recipe {
  id: string;
  title: string;
  category: 'Pequeno-almoço' | 'Almoço' | 'Jantar' | 'Snack';
  image: string;
  prepTime: string;
  difficulty: 'Fácil' | 'Médio' | 'Pro';
};

export type Post = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  // Add other fields as needed, e.g., content: string; author: string; etc.
};
