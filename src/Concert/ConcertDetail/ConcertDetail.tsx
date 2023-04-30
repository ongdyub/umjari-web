import {Button, ButtonGroup, Stack} from "@mui/material";
import {Route, Routes, useParams} from "react-router-dom";
import Visit from "../../MyConcert/MyHome/Visit/Visit";
import DetailInfo from "./DetailInfo/DetailInfo";
import Review from "./Review/Review";
import ConcertComment from "./ConcertComment/ConcertComment";
import ConcertMember from "./ConcertMember/ConcertMember";
import {useNavigate} from "react-router";
import {useState} from "react";



const ConcertDetail = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const onClickGoInfo = () => {
        navigate(`/concert/${id}/info`)
    }
    const onClickGoReview = () => {
        navigate(`/concert/${id}/review`)
    }
    const onClickGoComment = () => {
        navigate(`/concert/${id}/comment`)
    }
    const onClickGoMember = () => {
        navigate(`/concert/${id}/member`)
    }

    const myButtons = [
        <Button onClick={onClickGoInfo} key="info">공연정보</Button>,
        <Button onClick={onClickGoReview} key="review">리뷰</Button>,
        <Button onClick={onClickGoComment} key="comment">기대평</Button>,
        <Button onClick={onClickGoMember} key="member">연주자</Button>,
    ]



    return(
        <Stack sx={{mt:1, pl: 3}}>
            <Stack sx={{mb: 3}}>
                <ButtonGroup variant={"text"} size="large">
                    {myButtons}
                </ButtonGroup>
            </Stack>
            <Routes>
                <Route path="info" element={<DetailInfo />}/>
                <Route path="review" element={<Review />}/>{/*익명 가능 대신 사진은 필수*/}
                <Route path="comment" element={<ConcertComment />}/>{/*실명*/}
                <Route path="member" element={<ConcertMember />}/>
            </Routes>
        </Stack>
    )
}

export default ConcertDetail