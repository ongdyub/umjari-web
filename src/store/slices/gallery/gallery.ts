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
    albumItem : AlbumItem | null,
    album : Album | null,
    photoItem : PhotoItem | null,
    photo : Photo | null
}
const initialState: Gallery = {
    albumItem : null,
    album : null,
    photoItem : null,
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
            return rejectWithValue(err.response.data["errorCode"])
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
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const galleryStateSlice = createSlice({
    name: "galleryState",
    initialState,
    reducers: {
        resetGallery: (state) => {
            state.album = null
            state.albumItem = null
            state.photo = null
            state.photoItem = null
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
    },

    extraReducers: (builder) => {
        builder.addCase(albumListGet.fulfilled, (state, action) => {
            state.album = action.payload
        });
        builder.addCase(albumListGet.rejected, () => {
            window.alert("네트워크 오류")
        });
        builder.addCase(postAlbum.fulfilled, () => {
            window.alert("생성 완료")
        });
        builder.addCase(postAlbum.rejected, () => {
            window.alert("네트워크 오류")
        });
    },
});

export const galleryStateActions = galleryStateSlice.actions;
export const selectGallery = (state: RootState) => state.galleryState;

export default galleryStateSlice.reducer;