import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import ConcertList from "./ConcertList/ConcertList";
import RecommendGroup from "./RecommendGroup/RecommendGroup";
import MiniBoard from "./MiniBoard/MiniBoard";

const MainPage = () => {
    const theme = useTheme();

    return(
        <Stack sx={{height: '1000px'}}>
            <ConcertList />
            <Stack justifyContent="flex-start" direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 2}} divider={(<Divider orientation={useMediaQuery(theme.breakpoints.down("md")) ? "horizontal" : "vertical"} flexItem={true}/>)}>
                <MiniBoard />
                <RecommendGroup />
            </Stack>
        </Stack>
    )
}

export default MainPage