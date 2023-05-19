import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
import {User} from "../user/user";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface MyDefaultInfo {
    id: number,
    profileName: string,
    profileImage: string,
    email: string,
    intro: string,
    isSelfProfile: boolean
    career : [myGroup] | []
}

export interface myGroup {
    groupId: number;
    groupName : string;
    joinedAt: string | null
    leavedAt: string | null
    memberType : string
}

export interface MyConcertState {
    myDefaultInfo : MyDefaultInfo | null,
    isExist : boolean
}

const initialState: MyConcertState = {
    myDefaultInfo : null,
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

export const myConcertStateSlice = createSlice({
    name: "myConcertState",
    initialState,
    reducers: {
        resetMyConcertDefaultInfo : (state) => {
            state.myDefaultInfo = null
            state.isExist = true
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
    },
});

export const myConcertStateActions = myConcertStateSlice.actions;
export const selectMyConcert = (state: RootState) => state.myConcertState;

export default myConcertStateSlice.reducer;