import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { useUsers } from '../../Hooks/useUsers.ts';
import { useMemo, useState } from 'react';
import { IUser } from '../../Types/user.ts';
import { useDeleteUser } from '../../Hooks/useDeleteUser.ts';
import { ROUTES } from '../../Routes';
import ConfirmationModal from '../../Components/ConfirmationModal';

const Contacts = () => {
  const { userId } = useParams({ strict: false });
  const { data: users, isLoading } = useUsers();
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] =
    useState<boolean>(false);
  const deleteUserMutation = useDeleteUser();
  const navigate = useNavigate();

  const currentUser = useMemo<IUser | null>(() => {
    if (users && users.length === 0) return null;
    return users?.find((user) => user.id == userId) || null;
  }, [users, userId]);

  const deleteUser = () => {
    setConfirmationModalIsOpen(true);
  };

  const onDleteUser = () => {
    setConfirmationModalIsOpen(false);

    if (currentUser) {
      deleteUserMutation.mutate(
        { ...currentUser },
        {
          onSuccess: () => {
            navigate({ to: ROUTES.Home.path });
          },
          onError: (error) => {
            console.error('Error:', error);
          },
        }
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="h-full p-6 text-white">
      <ConfirmationModal
        isOpen={confirmationModalIsOpen}
        onCancel={() => setConfirmationModalIsOpen(false)}
        onConfirm={onDleteUser}
        message={'Are you sure you want to delete the contact?'}
      />
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={currentUser.photo}
          alt={currentUser.name}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-semibold text-gray-400">
            {currentUser.name}
          </h1>
          <p className="text-gray-400">@{currentUser.username}</p>
          <p className="text-gray-400">@{currentUser.about}</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <Link
          to={ROUTES.EditContact.replace(userId)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Edit
        </Link>
        <button
          onClick={deleteUser}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Contacts;
