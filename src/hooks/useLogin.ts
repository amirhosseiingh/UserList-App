import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/lib/api'; 

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};