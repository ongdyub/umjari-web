import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface GuestBook {
    userId: number,
    authorId: {
        id: number,
        profileName: string,
        profileImage: string
    },
    content: string,
    createdAt: string,
    isAuthor: boolean
}

export interface Visit {
    contents: [] | [GuestBook],
    totalPages: number,
    totalElements: number,
    currentPage: number,
    loadingState : 'start' | 'load' | 'ok' | 'fail' | 'base'
}

const initialState: Visit = {
    contents: [],
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    loadingState : 'base'
};

export const getVisitList = createAsyncThunk(
    "visit/getVisitList",
    async ({profileName,token, param} : {profileName : string | undefined | null, token : string | undefined | null, param : any},  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/user/profile-name/${profileName}/guestbook/`, {
                params : param,
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response)
        }
    }
)

export const postVisit = createAsyncThunk(
    "visit/postVisit",
    async ({id,token,data} : {id : number | string | undefined | null, token : string | undefined | null, data : any},  {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/guestbook/user/${id}/`, data,{
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response)
        }
    }
)


export const visitStateSlice = createSlice({
    name: "visitState",
    initialState,
    reducers: {
        resetVisitState: (state) => {
            state.contents = []
            state.totalElements = 0
            state.totalPages = 0
            state.currentPage = 0
            state.loadingState = 'base'
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getVisitList.fulfilled, (state : Visit, action) => {
            state.loadingState = 'ok'
            state.contents = action.payload.contents
            state.totalElements = action.payload.totalElements
            state.totalPages = action.payload.totalPages
            state.currentPage = action.payload.currentPage
        });
        builder.addCase(getVisitList.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"]+ " " + action.payload.data["content"])
        });
        builder.addCase(postVisit.fulfilled, () => {
            window.alert("작성 완료.")
        });
        builder.addCase(postVisit.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 3031){
                window.alert("친구상태만 비공개로 작성 가능합니다.")
            }
            else{
                window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
    },
});

export const visitStateActions = visitStateSlice.actions;
export const selectVisit = (state: RootState) => state.visitState;

export default visitStateSlice.reducer;