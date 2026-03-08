import { useNavigate } from "react-router-dom";
import type { ILogin } from "../schemas/auth";
import { login } from "../services/auth-services";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const useAuth = () => {
  const navigation = useNavigate();
  const handleLogin = async (data: ILogin) => {
    try {
      const res = await login(data);
      localStorage.setItem("token", JSON.stringify(res.token));
      navigation("/dashboard");
    } catch (error) {
      toast.error("Error de credenciales");
      Swal.fire("Error", "Error de credenciales", "error");
      console.log(error);
    }
  };
  return { handleLogin };
};
