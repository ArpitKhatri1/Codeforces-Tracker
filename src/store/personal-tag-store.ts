import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type PersonalTag = {
  id: number;
  name: string;
  userId: number;
};

type PersonalTagStoreType = {
  tags: PersonalTag[];
  setPersonalTag: (tag: PersonalTag[]) => void;
};

export const usePersonalTagStore = create<PersonalTagStoreType>()(
  devtools(
    persist(
      (set) => ({
        tags: [],
        setPersonalTag: (tag) =>
          set({
            tags: [...tag],
          }),
      }),
      { name: "personal-tags-storage" }
    )
  )
);
