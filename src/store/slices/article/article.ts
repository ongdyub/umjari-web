import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../..";
import {matchBoardName} from "../board/board";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface ArticleReplyItem {
    id: number,
    anonymous: boolean,
    content: string,
    updatedAt: string,
    createAt: string,
    author: boolean,
    isDeleted: boolean
    isAnonymous : boolean,
    isAuthor : boolean,
    isLiked : boolean,
    likeCount : number,
    authorInfo : AuthorInfo
}

export interface AuthorInfo {
    id : number,
    profileName : string,
    profileImage : string
}

export interface Article {
    replies : [ArticleReplyItem] | [],
    id: number,
    anonymous: boolean,
    title: string,
    content: string,
    board: string,
    updatedAt: string,
    createAt: string,
    author: boolean,
    nickname: string,
    authorInfo : AuthorInfo
}
const initialState: Article = {
    replies : [],
    id: 0,
    anonymous: false,
    title: '',
    content: '',
    board: '',
    updatedAt: '',
    createAt: '',
    author: false,
    nickname : '',
    authorInfo : {
        id : 0,
        profileName : '',
        profileImage : ''
    }
};

export const articleGet = createAsyncThunk(
    "article/articleGet",
    async ({boardType, id, token}: {boardType : string | number | undefined, id : string | null | undefined, token : string | null | undefined,},  {rejectWithValue}) => {
        try {

            const board = matchBoardName(boardType)
            if(token === null){
                const response = await axios.get(`/api/v1/board/${board?.enum}/post/${id}/`,)
                console.log(response.data)
                return response.data
            }
            else{
                const response = await axios.get(`/api/v1/board/${board?.enum}/post/${id}/`,{
                    headers: {
                        Authorization: `Bearer  ${token}`,
                    },
                })
                console.log(response.data)
                return response.data
            }
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const articleDelete = createAsyncThunk(
    "article/articleDelete",
    async ({boardType, id, token}: {boardType : string | number | undefined, id : string | null | undefined, token : string | null | undefined,},  {rejectWithValue}) => {
        try {
            const board = matchBoardName(boardType)
            const response = await axios.delete(`/api/v1/board/${board?.enum}/post/${id}/`,{
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            console.log(response.data)
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const articleReplyPost = createAsyncThunk(
    "article/articleReplyPost",
    async ({ boardType, id, token, data }: { boardType : string | number | undefined, id : string | null | undefined, token : string | null | undefined, data : any }, {rejectWithValue}) => {
        try {
            const boardList = [
                {
                    name: '전체',
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
            const board = boardList.find(board => board.name === boardType)
            const response = await axios.post(`/api/v1/board/${board?.enum}/post/${id}/reply/`,data, {
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

export const articleReplyDelete = createAsyncThunk(
    "article/articleReplyDelete",
    async ({boardType, id, rId, token}: {boardType : string | number | undefined, id : string | null | undefined, rId : string | null | undefined, token : string | null | undefined,},  {rejectWithValue}) => {
        try {
            const board = matchBoardName(boardType)
            const response = await axios.delete(`/api/v1/board/${board?.enum}/post/${id}/reply/${rId}/`,{
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            console.log(response.data)
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const articleStateSlice = createSlice({
    name: "articleState",
    initialState,
    reducers: {
        resetArticle: (state) => {
            state.id = 0
            state.content = ''
            state.anonymous = false
            state.title = ''
            state.board = ''
            state.updatedAt = ''
            state.replies = []
            state.author = false
            state.createAt = ''
            state.authorInfo = {
                id : 0,
                profileName : '',
                profileImage : ''
            }
            state.nickname = ''
        },
    },

    extraReducers: (builder) => {
        builder.addCase(articleGet.fulfilled, (state, action) => {
            state.id = action.payload.id
            state.content = action.payload.content
            state.anonymous = action.payload.isAnonymous
            state.title = action.payload.title
            state.board = action.payload.board
            state.updatedAt = action.payload.updatedAt
            state.replies = action.payload.replies
            state.author = action.payload.isAuthor
            state.createAt = action.payload.createAt
            state.nickname = action.payload.nickname
            state.authorInfo = action.payload.authorInfo

            const scrollToTop = () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            scrollToTop()
        });
        builder.addCase(articleReplyDelete.rejected, () => {
            window.alert("오류 발생. 다시 시도해주세요")
        });
    },
});

export const articleStateActions = articleStateSlice.actions;
export const selectArticle = (state: RootState) => state.articleState;

export default articleStateSlice.reducer;