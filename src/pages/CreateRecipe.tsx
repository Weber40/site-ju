import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function CreateRecipe() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Pequeno-Almoço');
  const [prepTime, setPrepTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('Fácil');
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const uploadedUrls: string[] = [];

    if (imageFiles) {
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('recipe-image_url')
        .upload(filePath, file);

      if (data) {
        const { data: urlData } = supabase.storage
          .from('recipe-image_url')
          .getPublicUrl(filePath);
        uploadedUrls.push(urlData.publicUrl);
      }
    }
  }
    console.log("URLs geradas para guardar:", uploadedUrls);

    const ingredientsArray = ingredients.split('\n').filter(i => i.trim() !== '');

    const { error: dbError } = await supabase
      .from('recipes')
      .insert([{ 
        title, 
        category, 
        prep_time: prepTime, 
        difficulty,
        ingredients: ingredientsArray, 
        instructions,
        image_url: uploadedUrls //guarda o array de URLs das imagens no campo "images" da base de dados
      }]);
    
    if (dbError) console.error("Erro na BD:", dbError.message);
    if (dbError) {
      alert("Erro ao guardar receita: " + dbError.message);
    } else {
      alert("Receita guardada com sucesso! 🥗");
      navigate('/receitas');
    }
    setLoading(false);
  };


  return (
    <section className="min-h-screen bg-brand-sand/20 py-20 px-6 font-serif">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-[40px] shadow-sm border border-brand-sage/20">
        <button onClick={() => navigate('/admin/nova-receita')} className="text-brand-sage mb-8 block font-sans">← Voltar ao painel</button>
        <h2 className="text-3xl font-bold text-brand-olive mb-10">Nova Receita</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 font-sans">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-brand-olive mb-2 uppercase tracking-widest">Nome da Receita</label>
              <input 
                className="w-full p-4 rounded-2xl bg-brand-sand/10 border-none ring-1 ring-brand-sage/30 outline-none" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Panquecas de Aveia"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-olive mb-2 uppercase tracking-widest">Fotografias (A primeira será a capa)</label>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={(e) => setImageFiles(e.target.files)}
                className="w-full p-4 rounded-2xl bg-brand-sand/10 border-none ring-1 ring-brand-sage/30 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-olive mb-2 uppercase tracking-widest">Categoria</label>
              <select 
                className="w-full p-4 rounded-2xl bg-brand-sand/10 border-none ring-1 ring-brand-sage/30 outline-none appearance-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Pequeno-Almoço</option>
                <option>Almoço/Jantar</option>
                <option>Snacks</option>
                <option>Sobremesas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-olive mb-2 uppercase tracking-widest">Dificuldade</label>
              <select 
                className="w-full p-4 rounded-2xl bg-brand-sand/10 border-none ring-1 ring-brand-sage/30 outline-none appearance-none"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option>Fácil</option>
                <option>Média</option>
                <option>Difícil</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-olive mb-2 uppercase tracking-widest">Tempo de Preparação (ex: 20 min)</label>
            <input 
              className="w-full p-4 rounded-2xl bg-brand-sand/10 border-none ring-1 ring-brand-sage/30 outline-none" 
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              placeholder="Ex: 15 min"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-olive mb-2 uppercase tracking-widest">Ingredientes (um por linha)</label>
            <textarea 
              rows={5}
              className="w-full p-4 rounded-2xl bg-brand-sand/10 border-none ring-1 ring-brand-sage/30 outline-none" 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="1 chávena de aveia&#10;2 ovos&#10;Mel a gosto"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-olive mb-2 uppercase tracking-widest">Modo de Preparação</label>
            <textarea 
              rows={6}
              className="w-full p-4 rounded-2xl bg-brand-sand/10 border-none ring-1 ring-brand-sage/30 outline-none" 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-brand-olive text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-brand-terracotta transition-all disabled:opacity-50"
          >
            {loading ? 'A guardar...' : 'Publicar Receita'}
          </button>
        </form>
      </div>
    </section>
  );
}