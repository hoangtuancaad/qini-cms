import { URL } from "@/config/urls";
import { fetchData } from "@/utils/fetch";
import { create } from "zustand";
import { StaffProps } from "@/types/staffProps";

type StaffState = {
    isStaffLoading?: boolean;
    staff: StaffProps[];
    staffById: StaffProps;
};

export type StaffData = {
    name: string;
};

type StaffAction = {
    // Api actions
    getStaff: () => void;
    getStaffById: (id: string) => void;
    addStaff: ({ staffData }: { staffData: StaffData }) => Promise<any>;
    editStaff: ({ id, staffData }: { id: string; staffData: StaffData }) => Promise<any>;
    deleteStaff: (id: string) => Promise<void>;
};

const initialState: StaffState = {
    isStaffLoading: false,
    staff: [],
    staffById: {} as StaffProps,
};

export const useStaffStore = create<StaffState & StaffAction>()(set => ({
    ...initialState,

    // Api Actions
    getStaff: async () => {
        return await fetchData({
            endpoint: URL.STAFF,
        }).then(res => {
            if (res?.code !== 200) {
                return set({
                    staff: res?.message,
                });
            }
            return set({ staff: res.data });
        });
    },

    getStaffById: async (id: string) => {
        set({
            isStaffLoading: true,
        });

        return await fetchData({
            endpoint: `${URL.STAFF}/${id}`,
        }).then(res => {
            if (res?.code !== 200) {
                return set({
                    staffById: res?.message,
                });
            }
            return set({
                isStaffLoading: false,
                staffById: res.data,
            });
        });
    },

    addStaff: async ({ staffData }: { staffData: StaffData }) => {
        return await fetchData({
            endpoint: URL.STAFF,
            options: {
                method: "POST",
                body: JSON.stringify({
                    ...staffData,
                }),
            },
        }).then(res => res);
    },

    editStaff: async ({ id, staffData }: { id: string; staffData: StaffData }) => {
        return await fetchData({
            endpoint: `${URL.STAFF}/${id}`,
            options: {
                method: "PUT",
                body: JSON.stringify({
                    ...staffData,
                }),
            },
        }).then(res => res);
    },

    deleteStaff: async (id: string) => {
        return await fetchData({
            endpoint: URL.STAFF,
            options: {
                method: "DELETE",
                body: JSON.stringify({ id }),
            },
        }).then(res => {
            if (res?.code !== 200) {
                return set({
                    staff: res?.message,
                });
            }

            return set({ staff: res.data });
        });
    },
}));
