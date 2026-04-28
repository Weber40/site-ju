import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
//import { Link } from 'react-router-dom';
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

// Este componente envolve todas as páginas e fornece a Navbar
function Layout() {
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
      { path: "/admin", element: <div className="py-20 text-center">Painel de Administração 🚧</div> },
      { path: "/admin", element: <Admin /> },
{ path: "/admin/novo-topico", element: <CreateTopic /> },
    ],
  },
]);


export default function App() {
  return <RouterProvider router={router} />;
}