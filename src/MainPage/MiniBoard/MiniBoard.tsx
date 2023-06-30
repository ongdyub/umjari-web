import {Button, Divider, List, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import MiniArticle from "./MiniArticle/MiniArticle";
import {useEffect} from "react";
import {boardListGet, boardStateActions, selectBoard} from "../../store/slices/board/board";
import {AppDispatch} from "../../store";
import {useNavigate} from "react-router-dom";

const MiniBoard = () => {

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>()
    const boardState = useSelector(selectBoard)

    const navigate = useNavigate()

    const onClickBoard = () => {
        navigate(`/community/전체게시판`)
    }

    useEffect(() => {
        dispatch(boardListGet({boardType : '전체게시판', param : {page : 1, size : 15}}))
        return () => {
            dispatch(boardStateActions.resetBoardList())
        }
    },[dispatch])

    return(
        <Stack direction="column" justifyContent="flex-start" alignItems="center" sx={{ width: useMediaQuery(theme.breakpoints.down("md")) ? "100%" : "54%"}} divider={<Divider orientation="horizontal"/>}>
            <Typography sx={{fontWeight: 300, fontSize: 22}} mt={2} >전체 게시글</Typography>
            <Divider orientation={"horizontal"} />
            <List sx={{width: '100%'}}>
                {
                    boardState.contents.map((item, idx) => (
                        <MiniArticle key={idx} item={item}/>
                    ))
                }
            </List>
            <Stack justifyContent="flex-start" alignItems="center" sx={{width: '100%'}}>
                <Button onClick={onClickBoard}>더보기</Button>
            </Stack>
        </Stack>
    )
}

export default MiniBoard