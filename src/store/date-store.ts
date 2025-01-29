"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { DateRange } from "react-day-picker";
type dateStoreType = {
  currDate: DateRange | undefined;
  updateDate: (date: DateRange | undefined) => void;
};

export const useDateStore = create<dateStoreType>()(
  devtools(
    persist(
      (set) => ({
        currDate: { from: undefined, to: undefined },
        updateDate: (newDate: DateRange | undefined) =>
          set({ currDate: newDate }),
      }),
      {
        name: "date-stored",
      }
    )
  )
);
