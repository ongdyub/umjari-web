import {List, Pagination, Stack} from "@mui/material";
import {useSelector} from "react-redux";
import BoardArticle from "./BoardArticle/BoardArticle";
import React from "react";
import {selectBoard} from "../../../store/slices/board/board";

const BoardArticleList = (props : any) => {

    const {page, totalPage, handleChange} = props
    const boardState = useSelector(selectBoard)

    return(
        <Stack sx={{width: '100%'}}>
            <List sx={{width: '100%'}}>
                {
                    boardState.contents.map((item, idx) => (
                        <BoardArticle key={idx} item={item} />
                    ))
                }
            </List>
            <Stack alignItems="center" sx={{width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '80%',justifyContent: "center", alignItems:"center"}} count={totalPage} size={"small"} showFirstButton showLastButton page={page} onChange={handleChange} defaultPage={1}/>
            </Stack>
        </Stack>

    )
}
export default BoardArticleList