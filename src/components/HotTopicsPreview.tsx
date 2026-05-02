import { Link } from 'react-router-dom';
import{ useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Post } from '../types';
import { div, span } from 'framer-motion/m';

export default function HotTopicsPreview() {

  const [latestTopic, setLatestTopic] = useState<any>(null);


useEffect(() => {
  async function fetchLatestTopic() {
    const { data } = await supabase
      .from('hot_topics')
      .select('id, title, content, created_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) setLatestTopic(data);
  }
  
  fetchLatestTopic();
}, []);

  return (
    <section className="py-16 bg-brand-sand/20">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-brand-olive">Hot Topics</h2>
          <Link to="/hot-topics" className="text-brand-terracotta font-bold hover:scale-105 transition-transform">
            Ver todos os posts
          </Link>
        </div>
        
        <div className="bg-brand-sage/10 p-4 rounded-3xl flex items-center justify-between gap-4 border border-brand-sage/20">
          <div className="flex items-center gap-4 flex-1 overflow-hidden">
            <span className="text-2xl">🔥</span>
            {latestTopic ? (
             <div className="text-left truncate">
              <span className="font-bold text-brand-olive block truncate text-3xl">
          {latestTopic.title}
        </span>
        <span className="text-xl text-zinc-500 italic">
          {latestTopic.content.substring(0, 50)}...
        </span>
      </div>
    ) : (
      <span className="text-zinc-400 italic">A preparar novidades...</span>
    )}
  </div>
  
  {latestTopic && (
    <Link 
      to={`/hot-topic/${latestTopic.id}`}
      className="bg-brand-olive text-white px-6 py-2 rounded-full font-bold hover:bg-brand-terracotta transition-all whitespace-nowrap"
    >
      Ler Agora
    </Link>
  )}
        </div>
      </div>
    </section>
  );
}
