import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateProfile } from '../api/api';

const useUpdateProfile = () => {
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            if (data?.message) {
                toast.success(data.message);
            } else {
                toast.error('Profile update failed. Please try again.');
            }
        },
        onError: (error: unknown) => {
            const err = error as Error;
            toast.error(err?.message || 'Something went wrong during profile update.');
        },
    });
};

export default useUpdateProfile;
