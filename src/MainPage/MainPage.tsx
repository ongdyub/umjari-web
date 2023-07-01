import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import ConcertList from "./ConcertList/ConcertList";
import RecommendGroup from "./RecommendGroup/RecommendGroup";
import MiniBoard from "./MiniBoard/MiniBoard";

const MainPage = () => {
    const theme = useTheme();

    return(
        <Stack sx={{mb:3}}>
            <ConcertList />
            <Stack sx={{width: '100%'}} justifyContent="flex-start" direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 2}} divider={(<Divider orientation={useMediaQuery(theme.breakpoints.down("md")) ? "horizontal" : "vertical"} flexItem={true}/>)}>
                <MiniBoard />
                <RecommendGroup />
            </Stack>
            <Divider />
            <Stack direction={'row'} justifyContent={'center'} sx={{mt: 2,width: '100%'}} alignItems={'center'}>
                단체 등록 및 연습실 / 악기사 / 단체 광고 문의
            </Stack>
            <Stack direction={'row'} justifyContent={'center'} sx={{mt: 2,width: '100%'}} alignItems={'center'}>
                umjari.master@gmail.com
            </Stack>
        </Stack>
    )
}

export default MainPage