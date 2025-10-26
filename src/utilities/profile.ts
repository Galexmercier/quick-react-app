import { useUserState, useData } from './firebase';

export const useProfile = () => {
  const [user] = useUserState();
  const [isAdmin, isLoading, error] =  useData(`/admins/${user?.uid || 'guest'}`);
  return [user, isAdmin, isLoading, error];
};