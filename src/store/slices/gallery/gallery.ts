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
    }
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
    }
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

export const galleryStateSlice = createSlice({
    name: "galleryState",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
    },
});

export const galleryStateActions = galleryStateSlice.actions;
export const selectGallery = (state: RootState) => state.galleryState;

export default galleryStateSlice.reducer;