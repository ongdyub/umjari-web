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
import GroupQnAItem from "./GroupQnAItem/GroupQnAItem";

const GroupBoard = () => {

    const theme = useTheme();
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

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
        <Button key="recruit" sx={{fontSize: res750 ? 12 : 14, pl:2, pr: 2}} onClick={onClickGoRecruit}>모집정보</Button>,
        <Button key="list" sx={{fontSize: res750 ? 12 : 14, pl:2, pr: 2}} onClick={onClickGoList}>연주목록</Button>,
        <Button key="qna" sx={{fontSize: res750 ? 12 : 14, pl:2, pr: 2}} onClick={onClickGoQnA}>Q&A</Button>,
    ]

    return(
        <Stack sx={{mt:0, pl: res750 ? 0 : 3, width: '100%'}}>
            <Stack sx={{mb: 2}} direction={"row"} justifyContent={res750 ? "center" : ''} alignItems={res750 ? 'center' : ''}>
                <ButtonGroup variant={"text"} size={"small"}>
                    {myButtons}
                </ButtonGroup>
            </Stack>
            <Routes>
                <Route path="recruit" element={<GroupRecruit />}/>
                <Route path="list" element={<GroupConcert />}/>
                <Route path="qna/*" element={<GroupQnA />}/>
                <Route path="qna/:qid" element={<GroupQnAItem />}/>
            </Routes>
        </Stack>
    )
}

export default GroupBoard
