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
import { Link, useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { formatDate } from "../../utils/formatDate";
import { useUnlockDocument } from "../../hooks/useUnlockDocument";

export const DocumentDetailPage = () => {
  const { id } = useParams();
  const { keyError, keyInput, setKeyInput, handleUnlock, docData } =
    useUnlockDocument();

  const { documentQuery } = useDocument();

  const doc = documentQuery.data?.find((d) => d.id === Number(id));

  if (!doc) return <p>Documento no encontrado</p>;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between py-4">
        <div className="flex flex-col gap-3">
          <Link to={".."}>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Volver a documentos
            </button>
          </Link>

          <div>
            <h2 className="text-2xl font-bold">{doc.title}</h2>
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
        {doc.content ||
          (docData && (
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={16} />
                Contenido del documento
              </CardTitle>
            </CardHeader>
          ))}

        <CardContent>
          {doc.hasPass && !docData ? (
            <div className="flex items-center flex-col gap-4">
              <div className="flex flex-col items-center gap-3">
                <Lock size={30} />
                <p className="text-sm text-muted-foreground">
                  Este documento está protegido con clave
                </p>
              </div>

              <div className="space-y-2">
                <Label>Clave</Label>

                <Input
                  type="password"
                  placeholder="Ingrese la clave"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                />

                {keyError && (
                  <p className="text-sm text-destructive">{keyError}</p>
                )}

                <Button className="w-full" onClick={() => handleUnlock(doc.id)}>
                  <Unlock />
                  Desbloquear
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">
              {doc.content ?? "Sin contenido"}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
