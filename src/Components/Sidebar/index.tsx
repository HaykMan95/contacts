import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';

import './styles.css';
import { useUsers } from '../../Hooks/useUsers.ts';
import { IUser } from '../../Types/user.ts';
import { ROUTES } from '../../Routes';

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users, isLoading } = useUsers();

  const filteredUsers = useMemo<IUser[]>(() => {
    if (!users) return [];
    return users.filter((user: IUser) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  console.log('users', users);
  console.log('filteredUsers', filteredUsers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-64 p-4 bg-gray-800 text-white overflow-auto sidebar">
      <div className="mb-4 flex ">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          to={ROUTES.NewContact.path}
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
        >
          New
        </Link>
      </div>
      <div className="flex flex-col h-full max-h-[85vh] overflow-auto">
        <ul className="flex-1 overflow-y-auto">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="py-2 px-3 hover:bg-gray-700 rounded-md sidebar-item"
            >
              <Link to={ROUTES.Contact.replace(user.id)}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
