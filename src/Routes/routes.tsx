import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router';
import Sidebar from '../Components/Sidebar';
import Contact from '../Pages/Contact';
import { ROUTES } from './index.ts';
import ContactAddEdit from '../Pages/ContactAddEdit';

const rootRoute = createRootRoute({
  component: () => (
    <div className="flex flex-row justify-between items-center">
      <div>
        <Sidebar />
      </div>
      <div className={'w-1/2'}>
        <Outlet />
      </div>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.Home.path,
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    );
  },
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.Contact.path,
  component: Contact,
});

const newContactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.NewContact.path,
  component: function Index() {
    return <ContactAddEdit isNew={true} />;
  },
});

const editContactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.EditContact.path,
  component: function Index() {
    return <ContactAddEdit isNew={false} />;
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  contactRoute,
  newContactRoute,
  editContactRoute,
]);

const router = createRouter({ routeTree });

export { router };
