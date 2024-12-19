export const ROUTES = {
  Home: { path: '/' },
  Contact: {
    path: '/contact/$userId',
    replace: (userId: string) =>
      replacePath(ROUTES.Contact.path, '$userId', userId),
  },
  NewContact: { path: '/contact/new' },
  EditContact: {
    path: '/contact/$userId/edit',
    replace: (userId: string) =>
      replacePath(ROUTES.EditContact.path, '$userId', userId),
  },
};

export const replacePath = (path: string, key: string, userId: string) => {
  return path.replace(key, userId);
};
