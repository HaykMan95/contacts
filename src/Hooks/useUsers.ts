import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IUser } from '../Types/user.ts';

const fetchUsers = async () => {
  const { data } = await axios.get('http://localhost:4000/users');

  return data;
};

export const useUsers = () => {
  return useQuery<IUser[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
