import { create } from "zustand";

type tagStoreType = {
  tags: string[];
  addTags: (tag: string) => void;
};

const usetagStore = create<tagStoreType>((set) => ({
  tags: [],
  addTags: (newTag: string) =>
    set((state) => ({
      tags: [...state.tags, newTag],
    })),
}));
