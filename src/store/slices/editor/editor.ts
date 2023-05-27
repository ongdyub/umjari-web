import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../..";
import {groupQnAItemGet} from "../group/group";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface EditorWrite {
    title : string,
    content: string,
    isAnonymous : boolean
}
const initialState: EditorWrite = {
    title : '',
    content: '',
    isAnonymous : false
};

export const postCommunity = createAsyncThunk(
    "editor/postCommunity",
    async ({data, token, inst_name} : {data : any, token : string | undefined | null, inst_name : string | null | undefined},  {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/board/${inst_name}/post/`, data, {
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


export const editorStateSlice = createSlice({
    name: "editorState",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(postCommunity.fulfilled, (state, action) => {
            window.alert('작성 완료')
        });
    },
});

export const editorStateActions = editorStateSlice.actions;
export const selectEditor = (state: RootState) => state.editorState;

export default editorStateSlice.reducer;