"use client"
import { useEffect, useState } from 'react';
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useDateStore } from '@/store/date-store';

const DateFilter = () => {
    const [date, setDate] = useState<DateRange | undefined>();
    const updateDate = useDateStore((state) => state.updateDate);
    const currDate = useDateStore((state) => state.currDate);

    // Update local date when currDate changes (store change)
    useEffect(() => {
        setDate(currDate);
    }, []);

    // Update store when local date changes
    useEffect(() => {
        if (date && (date.from !== currDate?.from || date.to !== currDate?.to)) {
            updateDate(date);  // only update the store if date has changed
        }
    }, [date, currDate, updateDate]);

    const handleRemoveFilter = () => {
        updateDate({ from: undefined, to: undefined })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Filter Date</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Filter Date</DialogTitle>
                    <DialogDescription>
                        Filter your solved problems based on the date you solved them.
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-full text-left font-normal mx-auto",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>

                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate} // already handling date changing logic
                            numberOfMonths={2}
                        />
                    </Popover>
                </div>

                <DialogFooter>
                    <DialogClose className='flex gap-2'>
                        <div className="p-3 rounded-lg py-2 bg-black text-white">Save changes</div>
                        <div className="p-3 rounded-lg py-2 bg-black text-white" onClick={handleRemoveFilter}>Remove Filter</div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DateFilter;

