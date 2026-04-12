import type { StateCreator } from "zustand";
import type { IDocument } from "../schemas/document";

export interface DocumentState {
  document: IDocument | null;

  // 🔥 clave por id
  unlockedDocuments: Record<number, string>;

  setUnlockedDocument: (id: number, content: string) => void;
  clearUnlockedDocument: (id: number) => void;

  setDocument: (document: IDocument | null) => void;
}

export const DocumentSlice: StateCreator<DocumentState> = (set) => ({
  document: null,

  unlockedDocuments: {},

  setUnlockedDocument: (id, content) =>
    set((state) => ({
      unlockedDocuments: {
        ...state.unlockedDocuments,
        [id]: content,
      },
    })),

  clearUnlockedDocument: (id) =>
    set((state) => {
      const newDocs = { ...state.unlockedDocuments };
      delete newDocs[id];
      return { unlockedDocuments: newDocs };
    }),

  setDocument: (document) =>
    set(() => ({
      document,
    })),
});
