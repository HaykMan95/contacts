import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUser } from '../Types/user.ts';
import axios from 'axios';

const deleteUser = async (user: IUser) => {
  const { data } = await axios.delete(`http://localhost:4000/users/${user.id}`);

  return data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
