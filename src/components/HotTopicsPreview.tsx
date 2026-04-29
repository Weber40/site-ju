import { Link } from 'react-router-dom';
import{ useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Post } from '../types';

export default function HotTopicsPreview() {
  const [latestPost, setLatestPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchLatestPost();
  }, []);

    async function fetchLatestPost() {
    const { data } = await supabase
      .from('posts') // Assuming your table is named 'posts'; adjust if it's 'hot_topics' or similar
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);
    if (data && data.length > 0) {
      setLatestPost(data[0] as Post);
    }
  }

  return (
    <section className="py-16 bg-brand-sand/20">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-brand-olive">Hot Topics</h2>
          <Link to="/hot-topics" className="text-brand-terracotta font-bold hover:scale-105 transition-transform">
            Ver todos os posts
          </Link>
        </div>
        
        <div className="bg-brand-sage/10 p-8 rounded-[40px] border border-brand-sage/20 flex flex-col md:flex-row gap-8 items-center">
          <div className="text-4xl">🔥</div>
          <div>
            {latestPost ? (
              <>
                <h3 className="text-xl font-bold text-brand-olive">Último Post: {latestPost.title}</h3>
                <p className="text-zinc-600 mt-2">{latestPost.description}</p>
              </>
            ) : (
              <p className="text-zinc-600">Carregando o último post...</p>
            )}
          </div>
          <Link to="/hot-topics" className="bg-brand-olive text-white px-6 py-3 rounded-full whitespace-nowrap">
            Ler Agora
          </Link>
        </div>
      </div>
    </section>
  );
}