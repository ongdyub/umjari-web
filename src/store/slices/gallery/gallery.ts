import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface PhotoItem {
    id : number,
    createdAt: string,
    url: string
}

export interface Photo {
    albumId: number,
    isAuthor: boolean,
    photoPage: {
        contents: [] | [PhotoItem],
        totalPages: number,
        totalElements: number,
        currentPage: number
    },
}

export interface AlbumItem {
    id: number,
    title: string,
    headPhoto: string,
    createAt: string,
    photoCount: number
}

export interface Album {
    isAuthor: true,
    albumPage: {
        contents: [] | [AlbumItem],
        totalPages: number,
        totalElements: number,
        currentPage: number
    },
}

export interface Gallery {
    album : Album | null,
    photo : Photo | null
}
const initialState: Gallery = {
    album : null,
    photo : null
};

export const albumListGet = createAsyncThunk(
    "gallery/albumListGet",
    async ({profileName, token, param} : {profileName : string | undefined | null, token : string | undefined | null, param : any},  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/album/profile-name/${profileName}/`, {
                params : param,
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

export const postAlbum = createAsyncThunk(
    "gallery/postAlbum",
    async ({data, token} : {data : any, token : string | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/album/`, data, {
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

export const deleteAlbum = createAsyncThunk(
    "gallery/deleteAlbum",
    async ({albumId, token} : {albumId : string | undefined | null, token : string | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/v1/album/${albumId}/`, {
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

export const putAlbum = createAsyncThunk(
    "gallery/putAlbum",
    async ({albumId, token, data} : {albumId : string | undefined | null, token : string | undefined | null, data : any},  {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/album/${albumId}/`, data,{
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

export const photoListGet = createAsyncThunk(
    "gallery/photoListGet",
    async ({albumId, token, param} : {albumId : string | undefined | null, token : string | undefined | null, param : any},  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/album/${albumId}/photo/`, {
                params : param,
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

export const postPhoto = createAsyncThunk(
    "gallery/postPhoto",
    async ({albumId, token, data} : {albumId : string | undefined | null, token : string | undefined | null, data:any},  {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/album/${albumId}/photo/`, data, {
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

export const deletePhoto = createAsyncThunk(
    "gallery/deletePhoto",
    async ({albumId, token, data} : {albumId : string | undefined | null, token : string | undefined | null, data:any},  {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/v1/album/${albumId}/photo/`, {
                data : data,
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

export const galleryStateSlice = createSlice({
    name: "galleryState",
    initialState,
    reducers: {
        resetGallery: (state) => {
            state.album = null
            state.photo = null
        },
        descGallery: (state) => {
            if(state.album !== null){
                state.album.albumPage.contents = state.album.albumPage.contents.sort((a: any, b: any) => {
                    const dateA = a.createAt;
                    const dateB = b.createAt;
                    return dateB.localeCompare(dateA);
                })
            }
        },
        ascGallery: (state) => {
            if(state.album !== null){
                state.album.albumPage.contents = state.album.albumPage.contents.sort((a: any, b: any) => {
                    const dateA = a.createAt;
                    const dateB = b.createAt;
                    return dateA.localeCompare(dateB);
                })
            }
        },
        descPhoto: (state) => {
            if(state.photo !== null){
                state.photo.photoPage.contents = state.photo.photoPage.contents.sort((a: any, b: any) => {
                    const dateA = a.createdAt;
                    const dateB = b.createdAt;
                    return dateB.localeCompare(dateA);
                })
            }
        },
        ascPhoto: (state) => {
            if(state.photo !== null){
                state.photo.photoPage.contents = state.photo.photoPage.contents.sort((a: any, b: any) => {
                    const dateA = a.createdAt;
                    const dateB = b.createdAt;
                    return dateA.localeCompare(dateB);
                })
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(albumListGet.fulfilled, (state, action) => {
            state.album = action.payload
        });
        builder.addCase(albumListGet.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(postAlbum.fulfilled, () => {
            window.alert("생성 완료")
        });
        builder.addCase(postAlbum.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 15){
                window.alert("이미 존재하는 이름입니다.")
            }
            else{
                window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
        builder.addCase(deleteAlbum.fulfilled, () => {
            window.alert("삭제 완료")
        });
        builder.addCase(deleteAlbum.rejected, (state, action : any) => {
            window.alert("삭제 실패. 네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(putAlbum.fulfilled, () => {
            window.alert("변경 완료")
        });
        builder.addCase(putAlbum.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 15){
                window.alert("이미 존재하는 이름입니다.")
            }
            else{
                window.alert("변경 실패. 네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
        builder.addCase(photoListGet.fulfilled, (state, action) => {
            state.photo = action.payload
        });
        builder.addCase(photoListGet.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(postPhoto.fulfilled, () => {
            window.alert("업로드 완료")
        });
        builder.addCase(postPhoto.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(deletePhoto.fulfilled, () => {
            window.alert("삭제 완료")
        });
        builder.addCase(deletePhoto.rejected, (state, action : any) => {
            window.alert("삭제 실패. 네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
    },
});

export const galleryStateActions = galleryStateSlice.actions;
export const selectGallery = (state: RootState) => state.galleryState;

export default galleryStateSlice.reducer;