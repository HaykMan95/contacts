import { useCreateUser } from '../../Hooks/useCreateUser.ts';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ROUTES } from '../../Routes';
import { useForm } from '@tanstack/react-form';
import { useUsers } from '../../Hooks/useUsers.ts';
import { useMemo } from 'react';
import { IUser } from '../../Types/user.ts';
import { useUpdateUser } from '../../Hooks/useUpdateUser.ts';
import { formSchema } from './validationSchema.ts';

type IContactAddEditProps = {
  isNew: boolean;
};

const defaultFormValues = {
  name: 'User',
  username: 'UserName',
  photo:
    'https://plus.unsplash.com/premium_photo-1692241091702-bc574bf6b720?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  about: 'about',
};

interface FormProp {
  username: string;
  name: string;
  photo: string;
  about: string;
}

const ContactAddEdit = ({ isNew }: IContactAddEditProps) => {
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const navigate = useNavigate();
  const { userId } = useParams({ strict: false });
  const { data: users, isLoading } = useUsers();
  const currentUser = useMemo<IUser | null>(() => {
    if (users && users.length === 0) return null;
    return users?.find((user) => user.id == userId) || null;
  }, [users, userId]);

  const form = useForm<FormProp>({
    defaultValues: currentUser || defaultFormValues,
    onSubmit: async ({ value }) => {
      if (value?.name && value?.username && value?.photo && value?.about) {
        if (isNew) {
          const newUserId = String(new Date().getTime());
          createUserMutation.mutate(
            { ...value, id: newUserId },
            {
              onSuccess: () => {
                navigate({ to: ROUTES.Contact.replace(newUserId) });
              },
              onError: (error) => {
                console.error('Error:', error);
              },
            }
          );
        } else if (currentUser) {
          updateUserMutation.mutate(
            { ...value, id: currentUser.id },
            {
              onSuccess: () => {
                navigate({ to: ROUTES.Contact.replace(currentUser.id) });
              },
              onError: (error) => {
                console.error('Error:', error);
              },
            }
          );
        }
      }
    },
    validators: {
      onChange: formSchema,
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Add New Contact</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field
            name="name"
            children={(field) => {
              return (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {field.state.meta.errors ? (
                    <em role="alert">{field.state.meta.errors.join(', ')}</em>
                  ) : null}
                </>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="username"
            children={(field) => {
              return (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {field.state.meta.errors ? (
                    <em role="alert">{field.state.meta.errors.join(', ')}</em>
                  ) : null}
                </>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="about"
            children={(field) => {
              return (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    About
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {field.state.meta.errors ? (
                    <em role="alert">{field.state.meta.errors.join(', ')}</em>
                  ) : null}
                </>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="photo"
            children={(field) => {
              return (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Photo URL
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  />
                  {field.state.meta.errors ? (
                    <em role="alert">{field.state.meta.errors.join(', ')}</em>
                  ) : null}
                </>
              );
            }}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
        >
          {isNew ? 'Add Contact' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default ContactAddEdit;
