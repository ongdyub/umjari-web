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
    async (params : any) => {
        const response = await axios.get('/api/v1/music/',{params : params})
        return response.data
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
            state.musicList = action.payload.musicList
            state.counts = action.payload.counts
        });
    },
});

export const musicStateActions = musicStateSlice.actions;
export const selectMusic = (state: RootState) => state.musicState;

export default musicStateSlice.reducer;