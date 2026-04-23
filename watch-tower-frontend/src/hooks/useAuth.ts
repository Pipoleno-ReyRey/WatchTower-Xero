import { useNavigate } from "react-router-dom";
import type { ILogin } from "../schemas/auth";
import { login } from "../services/auth-services";
import { toast } from "react-toastify";
import { useState } from "react";

export const useAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigate();
  const handleLogin = async (data: ILogin) => {
    try {
      setLoading(true);
      const res = await login(data);
      console.log(res);
      localStorage.setItem("currentUser", JSON.stringify(res));
      setLoading(false);
      navigation("/documents");
      toast.success("Login exitoso");
    } catch (error) {
      toast.error("Error de credenciales");
      console.log(error);
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("currentUser");
    navigation("/login");
  };

  return { handleLogin, logOut, isLoading };
};
