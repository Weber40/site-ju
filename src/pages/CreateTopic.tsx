import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function CreateTopic() {
  
    const [title, setTitle] = useState('');
    const [imageFiles, setImageFiles] = useState<FileList | null>(null); 
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => { 
        e.preventDefault();
        setLoading(true);

        //const [imageFiles, setImageFiles] = useState<FileList | null>(null);

        const uploadedUrls: string[] = [];

        if (imageFiles) {
          for (let i = 0; i < imageFiles.length; i++) {
            const file = imageFiles[i];
            const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${file.name.split('.').pop()}`;
      
            const { data } = await supabase.storage
              .from('hot-topics-image_url') // Nome do teu bucket
              .upload(fileName, file);

          if (data) {
            const { data: urlData } = supabase.storage
              .from('hot-topics-image_url')
            .getPublicUrl(fileName);
          uploadedUrls.push(urlData.publicUrl);
          }
        }
      }

        const { error } = await supabase
            .from('hot_topics')
            .insert({ 
              title,
              content,
              image_url: uploadedUrls,
              excerpt: content.substring(0, 150) + '...' });

        if (error) {
            alert('Erro ao criar tópico: ' + error.message);
            setLoading(false);
        } else {
            // Tópico criado com sucesso! Redireciona para a lista de hot topics
            alert('Tópico criado com sucesso! 🔥');
            navigate('/hot-topics');
        }
        setLoading(false);
    };

return (
    <section className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/admin')} className="text-brand-sage mb-8 block">← Voltar ao painel</button>
        <h2 className="text-3xl font-serif font-bold text-brand-olive mb-10">Novo Hot Topic</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-brand-olive mb-2 uppercase tracking-widest">Título do Post</label>
            <input 
              type="text"
              className="w-full p-4 rounded-2xl bg-brand-sand/10 border-none ring-1 ring-brand-sage/30 outline-none mb-6"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-olive mb-2 uppercase tracking-widest">Fotografias</label>
            <input 
              type="file" multiple accept="image_url/*"
              onChange={(e) => setImageFiles(e.target.files)}
               className="w-full p-4 rounded-2xl bg-brand-sand/10 border-none ring-1 ring-brand-sage/30 outline-none mb-6"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-olive mb-2 uppercase tracking-widest">Conteúdo</label>
            <textarea 
              rows={8}
              className="w-full p-4 rounded-2xl bg-brand-sand/10 border-none ring-1 ring-brand-sage/30 outline-none" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-brand-terracotta text-white font-bold py-4 rounded-2xl shadow-lg hover:brightness-110 transition-all"
          >
            {loading ? 'A publicar...' : 'Publicar Agora'}
          </button>
        </form>
      </div>
    </section>
  );
}