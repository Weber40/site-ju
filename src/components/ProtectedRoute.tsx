import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se há um utilizador logado no Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">A verificar permissões...</div>;
  }

  if (!authenticated) {
    // Se não estiver logado, manda para o login
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, mostra a página (children)
  return <>{children}</>;
}