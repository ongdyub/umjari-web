import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../..";
import {User} from "../user/user";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface myGroup {
    groupId: number;
    groupName : string;
    joinedAt: string | null
    leavedAt: string | null
    memberType : string
}

export interface MyDefaultInfo {
    id: number,
    profileName: string,
    profileImage: string,
    email: string,
    intro: string,
    isSelfProfile: boolean
    career : [myGroup] | []
}

export interface MySelfIntro {
    id: number,
    shortComposerEng: string,
    nameEng: string,
    part: string,
    detailPart: string,
    groupName: string,
    role : string,
    concertDate : string,
    concertMusicId : number
}

export interface ParticipatedList {
    shortComposerEng: string,
    nameEng: string,
    part: string,
    detailPart: string,
    groupName: string,
    role: string
}

export interface MyList {
    id: number,
    concertPoster: string,
    title: string,
    concertDate: string,
    regionDetail: string,
    participatedList: [ParticipatedList] | []
}

export interface MyConcertState {
    myDefaultInfo : MyDefaultInfo | null,
    mySelfIntro : [MySelfIntro] | [],
    myList : [MyList] | [],
    isExist : boolean
}

const initialState: MyConcertState = {
    myDefaultInfo : null,
    mySelfIntro : [],
    myList : [],
    isExist : true
};

export const myConcertDefaultInfoGet = createAsyncThunk(
    "myconcert/myConcertDefaultInfoGet",
    async ({token, profileName} : {token : string | null, profileName : string | null | undefined},  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/user/profile-name/${profileName}/`,{
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

export const myConcertProfileImageUpload = createAsyncThunk(
    "myconcert/myConcertProfileImageUpload",
    async ({token, formData} : {token : string | null, formData : FormData},  {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/image/`,formData,{
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

export const myConcertUserImagePut = createAsyncThunk(
    "myconcert/myConcertUserImagePut",
    async ({token, image} : {token : string | null, image : string},  {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/user/image/`,{image : image},{
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

export const myIntroPut = createAsyncThunk(
    "myconcert/myIntroPut",
    async ({token, data} : {token : string | null | undefined, data : Partial<User>}, {rejectWithValue}) => {
        try {
            const response = await axios.put('/api/v1/user/info/', data,{
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

export const myconcertGroupGet = createAsyncThunk(
    "myconcert/myconcertGroupGet",
    async (token : string | null | undefined, {rejectWithValue}) => {
        try {
            const response = await axios.get('/api/v1/user/my-group/',{
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

export const mySelfIntroGet = createAsyncThunk(
    "myconcert/mySelfIntroGet",
    async (profileName : string | null | undefined, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/user/profile-name/${profileName}/joined-concert/`)
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const myListGet = createAsyncThunk(
    "myconcert/myListGet",
    async (profileName : string | null | undefined, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/user/profile-name/${profileName}/joined-concert/poster/`)
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const myConcertStateSlice = createSlice({
    name: "myConcertState",
    initialState,
    reducers: {
        resetMyConcertDefaultInfo : (state) => {
            state.myDefaultInfo = null
            state.isExist = true
        },
        resetMySelfIntro : (state) => {
            state.mySelfIntro = []
        },
        resetMyList : (state) => {
            state.myList = []
        },
        sortMySelfIntro : (state, action: PayloadAction<any>) => {
            if(action.payload.rule === '시간'){
                state.mySelfIntro = state.mySelfIntro.sort((a: any, b: any) => {
                    const partA = a.concertDate;
                    const partB = b.concertDate;

                    if(partA === partB){
                        return a.concertMusicId - b.concertMusicId
                    }
                    return partA.localeCompare(partB);
                })

                if(action.payload.direction === '내림차순'){
                    state.mySelfIntro.reverse()
                }
            }
            else if(action.payload.rule === '작곡가'){
                state.mySelfIntro = state.mySelfIntro.sort((a: any, b: any) => {
                    const partA = a.shortComposerEng;
                    const partB = b.shortComposerEng;

                    if(partA === partB){
                        const partA = a.concertDate;
                        const partB = b.concertDate;
                        return partA.localeCompare(partB);
                    }
                    return partA.localeCompare(partB);
                })

                if(action.payload.direction === '내림차순'){
                    state.mySelfIntro.reverse()
                }
            }
            else if(action.payload.rule === '곡명'){
                state.mySelfIntro = state.mySelfIntro.sort((a: any, b: any) => {
                    const partA = a.nameEng;
                    const partB = b.nameEng;

                    if(partA === partB){
                        const partA = a.shortComposerEng;
                        const partB = b.shortComposerEng;
                        return partA.localeCompare(partB);
                    }

                    return partA.localeCompare(partB);
                })

                if(action.payload.direction === '내림차순'){
                    state.mySelfIntro.reverse()
                }
            }
            else if(action.payload.rule === '파트'){
                const sortRule = ['Vn 1st', 'Vn 2nd', 'Va', 'Vc', 'Db', 'Fl', 'Picc', 'Ob', 'E.H', 'Cl', 'Fg', 'Hn', 'Trp', 'Trb', 'Cornet', 'Tub', 'Timp', 'Perc', 'Harp']

                state.mySelfIntro = state.mySelfIntro.sort((a: any, b: any) => {
                    const partA = sortRule.indexOf(a.part);
                    const partB = sortRule.indexOf(b.part);

                    if(partA === partB){
                        const partA = a.concertDate;
                        const partB = b.concertDate;
                        return partA.localeCompare(partB);
                    }
                    return partA - partB;
                })

                if(action.payload.direction === '내림차순'){
                    state.mySelfIntro.reverse()
                }
            }
            else if(action.payload.rule === '단체'){
                state.mySelfIntro = state.mySelfIntro.sort((a: any, b: any) => {
                    const partA = a.groupName;
                    const partB = b.groupName;

                    if(partA === partB){
                        const partA = a.concertDate;
                        const partB = b.concertDate;
                        return partA.localeCompare(partB);
                    }

                    return partA.localeCompare(partB);
                })

                if(action.payload.direction === '내림차순'){
                    state.mySelfIntro.reverse()
                }
            }
        },
        sortMyList : (state, action: PayloadAction<any>) => {
            if(action.payload.rule === '시간'){
                state.myList = state.myList.sort((a: any, b: any) => {
                    const partA = a.concertDate;
                    const partB = b.concertDate;

                    if(partA === partB){
                        const partA = a.groupName;
                        const partB = b.groupName;
                        return partA.localeCompare(partB);
                    }
                    return partA.localeCompare(partB);
                })

                if(action.payload.direction === '내림차순'){
                    state.myList.reverse()
                }
            }
            else if(action.payload.rule === '단체'){
                state.myList = state.myList.sort((a: any, b: any) => {
                    const partA = a.groupName;
                    const partB = b.groupName;

                    if(partA === partB){
                        const partA = a.concertDate;
                        const partB = b.concertDate;
                        return partA.localeCompare(partB);
                    }

                    return partA.localeCompare(partB);
                })

                if(action.payload.direction === '내림차순'){
                    state.myList.reverse()
                }
            }
        },
        setMyIntro : (state, action: PayloadAction<Partial<MyDefaultInfo>>) => {
            if(state.myDefaultInfo !== null && action.payload.intro !== undefined){
                state.myDefaultInfo.intro = action.payload.intro
            }
        }
    },

    extraReducers: (builder) => {
        builder.addCase(myConcertDefaultInfoGet.fulfilled, (state, action) => {
            state.myDefaultInfo = action.payload
        });
        builder.addCase(myConcertDefaultInfoGet.rejected, (state, action) => {
            if(action.payload === 4005){
                state.isExist = false
            }
        });
        builder.addCase(myIntroPut.fulfilled, (state, action) => {
            if(action.payload.intro !== null && state.myDefaultInfo){
                state.myDefaultInfo.intro  = action.payload.intro
            }
        });
        builder.addCase(myconcertGroupGet.fulfilled, (state, action) => {
            if(state.myDefaultInfo !== null){
                state.myDefaultInfo.career = action.payload.career
            }
        });
        builder.addCase(mySelfIntroGet.fulfilled, (state, action) => {
            state.mySelfIntro = action.payload.participatedConcerts

            state.mySelfIntro = state.mySelfIntro.sort((a: any, b: any) => {
                const partA = a.shortComposerEng;
                const partB = b.shortComposerEng;

                if(partA === partB){
                    const partA = a.nameEng;
                    const partB = b.nameEng;
                    return partA.localeCompare(partB);
                }
                return partA.localeCompare(partB);
            })
        });
        builder.addCase(myListGet.fulfilled, (state, action) => {
            state.myList = action.payload.participatedConcerts.sort((a: any, b: any) => {
                const partA = a.concertDate;
                const partB = b.concertDate;

                if(partA === partB){
                    return a.id - b.id;
                }
                return partA.localeCompare(partB);
            })
        });
    },
});

export const myConcertStateActions = myConcertStateSlice.actions;
export const selectMyConcert = (state: RootState) => state.myConcertState;

export default myConcertStateSlice.reducer;