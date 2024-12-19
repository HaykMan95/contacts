import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUser } from '../Types/user.ts';
import axios from 'axios';

const updateUser = async (user: IUser) => {
  const { data } = await axios.put(
    `http://localhost:4000/users/${user.id}`,
    user
  );

  return data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
