import {Button, ButtonGroup, Stack, useMediaQuery, useTheme} from "@mui/material";
import {Route, Routes, useParams} from "react-router-dom";
import DetailInfo from "../../Concert/ConcertDetail/DetailInfo/DetailInfo";
import Review from "../../Concert/ConcertDetail/Review/Review";
import ConcertComment from "../../Concert/ConcertDetail/ConcertComment/ConcertComment";
import ConcertMember from "../../Concert/ConcertDetail/ConcertMember/ConcertMember";
import GroupRecruit from "./GroupRecruit/GroupRecruit";
import GroupConcert from "./GroupConcert/GroupConcert";
import GroupQnA from "./GroupQnA/GroupQnA";
import {useNavigate} from "react-router";

const GroupBoard = () => {

    const theme = useTheme();
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    const navigate = useNavigate();
    const { id } = useParams();
    const onClickGoRecruit = () => {
        navigate(`/group/${id}/recruit`)
    }
    const onClickGoList = () => {
        navigate(`/group/${id}/list`)
    }
    const onClickGoQnA = () => {
        navigate(`/group/${id}/qna`)
    }

    const myButtons = [
        <Button key="recruit" onClick={onClickGoRecruit}>모집정보</Button>,
        <Button key="list" onClick={onClickGoList}>연주목록</Button>,
        <Button key="comment" onClick={onClickGoQnA}>Q&A</Button>,
    ]

    return(
        <Stack sx={{mt:1, pl: res700 ? 0 : 3}}>
            <Stack sx={{mb: 3}} alignItems={res700 ? "center" : ''}>
                <ButtonGroup variant={"text"} size="large">
                    {myButtons}
                </ButtonGroup>
            </Stack>
            <Routes>
                <Route path="recruit" element={<GroupRecruit />}/>
                <Route path="list" element={<GroupConcert />}/>
                <Route path="qna" element={<GroupQnA />}/>
            </Routes>
        </Stack>
    )
}

export default GroupBoard
