import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface songForm {
    composer: string,
    name: string
}
export interface groupFrom {
    name: string,
    img: string,
    song: songForm[],
    friend: number,
    region: string,
    recruit: string,
}
export interface  dummyForm {
    data: string,
    concert: any,
    img: string[],
    group: groupFrom[]
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
    group: [
        {
            name: '가우디움',
            img: 'https://modo-phinf.pstatic.net/20160531_7/146462206927470S64_JPEG/mosaXkILP1.jpeg?type=f320_320',
            song: [
                {
                    composer: 'J.Sibelius',
                    name: 'Symphony No. 1'
                },
                {
                    composer: 'P.I.Tchaikovsky',
                    name: 'Symphony NO. 6'
                }
                ],
            friend: 8,
            region: '서초구',
            recruit: '모집 중',
        },
        {
            name: 'SNUPO',
            img: 'https://res.9appsinstall.com/group1/M00/75/F6/qYYBAFf_A2qAWnbMAACTK4eJ90U180.png',
            song: [
                {
                    composer: 'A.Borodin',
                    name: 'Symphony No. 2'
                },
                {
                    composer: 'H.Berlioz',
                    name: 'Symphony fantasique'
                }
                ],
            friend: 51,
            region: '관악구',
            recruit: '모집 마감',
        },
        {
            name: 'SNUGO',
            img: 'data:image/png;base64,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',
            song: [
                {
                    composer: 'J.Brahms',
                    name: 'Academic festival'
                },
                {
                    composer: 'J.Sibelius',
                    name: 'Violin Concerto'
                },
                {
                    composer: 'J.Brahms',
                    name: 'Symphony No. 4'
                },
                ],
            friend: 4,
            region: '서초구',
            recruit: '모집 중',
        },
        {
            name: 'AOU',
            img: 'https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/309228819_531361568995250_3384828235320818942_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ngI7YE8Hjf8AX9zukRE&_nc_ht=scontent-ssn1-1.xx&oh=00_AfCKvMzQwujSwpPtsikKoDpN8VyeaA9y2r4FRkrDULbQew&oe=63C1F245',
            song: [
                {
                    composer: 'Rimsky-Korsakov',
                    name: 'Scheherazade'
                },
            ],
            friend: 4,
            region: '관악구',
            recruit: '모집 마감',
        },
    ]
}

export const dummySlice = createSlice({
    name: "dummy",
    initialState,
    reducers: {},
})

export const dummyActions = dummySlice.actions;
export const selectDummy = (state: RootState) => state.dummy;

export default dummySlice.reducer;