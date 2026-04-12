/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import { unLockDocument } from "../services/document-service";
import { useStore } from "../store/appStore";

export const useUnlockDocument = (documentId: number) => {
  const unlockedDocuments = useStore((state) => state.unlockedDocuments);
  const setUnlockedDocument = useStore((state) => state.setUnlockedDocument);

  const [keyInput, setKeyInput] = useState("");
  const [keyError, setKeyError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const docData = unlockedDocuments[documentId] ?? null;

  const handleUnlock = async () => {
    try {
      if (keyInput.trim() === "") {
        setKeyError("Por favor, ingrese la clave");
        return;
      }

      setIsLoading(true);

      const response = await unLockDocument(documentId, keyInput);

      if (response.content == null) {
        setKeyError("Clave incorrecta");
        return;
      }

      // 🔥 guardar por id
      setUnlockedDocument(documentId, response.content);

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
