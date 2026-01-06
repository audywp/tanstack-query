import { useMutation } from "@tanstack/react-query";
import type { LoginPayload, LoginResponse } from "./types";
import { AxiosError } from "axios";
import { loginUser } from "./api";
import { toast } from "sonner";

interface ApiError {
  message?: string;
}

export function useLogin() {
  return useMutation<LoginResponse, AxiosError<ApiError>, LoginPayload>({
    mutationFn: (payload) => loginUser(payload),

    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      toast.success("Login Berhasil");
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ?? error.message ?? "Login Gagal";

      toast.error(message);
    },
  });
}
