import {
  ArrowLeft,
  Lock,
  Unlock,
  FileText,
  Calendar,
  // HardDrive,
  User,
} from "lucide-react";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Link } from "react-router-dom";

export const DocumentDetailPage = () => {
  const [keyInput, setKeyInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [keyError, setKeyError] = useState("");

  // mock temporal
  const doc = {
    id: "1",
    name: "Informe Financiero Q4",
    type: "PDF",
    owner: "Carlos Mendoza",
    createdAt: "2026-01-15",
    updatedAt: "2026-02-20",
    size: "2.4 MB",
    hasKey: true,
    shared: true,
    sharedWith: ["Ana Torres", "Maria Garcia"],
    content:
      "Este informe contiene los resultados financieros del cuarto trimestre del ejercicio fiscal 2025.",
  };

  const handleUnlock = () => {
    if (keyInput === "1234") {
      setUnlocked(true);
      setKeyError("");
    } else {
      setKeyError("Clave incorrecta");
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between py-4">
        <div className="flex flex-col  gap-3">
          <Link to={".."}>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Volver a documentos
            </button>
          </Link>

          <div>
            <h2 className="text-2xl font-bold">{doc.name}</h2>

            {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{doc.type}</span>

              {doc.hasKey && (
                <span className="flex items-center gap-1">
                  <Lock size={14} />
                  Protegido
                </span>
              )}

              {doc.shared && (
                <span className="flex items-center gap-1">
                  <Users2 size={14} />
                  Compartido
                </span>
              )}
            </div> */}
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
              <p className="font-medium">{doc.createdAt}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="py-2">
          <CardContent className="flex items-center gap-3 p-4">
            <Calendar className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Actualizado</p>
              <p className="font-medium">{doc.updatedAt}</p>
            </div>
          </CardContent>
        </Card>
{/* 
        <Card className="py-2">
          <CardContent className="flex items-center gap-3 p-4">
            <HardDrive className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Tamaño</p>
              <p className="font-medium">{doc.size}</p>
            </div>
          </CardContent>
        </Card> */}
      </div>

      <Card>
        {unlocked && (
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={16} />
              Contenido del documento
            </CardTitle>
          </CardHeader>
        )}

        <CardContent>
          {doc.hasKey && !unlocked ? (
            <div className=" flex items-center flex-col gap-4 ">
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

                <Button className="w-full" onClick={handleUnlock}>
                  <Unlock />
                  Desbloquear
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{doc.content}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
