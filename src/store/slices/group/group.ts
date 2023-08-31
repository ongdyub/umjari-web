import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
import {Concert} from "../concert/concert";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface GroupProgram {
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
    recruit: boolean,
    setList : [GroupProgram] | [],
    friendCount : number | null,
    tags: [string] | []
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

export interface GroupSearchList {
    contents: [
        {
            "id": number,
            "name": string,
            "logo": string,
            "region": string,
            "regionDetail": string | null,
            "recruit": boolean,
            "recruitInstruments": [string] | [] | null,
            "recruitDetail": string,
            "setList": [GroupProgram] | []
        }
    ],
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
    groupConcertList : GroupConcertList | null,

    groupSearchList : GroupSearchList | null
}

const initialState: GroupState = {
    groupInfo: null,
    groupRecruit: null,
    groupExist : true,

    groupQnAList : null,
    groupQnAItem : null,
    groupQnAExist : true,
    groupConcertList : null,

    groupSearchList : null
};

export const groupInfo = createAsyncThunk(
    "group/groupInfo",
    async (id : number | string | undefined, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/group/${id}/`)
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response)
        }
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
            return rejectWithValue(err.response)
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
            return rejectWithValue(err.response)
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
            return rejectWithValue(err.response)
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
            return rejectWithValue(err.response)
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
            return rejectWithValue(err.response)
        }
    }
)

export const groupQnAListGet = createAsyncThunk(
    "group/groupQnAListGet",
    async ({ id, param }: { id: string | null | undefined, param: any }, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/group/${id}/qna/`, {params : param})
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response)
        }
    }
)

export const groupQnAItemGet = createAsyncThunk(
    "group/groupQnAItemGet",
    async ({ id, qid, token }: { id: string | null | undefined, qid: string | null | undefined, token : string | null | undefined }, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/group/${id}/qna/${qid}/`,{
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

export const groupConcertListGet = createAsyncThunk(
    "group/groupConcertListGet",
    async ({id, param}: {id : string | number | undefined, param : any},  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/group/${id}/concerts/`,{params : param})
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response)
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
            return rejectWithValue(err.response)
        }
    }
)

export const groupRecruitGet = createAsyncThunk(
    "group/groupRecruitGet",
    async ({id, token}: {id : string | number | undefined, token : string | null | undefined },  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/group/${id}/recruit/`,{
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

export const groupRecruitPut = createAsyncThunk(
    "group/groupRecruitPut",
    async ({id, token, data}: {id : string | number | undefined, token : string | null | undefined, data : any},  {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/group/${id}/recruit-detail/`, data,{
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

export const groupIsRecruit = createAsyncThunk(
    "group/groupIsRecruit",
    async ({id, token}: {id : string | number | undefined, token : string | null | undefined},  {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/group/${id}/is-recruit/`, {},{
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

export const groupSetListAdd = createAsyncThunk(
    "group/groupSetListAdd",
    async ({data, token, id} : {data : any, token : string | number | undefined | null, id : string | number | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/group/${id}/set-list/`, data, {
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

export const groupSearchGet = createAsyncThunk(
    "group/groupSearchGet",
    async ({params, token} : {params : any, token : string | null}, {rejectWithValue}) => {
        try {
            const response = await axios.get('/api/v1/group/',{
                params : params,
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
        resetGroupRecruit : (state) => {
            state.groupRecruit = null
        },
        resetGroupSearchList : (state) => {
            state.groupSearchList = null
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
        builder.addCase(groupInfo.rejected, (state, action : any) => {
            state.groupExist = false
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(groupQnAPost.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(groupQnAPut.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(groupQnAReplyPost.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(groupRecruitGet.fulfilled, (state, action) => {
            state.groupRecruit = action.payload
        });
        builder.addCase(groupRecruitGet.rejected, (state, action : any) => {
            state.groupRecruit = null
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(groupQnAListGet.fulfilled, (state, action) => {
            state.groupQnAList = action.payload
        });
        builder.addCase(groupQnAListGet.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(groupQnAItemGet.fulfilled, (state, action) => {
            state.groupQnAItem = action.payload
            state.groupQnAExist = true
        });
        builder.addCase(groupQnAItemGet.rejected, (state, action : any) => {
            state.groupQnAExist = false
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(groupConcertListGet.fulfilled, (state, action) => {
            state.groupConcertList = action.payload
        });
        builder.addCase(groupConcertListGet.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(groupInfoPut.fulfilled, () => {
            window.alert("변경 완료")
        });
        builder.addCase(groupInfoPut.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                console.log(action.payload)
                window.alert("변경 실패. 다시 시도하거나 다시 로그인해주세요. \n" + "네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"] + " " + action.payload.data["detailIntro"])
            }
        });
        builder.addCase(groupQnADelete.fulfilled, () => {
            window.alert("삭제 완료")
        });
        builder.addCase(groupQnADelete.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 2){
                window.alert("댓글이 존재해 삭제가 불가능합니다.")
            }
            if(action.payload.data["errorCode"] === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
        builder.addCase(groupQnAReplyDelete.fulfilled, () => {
            window.alert("삭제 완료")
        });
        builder.addCase(groupQnAReplyDelete.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
        builder.addCase(groupRecruitPut.fulfilled, () => {
            window.alert("변경 완료")
        });
        builder.addCase(groupRecruitPut.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 3001) {
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("오류발생. 새로고침 후 다시 시도해주세요. " + "네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
        builder.addCase(groupIsRecruit.fulfilled, (state) => {
            window.alert("변경 완료")
            if(state.groupRecruit !== null){
                state.groupRecruit.recruit = !state.groupRecruit.recruit
            }
        });
        builder.addCase(groupIsRecruit.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 3001) {
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("오류발생. 새로고침 후 다시 시도해주세요. " + "네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
        builder.addCase(groupSetListAdd.fulfilled, () => {
            window.alert("변경 완료")
        });
        builder.addCase(groupSetListAdd.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
        builder.addCase(groupSearchGet.fulfilled, (state, action) => {
            state.groupSearchList = action.payload
        });
        builder.addCase(groupSearchGet.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 3001){
                window.alert("변경 권한이 없는 계정입니다.")
            }
            else{
                window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
    },
});

export const groupStateActions = groupStateSlice.actions;
export const selectGroup = (state: RootState) => state.groupState;

export default groupStateSlice.reducer;