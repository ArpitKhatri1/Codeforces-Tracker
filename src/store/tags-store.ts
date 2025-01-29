"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";

type TagStoreType = {
  tags: string[];
  addTag: (tag: string[]) => void;
};

export const useTagStore = create<TagStoreType>()(
  devtools(
    persist(
      (set) => ({
        tags: [],
        addTag: (newTag: string[]) => set({ tags: [...newTag] }),
      }),
      {
        name: "tags-stored",
      }
    )
  )
);
