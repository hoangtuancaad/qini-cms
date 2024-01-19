import { create } from "zustand";

interface TableState {
    checked: readonly number[];
    isAllChecked: boolean;
    pageSize: number;

    // Filter value
    filterValue: string;
    storeFilterValue: (filterValue: string) => void;

    checkedStore: (value: readonly number[]) => void;
    allCheckedStore: (status: boolean) => void;
    pageSizeStore: (value: number) => void;
    clearTableStore: () => void;
}

export const useTableStore = create<TableState>()(set => ({
    checked: [],
    pageSize: 5,
    isAllChecked: false,

    filterValue: "",
    storeFilterValue: filterValue => set(() => ({ filterValue })),

    checkedStore: value => set(() => ({ checked: value })),
    allCheckedStore: status => set(() => ({ isAllChecked: status })),
    pageSizeStore: value => set(() => ({ pageSize: value })),

    clearTableStore: () => set(() => ({ checked: [], isAllChecked: false })),
}));
