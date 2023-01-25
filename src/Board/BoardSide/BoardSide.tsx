import {Stack, useMediaQuery, useTheme} from "@mui/material";

const BoardSide = () => {

    const theme = useTheme();
    const resSize = useMediaQuery(theme.breakpoints.down("md"))

    return(
        <Stack sx={{ flex: 1, display : resSize ? 'none' : '', minWidth: 155}}>
            Side
        </Stack>
    )
}

export default BoardSide