import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import ConcertInfo from "./ConcertInfo/ConcertInfo";
import ConcertDetail from "./ConcertDetail/ConcertDetail";

const Concert = () => {

    const theme = useTheme();
    const res800 = useMediaQuery(theme.breakpoints.down("res800"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    return(
        <Stack sx={{height: '1000px'}}>
            <Stack >
                <ConcertInfo />
                <Divider orientation={"horizontal"} sx={{mt:1, mb:1, width: '100%'}}/>
                <ConcertDetail />
            </Stack>
        </Stack>
    )
}

export default Concert