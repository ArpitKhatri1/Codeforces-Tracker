"use client"
import { useDateStore } from "@/store/date-store";
import { userProblemListResult } from "@/types";
import { getProblemDate } from "@/utils/getProblemDate";
import { parse } from "date-fns";
import React from "react";
import { userProblemList } from "@/types";

export const useFitlerByDate = (tagFilteredResponse: userProblemList) => {

    const currDate = useDateStore((store) => store.currDate);

    const isDateInRange = (itemDate: Date, startDate: Date, endDate: Date) => {
        const item = { year: itemDate.getFullYear(), month: itemDate.getMonth(), day: itemDate.getDate() };
        const start = { year: startDate.getFullYear(), month: startDate.getMonth(), day: startDate.getDate() };
        const end = { year: endDate.getFullYear(), month: endDate.getMonth(), day: endDate.getDate() };

        return (
            (item.year > start.year || (item.year === start.year && item.month > start.month) || (item.year === start.year && item.month === start.month && item.day >= start.day)) &&
            (item.year < end.year || (item.year === end.year && item.month < end.month) || (item.year === end.year && item.month === end.month && item.day <= end.day))
        );
    };

    // Filter problems by date range
    const dateFilteredResponse = React.useMemo(() => {
        if (!currDate?.from || !tagFilteredResponse?.result) {
            return tagFilteredResponse;
        }

        const startDateUTC = new Date(currDate.from as Date);
        const endDateUTC = currDate.to ? new Date(currDate.to) : startDateUTC;

        const filteredResults: userProblemListResult[] = tagFilteredResponse.result.filter((ele) => {
            const elementDate = getProblemDate(ele.creationTimeSeconds);

            const itemDateUTC = parse(
                `${elementDate.day}/${elementDate.month}/${elementDate.year}`,
                "dd/MM/yyyy",
                new Date()
            );

            return isDateInRange(itemDateUTC, startDateUTC, endDateUTC);
        });

        return { ...tagFilteredResponse, result: filteredResults };
    }, [currDate, tagFilteredResponse]);
}

