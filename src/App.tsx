import { RouterProvider } from '@tanstack/react-router';
import { router } from './Routes/routes.tsx';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
