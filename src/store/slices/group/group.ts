import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface GroupInfo {
    id: number
    name: string,
    logo: string,
    practiceTime: string,
    audition: boolean,
    membershipFee: number,
    monthlyFee: number,
    region: string,
    regionDetail: string,
    homepage: string,
    detailIntro: string,
    recruit: boolean
}

export interface GroupRecruit {
    id: number,
    recruit: boolean,
    recruitInstruments: [string],
    recruitDetail: string
}

export interface GroupState {
    groupInfo: GroupInfo | null,
    groupRecruit: GroupRecruit | null,
}

const initialState: GroupState = {
    groupInfo: null,
    groupRecruit: null,
};

export const groupInfo = createAsyncThunk(
    "group/groupInfo",
    async (id : number | string | undefined) => {
        const response = await axios.get(`/api/v1/group/${id}/`)
        console.log(response.data)
        return response.data
    }
)

// export const concert = createAsyncThunk(
//     "concert/concert",
//     async (id: string | number | undefined) => {
//         const response = await axios.get(`/api/v1/concert/${id}/`)
//         return response.data
//     }
// )

export const groupStateSlice = createSlice({
    name: "groupState",
    initialState,
    reducers: {
        resetGroupInfo: (state) => {
            state.groupInfo = null
        }
    },

    extraReducers: (builder) => {
        builder.addCase(groupInfo.fulfilled, (state, action) => {
            state.groupInfo = action.payload
        });
    },
});

export const groupStateActions = groupStateSlice.actions;
export const selectGroup = (state: RootState) => state.groupState;

export default groupStateSlice.reducer;