import { create } from "zustand";
import { RoleSlice, type RoleState } from "./role-slice";
import { UserSlice, type UserState } from "./userSlice";
import { DocumentSlice, type DocumentState } from "./documentSlice";

type StoreState = {
  loading: boolean;
  setLoading: (state: boolean) => void;
};
type AppStore = RoleState & UserState & DocumentState & StoreState;

export const useStore = create<AppStore>()((set, get, api) => ({
  ...RoleSlice(set, get, api),
  ...UserSlice(set, get, api),
  ...DocumentSlice(set, get, api),
  loading: false,
  setLoading(state) {
    set(() => ({
      loading: state,
    }));
  },
}));
