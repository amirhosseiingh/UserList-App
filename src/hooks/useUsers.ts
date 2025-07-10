import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/lib/api'; 


export const useUsers = (page: number) => {
  return useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsers (page),
  })
};
