import {Stack, useMediaQuery, useTheme} from "@mui/material";

const WriteSide = () => {
    const theme = useTheme();
    const resSize = useMediaQuery(theme.breakpoints.down("md"))

    return(
        <Stack sx={{ flex: 1, display : resSize ? 'none' : '', minWidth: 200}}>
            WriteSide
        </Stack>
    )
}

export default WriteSide