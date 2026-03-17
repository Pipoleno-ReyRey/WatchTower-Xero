import type { StateCreator } from "zustand";
import type { IUser } from "../schemas/user";

export interface UserState {
  selectedUser?: IUser;
  isOpenModal: boolean;

  openCreate: () => void;
  openEdit: (user: IUser) => void;
  closeModal: () => void;
}

export const UserSlice: StateCreator<UserState> = (set) => ({
  selectedUser: undefined,
  isOpenModal: false,

  openCreate: () =>
    set({
      selectedUser: undefined,
      isOpenModal: true,
    }),

  openEdit: (user) =>
    set({
      selectedUser: user,
      isOpenModal: true,
    }),

  closeModal: () =>
    set({
      selectedUser: undefined,
      isOpenModal: false,
    }),
});
