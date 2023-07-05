import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import BoardSearch from "./BoardSearch/BoardSearch";
import BoardArticleList from "./BoardAritcleList/BoardArticleList";
import {useEffect, useState} from "react";
import * as React from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {boardListGet, matchBoardEnum, selectBoard} from "../../store/slices/board/board";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {scrollToTop} from "../../App";

const BoardContents = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {boardName} = useParams()

    const theme = useTheme()
    const res800 = useMediaQuery('(max-width:800px)')
    const resMd = useMediaQuery(theme.breakpoints.down("md"))
    const dispatch = useDispatch<AppDispatch>()

    const boardState = useSelector(selectBoard)

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set('page',value.toString())
        setSearchParams(searchParams)
        setPage(value);
    };

    useEffect(() => {
        const searchText = searchParams.get('text') === '' ? null : searchParams.get('text')
        const searchRange = searchParams.get('range') === '' ? null : searchParams.get('range')
        const page = searchParams.get('page')

        let filterType = null
        if(searchRange !== null){
            if(searchRange === '전체'){
                filterType = 'ALL'
            }
            else if(searchRange === '제목'){
                filterType = 'TITLE'
            }
            else if(searchRange === '내용'){
                filterType = 'CONTENT'
            }
            else if(searchRange === '작성자'){
                filterType = 'AUTHOR'
            }
            else if(searchRange === '댓글내용'){
                filterType = 'REPLY_CONTENT'
            }
            else if(searchRange === '댓글작성자'){
                filterType = 'REPLY_AUTHOR'
            }
        }

        const param = {
            page : page === null || page === '' ? 1 : page,
            filterType : filterType,
            text : searchText
        }

        dispatch(boardListGet({boardType : boardName, param : param}))

        scrollToTop()

    },[searchParams, dispatch, boardName])

    useEffect(() => {
        setPage(boardState.currentPage)
        setTotalPage(boardState.totalPages)
    },[boardState])

    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{height: res800 ? 'auto' : '1000px', width: res800 ? '100%' : resMd ? 'calc(100% - 164px)' : 'calc(100% - 325px)'}}>
            <BoardSearch />
            <Divider orientation={"horizontal"} sx={{width: '100%', mt: 0}} />
            <BoardArticleList page={page} totalPage={totalPage} handleChange={handleChange} />
        </Stack>
    )
}

export default BoardContents