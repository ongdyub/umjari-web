import {Box, Container, Stack} from "@mui/material";
import ConcertList from "./ConcertList/ConcertList";

const MainPage = () => {
    return(
        <Stack sx={{bgcolor: 'black', height: '1000px'}}>
            <ConcertList />
        </Stack>
    )
}

export default MainPage