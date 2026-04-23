import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShieldAlert } from "lucide-react";

export const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* ICONO */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert size={40} />
          </div>
        </div>

        {/* TEXO */}
        <div>
          <h1 className="text-2xl font-bold">Acceso denegado</h1>
          <p className="text-muted-foreground mt-2">
            No tienes permisos para acceder a esta sección. Si crees que esto es
            un error, contacta al administrador.
          </p>
        </div>

        {/* BOTÓN */}
        <Link to="/documents">
          <Button className="w-full">Volver atras</Button>
        </Link>
      </div>
    </div>
  );
};
