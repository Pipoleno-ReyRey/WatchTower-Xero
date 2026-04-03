/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { unLockDocument } from "../services/document-service";

export const useUnlockDocument = () => {
  const [keyInput, setKeyInput] = useState("");

  const [keyError, setKeyError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [docData, setDocData] = useState<string | null>(null);

  const handleUnlock = async (id: number) => {
    try {
      if (keyInput.trim() === "") {
        setKeyError("Por favor, ingrese la clave");
        return;
      }
      setIsLoading(true);
      const response = await unLockDocument(id, keyInput);

      if (response.content == null) {
        setKeyError("Clave incorrecta");
        setIsLoading(false);

        return;
      }
      setDocData(response.content);
      setKeyError("");
    } catch (error) {
      setKeyError("Clave incorrecta");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    keyInput,
    setKeyInput,

    keyError,
    isLoading,
    handleUnlock,
    docData,
  };
};
