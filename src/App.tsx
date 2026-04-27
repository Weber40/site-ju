import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import RecipeGrid from './components/RecipeGrid';
import Services from './pages/Services';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Hero />
        <RecipeGrid />
      </>
    ),
  },
  {
    path: "/receitas",
    element: (
      <>
        <Navbar />
        <RecipeGrid />
      </>
    ),
  },
  {
    path: "/servicos",
    element: (
      <>
        <Navbar />
        <Services />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;