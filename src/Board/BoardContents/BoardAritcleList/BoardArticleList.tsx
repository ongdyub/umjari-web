import {List, Pagination, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import BoardArticle from "./BoardArticle/BoardArticle";
import {useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {AppDispatch} from "../../../store";
import {boardListGet, boardStateActions, matchBoardEnum, selectBoard} from "../../../store/slices/board/board";

const BoardArticleList = () => {

    const {boardName} = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>()

    const pageParam = searchParams.get('page');
    const initialPage = pageParam === null ? 1 : parseInt(pageParam);
    const [page, setPage] = useState(initialPage);
    const [totalPage, setTotalPage] = useState(1)

    const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
        searchParams.set('page', value.toString())
        setSearchParams(searchParams)
    }

    const boardState = useSelector(selectBoard)

    useEffect(() => {
        dispatch(boardListGet({boardType : boardName, param : {page : page}}))
        return () => {
            dispatch(boardStateActions.resetBoardList())
        }
    },[page, boardName, dispatch])

    useEffect(() => {
        setTotalPage(boardState.totalPages)
    },[boardState.totalPages])

    useEffect(() => {
        const boardType = searchParams.get('board') === null ? 'ALL' : searchParams.get('board')
        const text = searchParams.get('text') === '' ? null : searchParams.get('text')
        const range = searchParams.get('range') === '' ? null : searchParams.get('range')
        let filterType = null
        if(range !== null){
            if(range === '전체'){
                filterType = 'ALL'
            }
            else if(range === '제목'){
                filterType = 'TITLE'
            }
            else if(range === '내용'){
                filterType = 'CONTENT'
            }
            else if(range === '작성자'){
                filterType = 'AUTHOR'
            }
            else if(range === '댓글내용'){
                filterType = 'REPLY_CONTENT'
            }
            else if(range === '댓글작성자'){
                filterType = 'REPLY_AUTHOR'
            }
        }
        const param = {
            page : page,
            filterType : filterType,
            text : text
        }
        dispatch(boardListGet({boardType : matchBoardEnum(boardType)?.name, param : param}))

    },[searchParams])

    return(
        <Stack sx={{width: '100%'}}>
            <List sx={{width: '100%'}}>
                {
                    boardState.contents.map((item, idx) => (
                        <BoardArticle key={idx} boardName={boardName} item={item} />
                    ))
                }
            </List>
            <Stack alignItems="center" sx={{width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '80%',justifyContent: "center", alignItems:"center"}} count={totalPage} size={"small"} showFirstButton showLastButton page={page} onChange={handlePage} defaultPage={1}/>
            </Stack>
        </Stack>

    )
}
export default BoardArticleList