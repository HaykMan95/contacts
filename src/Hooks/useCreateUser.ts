import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IUser } from '../Types/user.ts';

const createUser = async (newUser: IUser) => {
  const { data } = await axios.post('http://localhost:4000/users', newUser);
  return data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
