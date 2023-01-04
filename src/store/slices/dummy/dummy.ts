import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface  dummyForm {
    data: string,
    img: string[]
}
const initialState: dummyForm = {
    data: 'asdf',
    img: [
        '//www.snupo.org/files/attach/images/157797/561/154/001/59%ED%9A%8C%20%ED%8F%AC%EC%8A%A4%ED%84%B0.png',
        '//www.snupo.org/files/attach/images/157797/537/137/001/8697fc06-3b79-48d3-af93-d47be8d65871.pdf-0001.png',
        '//www.snupo.org/files/attach/images/157797/193/123/001/SNUPO57%ED%8F%AC%EC%8A%A4%ED%84%B0%EC%95%95%EC%B6%95.jpg',
        '//www.snupo.org/files/attach/images/157797/517/111/001/82831625_2700309973351982_2330739276771229696_n.jpg',
        '//www.snupo.org/files/attach/images/157797/514/111/001/55.jpg',
        '//www.snupo.org/files/attach/images/157797/304/062/001/KakaoTalk_20190403_111324077.png',
        '//www.snupo.org/files/attach/images/157797/561/154/001/59%ED%9A%8C%20%ED%8F%AC%EC%8A%A4%ED%84%B0.png',
        '//www.snupo.org/files/attach/images/157797/537/137/001/8697fc06-3b79-48d3-af93-d47be8d65871.pdf-0001.png',
        '//www.snupo.org/files/attach/images/157797/193/123/001/SNUPO57%ED%8F%AC%EC%8A%A4%ED%84%B0%EC%95%95%EC%B6%95.jpg',
        '//www.snupo.org/files/attach/images/157797/517/111/001/82831625_2700309973351982_2330739276771229696_n.jpg',
        '//www.snupo.org/files/attach/images/157797/514/111/001/55.jpg',
        '//www.snupo.org/files/attach/images/157797/304/062/001/KakaoTalk_20190403_111324077.png',
    ],
}

export const dummySlice = createSlice({
    name: "dummy",
    initialState,
    reducers: {},
})

export const dummyActions = dummySlice.actions;
export const selectDummy = (state: RootState) => state.dummy;

export default dummySlice.reducer;