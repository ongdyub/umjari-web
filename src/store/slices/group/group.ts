import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
import {Concert} from "../concert/concert";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface GroupInfo {
    id: number,
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

export interface GroupQnAComment {
    id: number,
    author: string,
    content: string,
    isAnonymous: boolean,
    updatedAt: string,
    createAt: string,
    isAuthor: {
        "id" : string,
        "profileImage": string,
        "profileName" : string
    },
    nickname: string
}

export interface GroupQnAItem {
    id: number,
    content: string,
    title: string,
    isAnonymous: boolean,
    replyList: [GroupQnAComment],
    createAt: string,
    updatedAt: string,
    nickname: string,
    authorInfo: {
        "profileName": string,
        "profileImage" : string,
        "id" : number
    },
    isAuthor: boolean
}

export interface GroupQnAList {
    contents: [
        {
            "id": number,
            "title": string,
            "isAnonymous": boolean,
            "updatedAt": string,
            "replyCount": number,
            "createAt": string,
        }
    ],
    totalPages: number,
    totalElements: number,
    currentPage: number
}

export interface GroupConcertList {
    contents: [Partial<Concert>] | [],
    totalPages: number,
    totalElements: number,
    currentPage: number
}

export interface GroupState {
    groupInfo: GroupInfo | null,
    groupRecruit: GroupRecruit | null,
    groupExist: boolean,

    groupQnAList : GroupQnAList | null,
    groupQnAItem : GroupQnAItem | null,
    groupQnAExist : boolean,
    groupConcertList : GroupConcertList | null
}

const initialState: GroupState = {
    groupInfo: null,
    groupRecruit: null,
    groupExist : true,

    groupQnAList : null,
    groupQnAItem : null,
    groupQnAExist : true,
    groupConcertList : null
};

export const groupInfo = createAsyncThunk(
    "group/groupInfo",
    async (id : number | string | undefined) => {
        const response = await axios.get(`/api/v1/group/${id}/`)
        return response.data
    }
)

export const groupQnAPost = createAsyncThunk(
    "group/groupQnAPost",
    async (data : any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/group/${data.id}/qna/`,data.qnaData, {
                headers: {
                    Authorization: `Bearer  ${data.token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const groupQnADelete = createAsyncThunk(
    "group/groupQnADelete",
    async ({id, qid, token} : any, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/v1/group/${id}/qna/${qid}/`, {
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

export const groupQnAPut = createAsyncThunk(
    "group/groupQnAPut",
    async (data : any, {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/group/${data.id}/qna/${data.qid}/`,data.qnaData, {
                headers: {
                    Authorization: `Bearer  ${data.token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const groupQnAReplyPost = createAsyncThunk(
"group/groupQnAReplyPost",
    async ({ id, qid, token, data }: { id: string | null | undefined, qid: string | null | undefined, token : string | null | undefined, data : any }, {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/group/${id}/qna/${qid}/reply/`,data, {
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

export const groupQnAReplyDelete = createAsyncThunk(
    "group/groupQnAReplyDelete",
    async ({ id, qid, rid, token }: { id: string | null | undefined, qid: string | null | undefined, rid: any, token : string | null | undefined}, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/v1/group/${id}/qna/${qid}/reply/${rid}/`, {
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

export const groupQnAListGet = createAsyncThunk(
    "group/groupQnAListGet",
    async ({ id, param }: { id: string | null | undefined, param: any }) => {
        const response = await axios.get(`/api/v1/group/${id}/qna/`, {params : param})
        return response.data
    }
)

export const groupQnAItemGet = createAsyncThunk(
    "group/groupQnAItemGet",
    async ({ id, qid, token }: { id: string | null | undefined, qid: string | null | undefined, token : string | null | undefined }) => {
        const response = await axios.get(`/api/v1/group/${id}/qna/${qid}/`,{
            headers: {
                Authorization: `Bearer  ${token}`,
            },
        })
        return response.data
    }
)

export const groupConcertListGet = createAsyncThunk(
    "group/groupConcertListGet",
    async ({id, param}: {id : string | number | undefined, param : any},  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/group/${id}/concerts/`,{params : param})
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const groupInfoPut = createAsyncThunk(
    "group/groupInfoPut",
    async ({data, token, id} : {data : any, token : string | number | undefined | null, id : string | number | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/group/${id}/`, data, {
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
            state.groupExist = true
        },
        resetGroupQnA : (state) => {
            state.groupQnAList = null
        },
        resetGroupQnAItem : (state) => {
            state.groupQnAItem = null
        },
        resetGroupConcertList : (state) => {
            state.groupConcertList = null
        },
        sortGroupList : (state, action: PayloadAction<any>) => {
            if (action.payload.rule === '시간') {
                if(state.groupConcertList !== null && state.groupConcertList.contents !== null){
                    state.groupConcertList.contents = state.groupConcertList?.contents.sort((a: any, b: any) => {
                        const partA = a.concertDate;
                        const partB = b.concertDate;

                        return partA.localeCompare(partB);
                    })
                }

                if(state.groupConcertList !== null && state.groupConcertList.contents !== null){
                    if (action.payload.direction === '내림차순') {
                        state.groupConcertList.contents.reverse()
                    }
                }
            }
        }
    },

    extraReducers: (builder) => {
        builder.addCase(groupInfo.fulfilled, (state, action) => {
            state.groupExist = true
            state.groupInfo = action.payload
        });
        builder.addCase(groupInfo.rejected, (state) => {
            state.groupExist = false
        });
        builder.addCase(groupQnAListGet.fulfilled, (state, action) => {
            state.groupQnAList = action.payload
        });
        builder.addCase(groupQnAItemGet.fulfilled, (state, action) => {
            state.groupQnAItem = action.payload
            state.groupQnAExist = true
        });
        builder.addCase(groupQnAItemGet.rejected, (state) => {
            state.groupQnAExist = false
        });
        builder.addCase(groupConcertListGet.fulfilled, (state, action) => {
            state.groupConcertList = action.payload

            // if(state.groupConcertList !== null && state.groupConcertList.contents !== null){
            //     state.groupConcertList.contents = state.groupConcertList?.contents.sort((a: any, b: any) => {
            //         const partA = a.concertDate;
            //         const partB = b.concertDate;
            //
            //         return partA.localeCompare(partB);
            //     })
            // }
        });
        builder.addCase(groupInfoPut.fulfilled, () => {
            window.alert("변경 완료")
        });
        builder.addCase(groupInfoPut.rejected, (state, action) => {
            if(action.payload === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("변경 실패. 다시 시도하거나 다시 로그인해주세요")
            }
        });
        builder.addCase(groupQnADelete.fulfilled, () => {
            window.alert("삭제 완료")
        });
        builder.addCase(groupQnADelete.rejected, (state, action) => {
            console.log(action)
            if(action.payload === 2){
                window.alert("댓글이 존재해 삭제가 불가능합니다.")
            }
            if(action.payload === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
        });
        builder.addCase(groupQnAReplyDelete.fulfilled, () => {
            window.alert("삭제 완료")
        });
        builder.addCase(groupQnAReplyDelete.rejected, (state, action) => {
            if(action.payload === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
        });
    },
});

export const groupStateActions = groupStateSlice.actions;
export const selectGroup = (state: RootState) => state.groupState;

export default groupStateSlice.reducer;