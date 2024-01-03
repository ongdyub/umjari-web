import {Button, ButtonGroup, Stack, useMediaQuery} from "@mui/material";
import {Route, Routes, useParams} from "react-router-dom";
import DetailInfo from "./DetailInfo/DetailInfo";
import ConcertComment from "./ConcertComment/ConcertComment";
import ConcertMember from "./ConcertMember/ConcertMember";
import {useNavigate} from "react-router";

const ConcertDetail = () => {

    const res600 = useMediaQuery('(max-width:600px)')
    const navigate = useNavigate();
    const { id } = useParams();
    const onClickGoInfo = () => {
        navigate(`/concert/${id}/info`)
    }
    const onClickGoComment = () => {
        navigate(`/concert/${id}/comment`)
    }
    const onClickGoMember = () => {
        navigate(`/concert/${id}/member`)
    }

    const myButtons = [
        <Button onClick={onClickGoInfo} key="info">공연정보</Button>,
        <Button onClick={onClickGoComment} key="comment">기대평</Button>,
        <Button onClick={onClickGoMember} key="member">연주자</Button>,
    ]

    return(
        <Stack sx={{mt:1, pl: res600 ? 0 : 3}}>
            <Stack sx={{mb: 3}} justifyContent={res600 ? 'center' : 'flex-start'} direction={res600 ? 'row' : 'column'}>
                <ButtonGroup sx={{width: 'auto'}} variant={"text"} size="large" >
                    {myButtons}
                </ButtonGroup>
            </Stack>
            <Routes>
                <Route path="info" element={<DetailInfo />}/>
                <Route path="comment" element={<ConcertComment />}/>{/*실명*/}
                <Route path="member" element={<ConcertMember />}/>
            </Routes>
        </Stack>
    )
}

export default ConcertDetail