import {Stack, useMediaQuery, useTheme} from "@mui/material";

const WriteSide = () => {
    const theme = useTheme();
    const resSize = useMediaQuery(theme.breakpoints.down('res750'))

    return(
        <Stack sx={{ flex: 1, display : resSize ? 'none' : '', minWidth: 200}}>
            광고용 공간
        </Stack>
    )
}

export default WriteSide