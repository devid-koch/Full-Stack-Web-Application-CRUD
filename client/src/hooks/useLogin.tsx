import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../api/api";
import { AxiosError } from "axios";

const useLogin = () => {
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            if (data?.token) {
                localStorage.setItem("token", data.token);
                toast.success("Login successful!");
            } else {
                toast.error(data?.message ?? "Login failed, please try again.");
            }
        },
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response.data?.message || "Something went wrong during login.");
            }
        },
    });
};

export default useLogin;
