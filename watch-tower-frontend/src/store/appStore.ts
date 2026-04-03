import { create } from "zustand";
import { RoleSlice, type RoleState } from "./role-slice";
import { UserSlice, type UserState } from "./userSlice";

type StoreState = {
  loading: boolean;
  setLoading: (state: boolean) => void;
};
type AppStore = RoleState & UserState & StoreState;

export const useStore = create<AppStore>()((set, get, api) => ({
  ...RoleSlice(set, get, api),
  ...UserSlice(set, get, api),
  loading: false,
  setLoading(state) {
    set(() => ({
      loading: state,
    }));
  },
}));
