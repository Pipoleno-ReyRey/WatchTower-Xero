import type { Role } from "../schemas/role";
import type { StateCreator } from "zustand";

export interface RoleState {
  openModalRole: boolean;
  setOpenModalRole: (state: boolean) => void;
  role: Role | null;
  setRole: (role: Role | null) => void;
}

export const RoleSlice: StateCreator<RoleState> = (set) => ({
  role: null,
  openModalRole: false,
  setOpenModalRole(state) {
    set(() => ({
      openModalRole: state,
      
    }));
  },
  setRole(role) {
    set(() => ({
      role: role,
    }));
  },
});
