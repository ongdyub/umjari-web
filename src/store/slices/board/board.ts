import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface BoardListItem {
    id: number,
    anonymous: boolean,
    title: string,
    board: string,
    author: boolean,
    replyCount: number,
    likeCount: number
}

export interface BoardList {
    contents : [BoardListItem] | [],
    totalPages: number,
    totalElements: number,
    currentPage: number
}
const initialState: BoardList = {
    contents : [],
    totalPages: 0,
    totalElements: 0,
    currentPage: 0
};

export const matchBoardName = (name : string | undefined | number ) => {
    const boardList = [
        {
            name: '전체게시판',
            enum : 'ALL'
        },
        {
            name: '자유게시판',
            enum : 'FREE'
        },
        {
            name: '바이올린',
            enum : 'VIOLIN'
        },
        {
            name: '비올라',
            enum : 'VIOLA'
        },
        {
            name: '첼로',
            enum : 'CELLO'
        },
        {
            name: '베이스',
            enum : 'BASS'
        },
        {
            name: '플루트',
            enum : 'FLUTE'
        },
        {
            name: '클라리넷',
            enum : 'CLARINET'
        },
        {
            name: '오보에',
            enum : 'OBOE'
        },
        {
            name: '바순',
            enum : 'BASSOON'
        },
        {
            name: '호른',
            enum : 'HORN'
        },
        {
            name: '트럼펫',
            enum : 'TRUMPET'
        },
        {
            name: '트롬본',
            enum : 'TROMBONE'
        },
        {
            name: '튜바',
            enum : 'TUBA'
        },
        {
            name: '타악기',
            enum : 'PERCUSSION_INSTRUMENT'
        },
    ]
    return boardList.find(board => board.name === name)
}

export const matchBoardEnum = (name : string | null | undefined | number ) => {
    const boardList = [
        {
            name: '전체게시판',
            enum : 'ALL'
        },
        {
            name: '자유게시판',
            enum : 'FREE'
        },
        {
            name: '바이올린',
            enum : 'VIOLIN'
        },
        {
            name: '비올라',
            enum : 'VIOLA'
        },
        {
            name: '첼로',
            enum : 'CELLO'
        },
        {
            name: '베이스',
            enum : 'BASS'
        },
        {
            name: '플루트',
            enum : 'FLUTE'
        },
        {
            name: '클라리넷',
            enum : 'CLARINET'
        },
        {
            name: '오보에',
            enum : 'OBOE'
        },
        {
            name: '바순',
            enum : 'BASSOON'
        },
        {
            name: '호른',
            enum : 'HORN'
        },
        {
            name: '트럼펫',
            enum : 'TRUMPET'
        },
        {
            name: '트롬본',
            enum : 'TROMBONE'
        },
        {
            name: '튜바',
            enum : 'TUBA'
        },
        {
            name: '타악기',
            enum : 'PERCUSSION_INSTRUMENT'
        },
    ]
    return boardList.find(board => board.enum === name)
}

export const boardListGet = createAsyncThunk(
    "board/boardListGet",
    async ({boardType, param}: {boardType : string | number | undefined, param : any},  {rejectWithValue}) => {
        try {
            const board = matchBoardName(boardType)
            const response = await axios.get(`/api/v1/board/${board?.enum}/post/`,{params : param})
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response)
        }
    }
)

export const boardStateSlice = createSlice({
    name: "boardState",
    initialState,
    reducers: {
        resetBoardList: (state) => {
            state.contents = []
            state.currentPage = 0
            state.totalPages = 0
            state.totalElements = 0
        },
    },

    extraReducers: (builder) => {
        builder.addCase(boardListGet.fulfilled, (state, action) => {
            state.contents = action.payload.contents
            state.currentPage = action.payload.currentPage
            state.totalPages = action.payload.totalPages
            state.totalElements = action.payload.totalElements
            const scrollToTop = () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            scrollToTop()
        });
        builder.addCase(boardListGet.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
    },
});

export const boardStateActions = boardStateSlice.actions;
export const selectBoard = (state: RootState) => state.boardState;

export default boardStateSlice.reducer;