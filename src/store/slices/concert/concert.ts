import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface Concert {
    id: number,
    groupId: number,
    title: string,
    subtitle: string,
    conductor: string,
    host: string,
    support: string,
    qna: string,
    concertInfo: string,
    posterImg: string,
    concertDate: string,
    concertTime: string,
    concertRunningTime: number,
    fee: number,
    region: string,
    regionDetail: string
}

export interface ConcertList {
    totalPages: number,
    totalElements: number,
    currentPage: number,
    contents: [Partial<Concert>] | []
}

export interface ConcertState {
    concert : Concert | null,
    concertList: ConcertList
}

const initialState: ConcertState = {
    concert: null,
    concertList: {
        totalPages: 0,
        totalElements: 0,
        currentPage: 0,
        contents: []
    }
};

export const dashboardList = createAsyncThunk(
    "concert/dashboardList",
    async (params : any) => {
        const response = await axios.get('/api/v1/concert/dashboard/',{params : params})
        return response.data
    }
)

export const concert = createAsyncThunk(
    "concert/concert",
    async (id: string | number | undefined,  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/concert/${id}/`)
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const concertStateSlice = createSlice({
    name: "concertState",
    initialState,
    reducers: {
        resetConcert: (state) => {
            state.concert = null
        }
    },

    extraReducers: (builder) => {
        builder.addCase(dashboardList.fulfilled, (state, action) => {
            state.concertList = action.payload
        });
        builder.addCase(concert.fulfilled, (state, action) => {
            state.concert = action.payload
        });
    },
});

export const concertStateActions = concertStateSlice.actions;
export const selectConcert = (state: RootState) => state.concertState;

export default concertStateSlice.reducer;