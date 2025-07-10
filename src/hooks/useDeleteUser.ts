import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser as apiDeleteUser, User, GetUsersResponse } from '@/lib/api';
import toast from 'react-hot-toast';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiDeleteUser,
    onSuccess: (data, userId) => {
      toast.success('User  deleted successfully');
      queryClient.setQueriesData<GetUsersResponse>(
        { queryKey: ['users'] },
        oldData => {
          if (!oldData) {
            return undefined;
          }
          const newData = oldData.data.filter(
            (user: User) => user.id !== userId
          );
          return {
            ...oldData,
            data: newData,
          };
        }
      );
    },
    onError: error => {
      toast.error(`${error.message} `)
    },
  });
};
