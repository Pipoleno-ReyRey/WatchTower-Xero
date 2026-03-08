import { create } from "zustand";
import { RoleSlice, type RoleState } from "./role-slice";

type AppStore = RoleState;

export const useStore = create<AppStore>()((set, get, api) => ({
  ...RoleSlice(set, get, api),
}));
