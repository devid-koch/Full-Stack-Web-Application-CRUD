import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../api/api';
import { UserProfile } from '../utils/types';

const useGetUserProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    refetchOnWindowFocus: false,
  });
};

export default useGetUserProfile;
