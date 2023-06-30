import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface Music {
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

export interface MusicState {
    musicItem : Music | null,
    musicList : [Music] | [],
    counts : number
}
const initialState: MusicState = {
    musicItem : null,
    musicList : [],
    counts : 0
};

export const musicListGet = createAsyncThunk(
    "music/musicListGet",
    async (params : any, {rejectWithValue}) => {
        try {
            const response = await axios.get('/api/v1/music/',{params : params})
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response)
        }
    }
)

export const musicItemAdd = createAsyncThunk(
    "music/musicItemAdd",
    async ({data, token} : {data : any, token : string | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/music/`, data, {
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

export const musicStateSlice = createSlice({
    name: "musicState",
    initialState,
    reducers: {
        resetMusicState: (state) => {
            state.musicList = []
            state.musicItem = null
            state.counts = 0
        },
    },

    extraReducers: (builder) => {
        builder.addCase(musicListGet.fulfilled, (state, action) => {
            state.musicList = action.payload.musicList.sort((a: any, b: any) => {
                const partA = a.nameEng;
                const partB = b.nameEng;

                if(partA === partB){
                    return a.id - b.id;
                }
                return partA.localeCompare(partB);
            })
            state.counts = action.payload.counts
        });
        builder.addCase(musicListGet.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(musicItemAdd.fulfilled, (state, action) => {
            window.alert("추가 성공")
        });
        builder.addCase(musicItemAdd.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 3001){
                window.alert("추가 권한이 없는 계정입니다.")
            }
            else{
                window.alert("추가 실패. 다시 로그인 해서 시도해주세요." + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
    },
});

export const musicStateActions = musicStateSlice.actions;
export const selectMusic = (state: RootState) => state.musicState;

export default musicStateSlice.reducer;