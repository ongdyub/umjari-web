import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface MyDefaultInfo {
    id: number,
    profileName: string,
    profileImage: string,
    email: string,
    intro: string,
    isSelfProfile: boolean
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

export const myConcertStateSlice = createSlice({
    name: "myConcertState",
    initialState,
    reducers: {
        resetMyConcertDefaultInfo : (state) => {
            state.myDefaultInfo = null
            state.isExist = true
        },
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
    },
});

export const myConcertStateActions = myConcertStateSlice.actions;
export const selectMyConcert = (state: RootState) => state.myConcertState;

export default myConcertStateSlice.reducer;