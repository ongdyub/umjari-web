import {Box, Container, Divider, Stack} from "@mui/material";
import ConcertList from "./ConcertList/ConcertList";
import RecommendGroup from "./RecommendGroup/RecommendGroup";

const MainPage = () => {
    return(
        <Stack sx={{height: '1000px'}}>
            <ConcertList />
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} >
                a
                <RecommendGroup />
            </Stack>
        </Stack>
    )
}

export default MainPage