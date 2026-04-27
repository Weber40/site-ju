import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import RecipeGrid from './components/RecipeGrid';
import Services from './pages/Services';

// Componente de Layout para manter a Navbar fixa em todas as páginas
function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Hero />
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
        element: <div className="py-20 text-center font-serif text-2xl">Página de Contactos em Construção 🚧</div>,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}