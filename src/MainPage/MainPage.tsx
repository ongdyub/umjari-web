import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import ConcertList from "./ConcertList/ConcertList";
import RecommendGroup from "./RecommendGroup/RecommendGroup";
import MiniBoard from "./MiniBoard/MiniBoard";
import Banner from "../Banner/Banner";
import Advertisement from "./Advertisement/Advertisement";

const MainPage = () => {
    const theme = useTheme();

    return(
        <Stack sx={{mb:5}}>
            <ConcertList />
            <Banner />
            <Divider sx={{mt:1}} />
            <Stack sx={{width: '100%'}} justifyContent="flex-start" direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 2}} divider={(<Divider orientation={useMediaQuery(theme.breakpoints.down("md")) ? "horizontal" : "vertical"} flexItem={true}/>)}>
                <MiniBoard />
                <RecommendGroup />
            </Stack>
            <Divider />
            <Advertisement />
        </Stack>
    )
}

export default MainPage