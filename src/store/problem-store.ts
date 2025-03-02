import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type problemTagsType = {
  userId: number;
  problemId: number;
  tags: string[];
};

type ProblemTagStoreType = {
  problemTags: problemTagsType[];
  setProblemTag: (tag: problemTagsType[]) => void;
};

export const useproblemTagStore = create<ProblemTagStoreType>()(
  // takes a callback function with set parameter and return type of store with iniitialistation and a functions
  devtools(
    persist(
      (set) => ({
        problemTags: [],
        setProblemTag: (tag: problemTagsType[]) =>
          set({
            problemTags: [...tag],
          }),
      }),
      { name: "personal-tags-storage" }
    )
  )
);
