import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../..";
import { produce, Draft } from 'immer';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface GroupSetList {
    id: number,
    musicInfo: {
        id: number,
        composerEng: string,
        shortComposerEng: string,
        composerKor: string,
        shortComposerKor: string,
        nameEng: string,
        shortNameEng: string,
        nameKor: string,
        shortNameKor: string
    }
}

export interface Participant {
    id: number,
    profileName : string,
    profileImage : string
}

export interface ConcertParticipate {
    part: string,
    master: [Participant] | [],
    principal: [Participant] | [],
    assistantPrincipal: [Participant] | [],
    "member": [Participant] | [],
}

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
    regionDetail: string,
    solist: string,
    setList : [GroupSetList]
}

export interface ConcertList {
    totalPages: number,
    totalElements: number,
    currentPage: number,
    contents: [Partial<Concert>] | []
}

export interface ConcertState {
    concert : Concert | null,
    participants : [ConcertParticipate] | [],
    concertList: ConcertList
}

const initialState: ConcertState = {
    concert: null,
    participants : [],
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

export const concertMemberGet = createAsyncThunk(
    "concert/concertMemberGet",
    async (id: string | number | undefined,  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/concert/${id}/participant/`)
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const concertInfoPut = createAsyncThunk(
    "concert/concertInfoPut",
    async ({data, token, id} : {data : any, token : string | number | undefined | null, id : string | number | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/concert/${id}/info/`, data, {
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const concertSetListDelete = createAsyncThunk(
    "concert/concertSetListDelete",
    async ({data, token, id} : {data : any, token : string | number | undefined | null, id : string | number | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/concert/${id}/set-list/`, data, {
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const concertSetListAdd = createAsyncThunk(
    "concert/concertSetListAdd",
    async ({data, token, id} : {data : any, token : string | number | undefined | null, id : string | number | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/concert/${id}/set-list/`, data, {
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const concertMemberAdd = createAsyncThunk(
    "concert/concertMemberAdd",
    async ({data, token, id, cmId} : {data : any, token : string | number | undefined | null, id : string | number | undefined | null, cmId : string | number | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/concert/${id}/concert-music/${cmId}/participant/`, data, {
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const concertMemberDelete = createAsyncThunk(
    "concert/concertMemberDelete",
    async ({data, token, id, cmId} : {data : any, token : string | number | undefined | null, id : string | number | undefined | null, cmId : string | number | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/v1/concert/${id}/concert-music/${cmId}/participant/`, {
                data : data,
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const concertDetailPut = createAsyncThunk(
    "concert/concertDetailPut",
    async ({data, token, id} : {data : any, token : string | number | undefined | null, id : string | number | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/concert/${id}/details/`, data, {
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const concertPost = createAsyncThunk(
    "concert/concertPost",
    async ({data, token, id} : {data : any, token : string | number | undefined | null, id : string | number | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/concert/group/${id}/`, data, {
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
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
        },
        resetParticipants: (state) => {
            state.participants = []
        },
    },

    extraReducers: (builder) => {
        builder.addCase(dashboardList.fulfilled, (state, action) => {
            state.concertList = action.payload
            state.concertList.contents.reverse()
        });
        builder.addCase(concert.fulfilled, (state, action) => {
            state.concert = action.payload
        });
        builder.addCase(concertMemberGet.fulfilled, (state, action) => {
            const participants = action.payload.participants

            const sortRule = ['Vn 1st', 'Vn 2nd', 'Va', 'Vc', 'Db', 'Fl', 'Picc', 'Ob', 'E.H', 'Cl', 'Fg', 'Hn', 'Trp', 'Cnt', 'Trb', 'Tub', 'Timp', 'Perc', 'Harp']

            state.participants = participants.sort((a: any, b: any) => {
                const partA = sortRule.indexOf(a.part);
                const partB = sortRule.indexOf(b.part);
                return partA - partB;
            })
        });
        builder.addCase(concertInfoPut.fulfilled, (state, action) => {
            if(state.concert !== null){
                state.concert.concertInfo = action.meta.arg.data.concertInfo
            }
            window.alert("변경 성공")
        });
        builder.addCase(concertInfoPut.rejected, (state, action) => {
            if(action.payload === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("변경 실패. 다시 로그인 해서 시도해주세요.")
            }
        });
        builder.addCase(concertSetListDelete.fulfilled, (state, action) => {
            if(state.concert !== null){
                const remainIds = action.meta.arg.data.musicIds
                state.concert.setList = produce(state.concert.setList, (draftSetList: Draft<GroupSetList>[]) => {
                    return draftSetList.filter((item: GroupSetList) => remainIds.includes(item.musicInfo.id));
                });
            }
            window.alert("변경 성공")
        });
        builder.addCase(concertSetListDelete.rejected, (state, action) => {
            if(action.payload === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("변경 실패. 다시 로그인 해서 시도해주세요.")
            }
        });
        builder.addCase(concertSetListAdd.fulfilled, () => {
            window.alert("추가 성공")
        });
        builder.addCase(concertSetListAdd.rejected, (state, action) => {
            if(action.payload === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("변경 실패. 다시 로그인 해서 시도해주세요.")
            }
        });
        builder.addCase(concertMemberAdd.fulfilled, () => {

        });
        builder.addCase(concertMemberAdd.rejected, (state, action) => {
            if(action.payload === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("변경 실패. 다시 로그인 해서 시도해주세요.")
            }
        });
        builder.addCase(concertMemberDelete.fulfilled, () => {
            window.alert("반영 완료.")
        });
        builder.addCase(concertMemberDelete.rejected, (state, action) => {
            if(action.payload === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("변경 실패. 다시 로그인 해서 시도해주세요.")
            }
        });
        builder.addCase(concertDetailPut.fulfilled, () => {
            window.alert("반영 완료.")
        });
        builder.addCase(concertDetailPut.rejected, (state, action) => {
            if(action.payload === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("변경 실패. 다시 로그인 해서 시도해주세요.")
            }
        });
        builder.addCase(concertPost.fulfilled, () => {
            window.alert("등록 완료.")
        });
        builder.addCase(concertPost.rejected, (state, action) => {
            if(action.payload === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("변경 실패. 다시 로그인 해서 시도해주세요.")
            }
        });
    },
});

export const concertStateActions = concertStateSlice.actions;
export const selectConcert = (state: RootState) => state.concertState;

export default concertStateSlice.reducer;