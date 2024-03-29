import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../..";

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
            return rejectWithValue(err.response)
        }
    }
)

export const editCommunity = createAsyncThunk(
    "editor/editCommunity",
    async ({data, token, inst_name, id} : {data : any, token : string | undefined | null, inst_name : string | null | undefined, id : string | null | number | undefined},  {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/board/${inst_name}/post/${id}/`, {...data, board : inst_name}, {
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



export const editorStateSlice = createSlice({
    name: "editorState",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(postCommunity.fulfilled, () => {
            window.alert('작성 완료')
        });
        builder.addCase(postCommunity.rejected, (state, action : any) => {
            window.alert("작성 실패. 네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(editCommunity.fulfilled, () => {
            window.alert('작성 완료')
        });
        builder.addCase(editCommunity.rejected, (state, action : any) => {
            window.alert("작성 실패. 네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
    },
});

export const editorStateActions = editorStateSlice.actions;
export const selectEditor = (state: RootState) => state.editorState;

export default editorStateSlice.reducer;