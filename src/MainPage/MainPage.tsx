import {Box, Container, Stack} from "@mui/material";
import ConcertList from "./ConcertList/ConcertList";

const MainPage = () => {
    return(
        <Stack sx={{height: '1000px'}}>
            <ConcertList />
        </Stack>
    )
}

export default MainPage