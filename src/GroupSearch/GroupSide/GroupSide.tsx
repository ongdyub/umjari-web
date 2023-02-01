import {Stack, useMediaQuery, useTheme} from "@mui/material";

const GroupSide = () => {

    const theme = useTheme();
    const resSize = useMediaQuery(theme.breakpoints.down("res950"))

    return(
        <Stack sx={{ flex: 1, display : resSize ? 'none' : '', minWidth: 155}}>
            Side
        </Stack>
    )
}

export default GroupSide