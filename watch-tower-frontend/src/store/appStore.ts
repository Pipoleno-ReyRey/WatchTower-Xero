import { create } from "zustand";
import { RoleSlice, type RoleState } from "./role-slice";
import { UserSlice, type UserState } from "./userSlice";

type AppStore = RoleState & UserState;

export const useStore = create<AppStore>()((set, get, api) => ({
  ...RoleSlice(set, get, api),
  ...UserSlice(set, get, api),
}));
