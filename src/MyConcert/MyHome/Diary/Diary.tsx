import {Stack, useMediaQuery, useTheme} from "@mui/material";

const Diary = () => {

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))

    return(
        <Stack sx={{mt: 2, width: '100%'}} justifyContent={res550 ? "center" : ''} alignItems={res550 ? "center" : ''} alignContent={res550 ? "center" : ''}>
            adsf
        </Stack>
    )
}

export default Diary