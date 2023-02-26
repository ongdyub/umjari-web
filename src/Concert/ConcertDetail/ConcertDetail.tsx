import {Button, ButtonGroup, Stack} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Visit from "../../MyConcert/MyHome/Visit/Visit";
import DetailInfo from "./DetailInfo/DetailInfo";
import Review from "./Review/Review";
import ConcertComment from "./ConcertComment/ConcertComment";
import ConcertMember from "./ConcertMember/ConcertMember";

const myButtons = [
    <Button key="info">공연정보</Button>,
    <Button key="review">리뷰</Button>,
    <Button key="comment">기대평</Button>,
    <Button key="member">연주자</Button>,
]

const ConcertDetail = () => {
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