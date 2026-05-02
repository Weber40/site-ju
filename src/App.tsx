import { createBrowserRouter, RouterProvider, Outlet, useLocation, Link } from 'react-router-dom';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import RecipeGrid from './components/RecipeGrid';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Footer from './components/Footer'; 
import Bio from './pages/Bio';
import HotTopics from './pages/HotTopics';
import HotTopicsPreview from './components/HotTopicsPreview';
import Login from './pages/Login';
import Admin from './pages/Admin';
import CreateTopic from './pages/CreateTopic';
import CreateRecipe from './pages/CreateRecipe';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import RecipeDetail from './pages/RecipeDetail';
//import { Link, useLocation } from 'react-router-dom';

// Este componente envolve todas as páginas e fornece a Navbar
function Layout() {

  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
  // 1. Verificar logo se há sessão ao carregar a página
  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
  };
  checkUser();

  // 2. Ouvir mudanças (login/logout) em tempo real
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
    console.log("Estado de login mudou:", session?.user ? "Logado" : "Deslogado");
  });

  return () => subscription.unsubscribe();
}, []);

  return (
    <div className="min-h-screen bg-brand-sand">
      <Navbar />
      <main className="font-serif bg-brand-sand/40 min-h-screen"> 
        <Outlet />
        <section className="bg-brand-sage/20 py-20">
        <h1 className="text-brand-olive font-serif">...</h1>
      </section>
      </main>
      <Footer /> {/* Adiciona aqui */}
    

  {user && location.pathname !== '/admin' && (
  <Link 
    to="/admin" 
    className="fixed bottom-8 right-8 bg-brand-olive text-white p-4 rounded-full shadow-2xl hover:bg-brand-terracotta transition-all z-50 flex items-center justify-center group"
  >
    <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:mr-2 transition-all duration-300 font-sans font-bold">
      Painel Admin
    </span>
    <span className="text-xl">⚙️</span>
  </Link>
  )}
  </div>
  );
}


// Configuração das Rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // O Layout decide onde a Navbar aparece
    children: [
      { 
        path: "/admin", 
        element: <Admin /> },
      {
        
        path: "/",
        element: (
          <>
            <Hero />
            <HotTopicsPreview />
            <RecipeGrid />
          </>
        ),
      },
      {
        path: "/receitas",
        element: <RecipeGrid />,
      },
      {
        path: "/servicos",
        element: <Services />,
      },
      {
        path: "/contactos",
        element: <Contact />,
      },
      { path: "/biografia",
         element: <Bio /> 
      },
      { path: "/hot-topics",
         element: <HotTopics /> 
      },
      {
        path: "/login",
        element: <Login />
      },
      { 
        path: "/admin/novo-topico",
         element: <CreateTopic /> },
      { 
        path: "/admin/nova-receita",
         element: <CreateRecipe /> },
      {
        path: "/receita/:id", // O ":" indica que o ID é variável
        element: <RecipeDetail />,
      },   
    ],
  },
]);


export default function App() {
  return <RouterProvider router={router} />;
}