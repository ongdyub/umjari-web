import {Stack, useMediaQuery, useTheme} from "@mui/material";

const MiniBoard = () => {

    const theme = useTheme();

    return(
        <Stack direction="column" sx={{bgcolor:'pink', width: useMediaQuery(theme.breakpoints.down("md")) ? "100%" : "58%"}}>
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