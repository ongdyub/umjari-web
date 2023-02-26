import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface commentForm{
    author: string,
    author_img: string,
    comment: string
}
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
    re_inst: string[]
}
export interface articleForm{
    boardName: string | null | undefined
    title: string,
    author: string,
    comment: number,
    like: number,
    visit: number
}
export interface  dummyForm {
    data: string,
    concert: any,
    img: string[],
    group: groupFrom[],
    article: articleForm[],
    boardArticle: articleForm[],
    write: any,
    commentList: commentForm[]
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
            re_inst: ['바이올린', '비올라', '타악기', '튜바']
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
            re_inst: ['바순', '오보에', '피콜로', '잉혼', '튜바', '타악기']
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
            re_inst: ['바이올린', '비올라', '첼로', '베이스', '플루트', '클라리넷', '바순', '오보에', '호른', '트럼펫','오보에', '호른', '트럼펫']
        },
        {
            name: 'AOU',
            img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEA8ODRAPDhAPERANEBAPDQ8NDg8OFhEWFhURExUYHSggGBolGxMVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0OEA4PDysZFSUtKzc3Kys3KysrKystNy0rKysrKysrKysrKysrNysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQYEBQcDAv/EADUQAQACAQEFBgQFBAIDAAAAAAABAgMRBAUGEiExM0FRcXIyNFKxYWKBkaETItHwQpIWI4L/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAgBIgBIgBIgBIgBIgBIgANQBIgBIAAAAAAAAABISCAAAAAAAAAAAABCQAACAgEgAAAAAAAAAEhIIabbd/wBMV5xzW06eMNvedImfKNXPdtyc2S9vCbT9wWWvE2OZiOS3WYhvqzrES5rro6BuzLz4sdvyxr6issGJvPaoxY7X8Yjp6iPnbt5YsPx26/THW37NTk4prHw45t6zore0ZrXtNrzrMyydi3VlyxzUr085FbzHxTSfipNfSYltti3hjzRrjtr5xPS0fope27vyYe8r0nxjseWy7TbFeL1mYmOvqI6I0+3b/pivOOa2mY8Y7Gy2TNGSlbx4xqpu/wDv7gsW7t+0zXjHWtomYmdZ/Bt1J4Y+Zr7bfZdgYW894RgrFrRM6zp0az/yjH9Fn1xd3VfVU6+Aro+HJzVi0eMavuHhsXd4/bH2e8CJAAAAAAAAAAJESDE3tl5MOS35dFDw05rVr9UrXxXm0xRX6p/iFf3Hi5s+OPx1FYu1YeS9qeXRbeFsuuDl+i0x+7QcRYuXPb82kthwfl65Keel/wBewFoaDi7JpjpXzt/Dfq1xf2YxFarXWYjzmIdE2TDFMdaR4RDnmP4q+sOj07I9AYO+8MXw318I5o9YUR0HeXc5PbLn1v8AP3FXThm+uCI8pmFd4g7+7fcKdzPuloeIfmLg++F/ma+232XZSeF/ma+2y7SDQ8Wd1X3KnHgtnFndV9yp18AdC2Lu6e2GRDw2Hu8ftj7PcRIAAAAAAAAACJSiZBU+Ls+uSmP6Ymf3l8cJYtctrfTDC35m58+Se2InSPRuuEcelL3nxnT9BWPxdj0tS/nGjC4cy8u0V8rRNf4bnivHrii3by29VY2LJy5KW8rR9wdFVri/sxrJWdYifONVb4v7MYit4/ir6w6PTsj0c4x/FX1h0enZHoDG3n3OT2z9nP58XQd59zk9suff7/Iq4cKdz/8AUtDxB392+4U7mfdLQ8Q9/YI9OGPma+232XWVK4Y+Zr7bLrINDxZ3VfcqceC2cWd1X3KnHgDoew93T2w93hsPd09sPeBEgAAAAAAAASA8tovy1tbyiZ/h6Q13EGbkwX85jlBR8l9bTPnMy2m0ZL49nxVrM1i2tpmPHq1VY10j9F9w7HS2HHS9YnSsdvnoKrOw5cmTDnpaZtEVm0a9dJaZ0GNjpSl6UrFYmJ7PHooGSukzE9sTMAv+68vPhx2/LDTcYdmNl8LZebBp9M6MTi/sxiK1j+KvrDo9OyPRzjH8VfWHR6dkegMfeXc5PbLnzoO8+5ye2XPp/wB/cVcOFO5n3S0PEPf3b7hTuZ90tDxD39wj04Y+Zr7bfZdZUrhj5mvtsusg0PFndV9ypx4LZxZ3VfcqcA6HsPd09sPeHhsPd09sfZ7wIkAAAAAAAAABXOL839tKR4zrPppKxSpnFGbmzcv0xoDXbBj5suOvnaP4l0OvgpHDmLm2iv5Ymy8AiYc/3ri5c2SPzTP6TLoKmcUYtM8z9URP7CsvhHN1vSfHrD74wjpjn8Wt4cy8uev5ujecU4Jti5o/4Tr+gKjj+KvrH3dGpPSPRzeFv3RvvHNIrknltHTWfEGy3nP/AKcntn7OfT/lZt/75pNJxYp5pt2zHZEKzp/v4guPC1dMPrMy0HEMaZ7/AO9Fr3Ps/wDTw0rPbpqr3Fez6ZIvp0tGgPDhj5mvtt9l2c+3btX9HLXJ4R0n0lcab3wzHNzxH4SDB4t7qvqqceDdcR70rl0pj61r1mWq2LFN8lKxHWZj9tQX7Ye7p7Y+z3h8Y66REeUaPsRIAAAAAAAAAPm0qLvHZ8t8t7clusz4a9F7lHKCs8K7Jat8lr1mukREaxpM6rOjRICucWbLa047UibaRMTpGvisaNAULY9ny0yUtyW6TE9i9XpFq8s9lo0l96JBTd57hyUtNsUc9Os6R1tH4NTfDaOk1n/rLo6OWPL+IBzvHs97TpWlp9Ilv9y7htExkzxpp1injr+KzcseUGgpDF3jsVc1Jpb1ifKWWCKJtu5s2KZ/tm1fqr1jRgzjtH/G3/WzpGiOWPIXXPtn2HLfpSlp/TSFp3Fub+j/AH5NJvPl1ircxCRAgIBIAAAAAAAAACEoAAAAAAAAAAAAAAAAAICASAAAAAAAAAAhICBICBICBICBICBICBICBICBICEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z',
            song: [
                {
                    composer: 'Rimsky-Korsakov',
                    name: 'Scheherazade'
                },
            ],
            friend: 4,
            region: '관악구',
            recruit: '모집 마감',
            re_inst: ['바이올린', '비올라', '첼로', '베이스', '플루트', '클라리넷', '바순', '오보에', '호른', '트럼펫','오보에', '호른', '트럼펫']
        },
    ],
    article: [
        {
            boardName: '전체 게시판',
            title: '다른 오케보고 지렁이라니 불 - 편하네요',
            author: '탈덴탈',
            comment: 521,
            like: 532,
            visit: 32142
        },
        {
            boardName: '중고거래 및 대여',
            title: '코넷 대여를 할만한 곳이 있을까요',
            author: '병정민',
            comment: 3,
            like: 2,
            visit: 42
        },
        {
            boardName: '객원 모집',
            title: '모집모집모집모집모집',
            author: '김민호른',
            comment: 5,
            like: 111,
            visit: 42
        },
        {
            boardName: '바이올린',
            title: '바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요',
            author: '정병',
            comment: 22,
            like: 2,
            visit: 142
        },
        {
            boardName: '트롬본',
            title: '고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 ',
            author: '정건용',
            comment: 52,
            like: 0,
            visit: 62
        },
        {
            boardName: '트럼펫',
            title: '환상 4악장 해보신분 팁좀요',
            author: '이솔찬',
            comment: 2,
            like: 1,
            visit: 62
        },
        {
            boardName: '연습실 공유',
            title: '낙성대역 근처 관악기 연습할 만한 좋은 곳 있나요?',
            author: 'PM',
            comment: 24,
            like: 16,
            visit: 62
        },
        {
            boardName: '중고거래 및 대여',
            title: '코넷 대여를 할만한 곳이 있을까요',
            author: '병정민',
            comment: 3,
            like: 2,
            visit: 42
        },
        {
            boardName: '객원 모집',
            title: '모집모집모집모집모집',
            author: '김민호른',
            comment: 5,
            like: 111,
            visit: 42
        },
        {
            boardName: '바이올린',
            title: '바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요',
            author: '정병',
            comment: 22,
            like: 2,
            visit: 142
        },
        {
            boardName: '트롬본',
            title: '고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 ',
            author: '정건용',
            comment: 52,
            like: 0,
            visit: 62
        },
        {
            boardName: '트럼펫',
            title: '환상 4악장 해보신분 팁좀요',
            author: '이솔찬',
            comment: 2,
            like: 1,
            visit: 62
        },
        {
            boardName: '연습실 공유',
            title: '낙성대역 근처 관악기 연습할 만한 좋은 곳 있나요?',
            author: 'PM',
            comment: 24,
            like: 16,
            visit: 62
        },
    ],
    boardArticle : [
        {
            boardName: '전체 게시판',
            title: '다른 오케보고 지렁이라니 불 - 편하네요',
            author: '탈덴탈',
            comment: 521,
            like: 532,
            visit: 32142
        },
        {
            boardName: '중고거래 및 대여',
            title: '코넷 대여를 할만한 곳이 있을까요',
            author: '병정민',
            comment: 3,
            like: 2,
            visit: 42
        },
        {
            boardName: '객원 모집',
            title: '모집모집모집모집모집',
            author: '김민호른',
            comment: 5,
            like: 111,
            visit: 42
        },
        {
            boardName: '바이올린',
            title: '바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요',
            author: '정병',
            comment: 22,
            like: 2,
            visit: 142
        },
        {
            boardName: '트롬본',
            title: '고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 ',
            author: '정건용',
            comment: 52,
            like: 0,
            visit: 62
        },
        {
            boardName: '트럼펫',
            title: '환상 4악장 해보신분 팁좀요',
            author: '이솔찬',
            comment: 2,
            like: 1,
            visit: 62
        },
        {
            boardName: '연습실 공유',
            title: '낙성대역 근처 관악기 연습할 만한 좋은 곳 있나요?',
            author: 'PM',
            comment: 24,
            like: 16,
            visit: 62
        },
        {
            boardName: '중고거래 및 대여',
            title: '코넷 대여를 할만한 곳이 있을까요',
            author: '병정민',
            comment: 3,
            like: 2,
            visit: 42
        },
        {
            boardName: '객원 모집',
            title: '모집모집모집모집모집',
            author: '김민호른',
            comment: 5,
            like: 111,
            visit: 42
        },
        {
            boardName: '바이올린',
            title: '바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요',
            author: '정병',
            comment: 22,
            like: 2,
            visit: 142
        },
        {
            boardName: '전체 게시판',
            title: '다른 오케보고 지렁이라니 불 - 편하네요',
            author: '탈덴탈asdfasdfasdfasadfasdasdfsfasf',
            comment: 521,
            like: 532,
            visit: 32142
        },
        {
            boardName: '중고거래 및 대여',
            title: '코넷 대여를 할만한 곳이 있을까요',
            author: '병정민',
            comment: 3,
            like: 2,
            visit: 42
        },
        {
            boardName: '객원 모집',
            title: '모집모집모집모집모집',
            author: '김민호른',
            comment: 5,
            like: 111,
            visit: 42
        },
        {
            boardName: '바이올린',
            title: '바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요',
            author: '정병',
            comment: 22,
            like: 2,
            visit: 142
        },
        {
            boardName: '트롬본',
            title: '고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 고음 잘내는 주법 연습 알려주세요 ',
            author: '정건용',
            comment: 52,
            like: 0,
            visit: 62
        },
        {
            boardName: '트럼펫',
            title: '환상 4악장 해보신분 팁좀요',
            author: '이솔찬',
            comment: 2,
            like: 1,
            visit: 62
        },
        {
            boardName: '연습실 공유',
            title: '낙성대역 근처 관악기 연습할 만한 좋은 곳 있나요?',
            author: 'PM',
            comment: 24,
            like: 16,
            visit: 62
        },
        {
            boardName: '중고거래 및 대여',
            title: '코넷 대여를 할만한 곳이 있을까요',
            author: '병정민',
            comment: 3,
            like: 2,
            visit: 42
        },
        {
            boardName: '객원 모집',
            title: '모집모집모집모집모집',
            author: '김민호른',
            comment: 5,
            like: 111,
            visit: 42
        },
        {
            boardName: '바이올린',
            title: '바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요 바이올린 연습 방법좀요',
            author: '정병',
            comment: 22,
            like: 2,
            visit: 142
        },
    ],
    write: 'empty',
    commentList: [
        {
            author: '정병',
            author_img: 'n',
            comment: '댓글 대에에엣글 댕에에ㅔ에에엣글'
        },
        {
            author: '정병',
            author_img: 'n',
            comment: '댓글 대댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글에에엣글 댕에에ㅔ에에엣글'
        },
        {
            author: '정병',
            author_img: 'n',
            comment: '댓글 대에에엣글 댕에에ㅔ에에엣글'
        },
        {
            author: '정병',
            author_img: 'n',
            comment: '댓글 대에에엣글 댕에에ㅔ에에엣글'
        },
        {
            author: '정병',
            author_img: 'n',
            comment: '댓글 대에에엣글 댕에에ㅔ에에엣글'
        },
        {
            author: '정병',
            author_img: 'n',
            comment: '댓글 대에에엣글 댕에에ㅔ에에엣글'
        },
        {
            author: '정병',
            author_img: 'n',
            comment: '댓글 대에에엣글 댕에댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글에ㅔ에에엣글'
        },
        {
            author: '정병',
            author_img: 'n',
            comment: '댓글 대에에엣글 댕에에ㅔ에에엣글'
        },
        {
            author: '정병',
            author_img: 'n',
            comment: '댓글 대에에엣글 댕에에ㅔ에에엣글'
        },
        {
            author: '정병',
            author_img: 'n',
            comment: '댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글댓글 대에에엣글 댕에에ㅔ에에엣글'
        },
        {
            author: '정병',
            author_img: 'n',
            comment: '댓글 대에에엣글 댕에에ㅔ에에엣글'
        },
    ]
}

export const dummySlice = createSlice({
    name: "dummy",
    initialState,
    reducers: {
        setWrite: (
            state,
            action: PayloadAction<string>
        ) => {
            state.write = action.payload;
        },
    },
})

export const dummyActions = dummySlice.actions;
export const selectDummy = (state: RootState) => state.dummy;

export default dummySlice.reducer;