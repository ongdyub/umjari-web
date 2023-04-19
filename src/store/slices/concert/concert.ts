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
    contents: [Concert]
}

export interface ConcertState {
    concert : Concert | null,
    concertList: ConcertList | null
}

const initialState: ConcertState = {
    concert: null,
    concertList: null
};

export const concertStateSlice = createSlice({
    name: "concertState",
    initialState,
    reducers: {},
});

export const concertStateActions = concertStateSlice.actions;
export const selectConcert = (state: RootState) => state.concertState;

export default concertStateSlice.reducer;