import {List, Pagination, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import BoardArticle from "./BoardArticle/BoardArticle";
import {useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {AppDispatch} from "../../../store";
import {boardListGet, boardStateActions, selectBoard} from "../../../store/slices/board/board";

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

    // useEffect(() => {
    //     dispatch(boardListGet({boardType : boardName, param : {page : page}}))
    //     return () => {
    //         dispatch(boardStateActions.resetBoardList())
    //     }
    // },[page, dispatch])

    useEffect(() => {
        setTotalPage(boardState.totalPages)
    },[boardState.totalPages])

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