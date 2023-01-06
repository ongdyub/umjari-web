import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface  dummyForm {
    data: string,
    concert: any
    img: string[]
}
const initialState: dummyForm = {
    data: 'asdf',
    concert: [
        {
            img: '//www.snupo.org/files/attach/images/157797/561/154/001/59%ED%9A%8C%20%ED%8F%AC%EC%8A%A4%ED%84%B0.png',
        },
    ],
    img: [
        '//www.snupo.org/files/attach/images/157797/561/154/001/59%ED%9A%8C%20%ED%8F%AC%EC%8A%A4%ED%84%B0.png',
        '//www.snupo.org/files/attach/images/157797/537/137/001/8697fc06-3b79-48d3-af93-d47be8d65871.pdf-0001.png',
        '//www.snupo.org/files/attach/images/157797/193/123/001/SNUPO57%ED%8F%AC%EC%8A%A4%ED%84%B0%EC%95%95%EC%B6%95.jpg',
        '//www.snupo.org/files/attach/images/157797/517/111/001/82831625_2700309973351982_2330739276771229696_n.jpg',
        '//www.snupo.org/files/attach/images/157797/514/111/001/55.jpg',
        '//www.snupo.org/files/attach/images/157797/304/062/001/KakaoTalk_20190403_111324077.png',
        'https://modo-phinf.pstatic.net/20220929_263/1664462069809sDOej_PNG/mosa1YMLrv.png?type=w720',
        'https://modo-phinf.pstatic.net/20191022_96/1571728368081liJEh_JPEG/mosaeuQDSe.jpeg?type=w720',
        'https://modo-phinf.pstatic.net/20190506_281/1557113539300AN1Bj_JPEG/mosaleUwJU.jpeg?type=w720',
        'https://modo-phinf.pstatic.net/20190506_172/1557113388552PWLFl_JPEG/mosauHoY0f.jpeg?type=w720',
        'https://modo-phinf.pstatic.net/20180420_64/1524198482594vcBGq_JPEG/mosaO9yXVC.jpeg?type=w720'
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