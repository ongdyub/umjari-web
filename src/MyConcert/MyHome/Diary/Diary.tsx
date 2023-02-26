import {Divider, Stack, TextField, useMediaQuery, useTheme} from "@mui/material";
import {useState} from "react";
import ConstructionIcon from '@mui/icons-material/Construction';

const Diary = () => {

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))

    return(
        <Stack sx={{mt: 2, width: '100%'}} justifyContent={res550 ? "center" : ''} alignItems={res550 ? "center" : ''} alignContent={res550 ? "center" : ''}>
            <Divider sx={{width: '90%', color: '#292929'}} />
            <Stack direction={"row"} sx={{bgcolor: 'rgb(217,217,217)', height: '500px', width:'90%', mb:10}} justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
                준비중입니다.
                <ConstructionIcon />
            </Stack>
        </Stack>
    )
}

export default Diary