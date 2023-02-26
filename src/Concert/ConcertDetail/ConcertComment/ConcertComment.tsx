import {Divider, Pagination, Stack, useMediaQuery, useTheme} from "@mui/material";
import {useState} from "react";
import VisitList from "../../../MyConcert/MyHome/Visit/VisitList/VisitList";
import ReviewList from "../Review/ReviewList";

const ConcertComment = () => {
    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))

    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return(
        <Stack justifyContent={"flex-start"}>
            <Divider sx={{width: '90%', mt:-1}} />
            <ReviewList item={2131} write={true} />
            {/*item에 본인 아이디, 이미지링크 붙여놓기*/}
            {
                itemData.map((item) => (
                    <ReviewList item={item} write={false} />
                ))
            }
            <Stack alignItems="center" sx={{width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "large"} count={15} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
        </Stack>
    )
}

const itemData = [2,3,4,6,7,9,10,13,14,18,20,21];

export default ConcertComment