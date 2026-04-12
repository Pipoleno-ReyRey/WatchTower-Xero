import {
  ArrowLeft,
  Lock,
  Unlock,
  FileText,
  Calendar,
  User,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { formatDate } from "../../utils/formatDate";
import { useUnlockDocument } from "../../hooks/useUnlockDocument";
import { getCurrentUser } from "../../lib/axios";
import { useStore } from "../../store/appStore";

export const DocumentDetailPage = () => {
  const { id } = useParams();
  const setDocument = useStore((state) => state.setDocument);

  const { documentQuery } = useDocument();
  const { keyError, keyInput, setKeyInput, handleUnlock, docData, isLoading } =
    useUnlockDocument(id ? Number(id) : 0);

  const doc = documentQuery.data?.find((d) => d.id === Number(id));

  const user = getCurrentUser();
  const navigate = useNavigate();

  if (!doc) return <p>Documento no encontrado</p>;

  return (
    <div className="w-full space-y-3">
      <div className=" w-full flex items-center justify-between py-4">
        <div className="w-full flex flex-col gap-3">
          <Link to={".."}>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Volver a documentos
            </button>
          </Link>

          <div className="w-full flex flex-col gap-2  lg:flex-row lg:items-center justify-between ">
            <h2 className="text-2xl font-bold">{doc.title}</h2>

            {user?.userName === doc.owner && (
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  onClick={() => {
                    setDocument(doc);
                    navigate(`../edit/${doc.id}`);
                  }}
                >
                  Editar
                </Button>
                <Button variant="destructive">Eliminar</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <Card className="py-2">
          <CardContent className="flex items-center gap-3 p-4">
            <User className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Propietario</p>
              <p className="font-medium">{doc.owner}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="py-2">
          <CardContent className="flex items-center gap-3 p-4">
            <Calendar className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Creado</p>
              <p className="font-medium">{formatDate(doc.createdAt, "long")}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="py-2">
          <CardContent className="flex items-center gap-3 p-4">
            <Calendar className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Actualizado</p>
              <p className="font-medium">{formatDate(doc.updatedAt, "long")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        {/* HEADER */}
        {(doc.content || docData) && (
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={16} />
              Contenido del documento
            </CardTitle>
          </CardHeader>
        )}

        {/* CONTENT */}
        <CardContent>
          {doc.hasPass && !docData ? (
            // 🔒 Documento con clave y aún NO desbloqueado
            <div className="flex items-center flex-col gap-4 w-full">
              <div className="flex flex-col items-center gap-3">
                <Lock size={30} />
                <p className="text-sm text-muted-foreground">
                  Este documento está protegido con clave
                </p>
              </div>

              <div className="space-y-2 w-sm">
                <Label>Clave</Label>

                <Input
                  type="password"
                  placeholder="Ingrese la clave"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                />

                {keyError && (
                  <div className="w-full">
                    <p className="text-sm text-destructive">{keyError}</p>
                  </div>
                )}

                <Button
                  disabled={isLoading}
                  className="w-full"
                  onClick={() => handleUnlock()}
                >
                  <Unlock />
                  {isLoading ? "Desbloqueando..." : "Desbloquear"}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">
              {docData ?? doc.content ?? "Sin contenido"}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
