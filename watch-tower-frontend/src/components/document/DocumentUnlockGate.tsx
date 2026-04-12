import { Lock } from "lucide-react";
import { useUnlockDocument } from "../../hooks/useUnlockDocument";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface Props {
  documentId: number;
  isProtected: boolean;
  children: React.ReactNode;
}

export const DocumentUnlockGate = ({
  documentId,
  isProtected,
  children,
}: Props) => {
  const { keyError, keyInput, setKeyInput, handleUnlock, docData, isLoading } =
    useUnlockDocument(documentId);

  const isLocked = isProtected && !docData;

  if (isLocked) {
    return (
      <div className="flex items-center flex-col gap-4 w-full mt-10">
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

          {keyError && <p className="text-sm text-destructive">{keyError}</p>}

          <Button
            disabled={isLoading}
            className="w-full"
            onClick={() => handleUnlock()}
          >
            {isLoading ? "Desbloqueando..." : "Desbloquear"}
          </Button>
        </div>
      </div>
    );
  }

  return children;
};
