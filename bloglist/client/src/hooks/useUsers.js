import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userService from '../services/persistentUser'

export const useUsers = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllUsers,
    refetchOnWindowFocus: false
  })

  return {
    users: result.data,
    isPendingUser: result.isPending
  }
}