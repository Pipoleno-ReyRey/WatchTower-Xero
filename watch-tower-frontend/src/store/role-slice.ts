import type { Role } from "../schemas/role";
import type { StateCreator } from "zustand";
import { getAllRoles } from "../services/roles-services";

export interface RoleState {
  roles: Role[];
  getRoles: () => Promise<void>;
}

export const RoleSlice: StateCreator<RoleState> = (set) => ({
  roles: [],
  getRoles: async () => {
    try {
      const res = await getAllRoles();

      set(() => ({
        roles: [...res],
      }));
    } catch (error) {
      console.log(error);
    }
  },
});
