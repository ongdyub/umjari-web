import {Stack, useMediaQuery, useTheme} from "@mui/material";

const MiniBoard = () => {

    const theme = useTheme();

    return(
        <Stack direction="column" sx={{ width: useMediaQuery(theme.breakpoints.down("md")) ? "100%" : "48%"}}>
            <div>
                Miniboard
            </div>
            <div>
                Miniboard
            </div>
            <div>
                Miniboard
            </div>
            <div>
                Miniboard
            </div>
            <div>
                Miniboard
            </div>
        </Stack>
    )
}

export default MiniBoard