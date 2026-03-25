/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";

export const useUnlockDocument = () => {
  const [keyInput, setKeyInput] = useState("");

  const [keyError, setKeyError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [docData, setDocData] = useState("");

  const handleUnlock = async (id: number) => {
    try {
      setIsLoading(true);

      setDocData("trajo data");
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
