import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('E-mail ou password incorretos.');
      setLoading(false);
    } else {
      // Login com sucesso! Redireciona para o painel de admin
      navigate('/admin');
    }
  };

  return (
    <section className="min-h-screen bg-brand-sand/30 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-sm border border-brand-sage/20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-brand-olive">Área Reservada</h2>
          <p className="text-zinc-500 mt-2">Bem-vinda de volta, Ju!</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-brand-olive mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-2xl bg-brand-sand/10 border-none ring-1 ring-brand-sage/30 focus:ring-2 focus:ring-brand-terracotta outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-olive mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-2xl bg-brand-sand/10 border-none ring-1 ring-brand-sage/30 focus:ring-2 focus:ring-brand-terracotta outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-olive text-white font-bold py-4 rounded-2xl hover:bg-brand-terracotta transition-all disabled:opacity-50"
          >
            {loading ? 'A entrar...' : 'Entrar no Painel'}
          </button>
        </form>
      </div>
    </section>
  );
}