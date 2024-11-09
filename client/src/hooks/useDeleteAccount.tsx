import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteAccount } from "../api/api";
import { AxiosError } from "axios";

const useDeleteAccount = () => {
    return useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            localStorage.removeItem("token");
            toast.success("Account deleted successful!");
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response.data?.message || "Something went wrong during login.");
            }
        },
    });
};

export default useDeleteAccount;
